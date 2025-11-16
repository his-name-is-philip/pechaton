// src/services/checkoutService.ts
import orderApiAdapter, { CreatePtRequest, PtStatusResponse } from '../adapters/orderApiAdapter';
import paymentAdapter from '../adapters/paymentAdapter';
import cartController from './cartController';
import { EventBus } from '../services/events';
import {
    CheckoutStartDetail,
    CheckoutStatusDetail,
    CheckoutSuccessDetail,
    CheckoutFailedDetail
} from '../entities/eventDetails';
import { PtStatus } from '../entities/base';

type CleanupHandle = { cleanup: () => void } | null;

export class CheckoutService {
    private pollIntervalMs = 2000;
    private maxAttempts = 90;

    /**
     * Create order (Pt) and start the payment flow.
     *
     * @param items - array of objects with worksheetId property (unique items).
     * @param email - buyer email address.
     * @param wgtCtnr - optional HTMLElement that will host the payment widget HTML.
     *
     * Workflow:
     * 1. send createPt request to server (orderApiAdapter.createPt).
     * 2. emit CheckoutStartDetail with created orderId.
     * 3. if server marks Pt as PAID -> emit CheckoutSuccessDetail and clear cart.
     * 4. else if widgetHtml is present -> render widget via paymentAdapter.
     * 5. poll Pt status until PAID or FAILED, emitting CheckoutStatusDetail updates.
     * 6. when final status is reached emit CheckoutSuccessDetail or CheckoutFailedDetail accordingly.
     *
     * Returns the final PtStatusResponse or intermediate result.
     */
    async createOrderAndStart(
        items: { worksheetId: number }[],
        email: string,
        wgtCtnr?: HTMLElement | null
    ): Promise<PtStatusResponse | { orderId: number; status: PtStatus; message?: string }> {
        if (cartController.getCheckoutInProgress()) {
            throw new Error('Checkout already in progress');
        }

        cartController.setCheckoutInProgress(true);

        try {
            const payload: CreatePtRequest = {
                items: items.map((i) => ({ worksheetId: i.worksheetId })),
                email
            };

            const createResp = await orderApiAdapter.createPt(payload);
            // Emit start event
            EventBus.emit(new CheckoutStartDetail(createResp.orderId));

            // If server already marked paid — finish immediately
            if (createResp.status === PtStatus.PAID) {
                EventBus.emit(new CheckoutSuccessDetail(createResp.orderId));
                cartController.clear();
                return { orderId: createResp.orderId, status: PtStatus.PAID };
            }

            const wh = createResp.widgetHtml;

            let cleanup: CleanupHandle = null;
            if (typeof wh === 'string' && wh.trim() !== '') {
                // Render the payment widget into provided container or modal
                cleanup = paymentAdapter.renderWidgetHtml(wh, wgtCtnr ?? null);
            }

            // Poll status (emit status updates via EventBus)
            const final = await this.pollPtStatus(createResp.orderId, (s) => {
                const normalized = this.mapPtStatusToPtStatus(s.status);
                // Emit status updates — note: using createResp.orderId here (initial ID)
                EventBus.emit(new CheckoutStatusDetail(createResp.orderId, normalized, s.message));
            });

            // cleanup widget if any
            if (cleanup) {
                try {
                    cleanup.cleanup();
                } catch (err) {
                    // eslint-disable-next-line no-console
                    console.warn('Error during payment widget cleanup', err);
                }
            }

            if (final.status === PtStatus.PAID) {
                EventBus.emit(new CheckoutSuccessDetail(final.orderId));
                cartController.clear();
            } else {
                EventBus.emit(new CheckoutFailedDetail(final.orderId, final.message));
            }

            return final;
        } finally {
            cartController.setCheckoutInProgress(false);
        }
    }

    /**
     * Poll the payment (Pt) status until final state or timeout.
     *
     * @param orderId - numeric Pt id to poll.
     * @param onUpdate - optional callback invoked for each polled response.
     * @returns final PtStatusResponse.
     */
    private async pollPtStatus(orderId: number, onUpdate?: (s: PtStatusResponse) => void): Promise<PtStatusResponse> {
        let attempts = 0;
        while (attempts < this.maxAttempts) {
            attempts++;
            try {
                const statusResp = await orderApiAdapter.getPtStatus(orderId);
                if (onUpdate) onUpdate(statusResp);
                if (statusResp.status === PtStatus.PAID || statusResp.status === PtStatus.FAILED) {
                    return statusResp;
                }
            } catch (err) {
                // eslint-disable-next-line no-console
                console.warn('pollPtStatus error', err);
            }
            await this.delay(this.pollIntervalMs);
        }
        return { orderId, status: PtStatus.PENDING, message: 'timeout' };
    }

    /**
     * Promise-based delay helper.
     *
     * @param ms - milliseconds to wait.
     */
    private delay(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    /**
     * Normalize Pt status values (string or enum) to PtStatus enum.
     *
     * @param s - incoming status (PtStatus or string).
     * @returns PtStatus enum value.
     */
    private mapPtStatusToPtStatus(s: PtStatus | string): PtStatus {
        if (s === PtStatus.PAID || s === 'paid') return PtStatus.PAID;
        if (s === PtStatus.FAILED || s === 'failed') return PtStatus.FAILED;
        return PtStatus.PENDING;
    }
}

export const checkoutService = new CheckoutService();
export default checkoutService;
