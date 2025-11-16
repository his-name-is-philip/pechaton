// src/adapters/orderApiAdapter.ts
/**
 * Adapter for GAS endpoints that create Pt and return statuses.
 * Runtime validation protects against malformed responses.
 *
 * Note: The adapter treats orderId as a number (Pt id).
 */

import { PtStatus } from '../entities/base';

export type CreatePtItem = { worksheetId: number };
export type CreatePtRequest = { items: CreatePtItem[]; email: string };

export type CreatePtResponse = {
    orderId: number;
    status: PtStatus;
    widgetHtml?: string;
};

export type PtStatusResponse = {
    orderId: number;
    status: PtStatus;
    message?: string;
};

const GAS_BASE = '/gas';
const CREATE_ORDER = `${GAS_BASE}/createOrder`;
const ORDER_STATUS = `${GAS_BASE}/PtStatus`;

/* ----------------- runtime validators ----------------- */

/**
 * Check whether a value is a plain object.
 */
function isObject(v: unknown): v is Record<string, unknown> {
    return typeof v === 'object' && v !== null;
}

/**
 * Check whether a value is a string.
 */
function isString(v: unknown): v is string {
    return typeof v === 'string';
}

/**
 * Validate whether a value is one of PtStatus enum values.
 */
function isPtStatus(v: unknown): v is PtStatus {
    return v === PtStatus.PAID || v === PtStatus.PENDING || v === PtStatus.FAILED;
}

/**
 * Normalize orderId (can be number or numeric string) to an integer number.
 *
 * @throws Error if orderId is missing or invalid.
 */
function normalizeOrderId(raw: unknown): number {
    let n = NaN;
    if (typeof raw === 'number' && Number.isFinite(raw)) n = Math.floor(raw);
    else if (typeof raw === 'string') {
        n = Number.parseInt(raw);
    }
    if (Number.isNaN(n)) throw new Error('Invalid orderId type in response');
    return n;
}

/**
 * Parse and validate response of createPt API.
 *
 * @param raw - parsed JSON from server.
 * @returns validated CreatePtResponse.
 * @throws Error if validation fails.
 */
function parseCreatePtResponse(raw: unknown): CreatePtResponse {
    if (!isObject(raw)) {
        throw new Error('createPt: response is not an object');
    }
    const orderIdRaw = raw['orderId'];
    const statusRaw = raw['status'];
    const widgetHtmlRaw = raw['widgetHtml'];

    const orderId = normalizeOrderId(orderIdRaw);

    if (!isPtStatus(statusRaw)) {
        throw new Error(`createPt: invalid status value: ${String(statusRaw)}`);
    }
    const status = statusRaw as PtStatus;

    let widgetHtml: string | undefined;
    if (widgetHtmlRaw !== undefined && widgetHtmlRaw !== null) {
        if (!isString(widgetHtmlRaw)) {
            throw new Error('createPt: widgetHtml must be a string if present');
        }
        widgetHtml = widgetHtmlRaw;
    }

    return { orderId, status, widgetHtml };
}

/**
 * Parse and validate response of PtStatus API.
 *
 * @param raw - parsed JSON from server.
 * @returns validated PtStatusResponse.
 * @throws Error if validation fails.
 */
function parsePtStatusResponse(raw: unknown): PtStatusResponse {
    if (!isObject(raw)) {
        throw new Error('PtStatus: response is not an object');
    }
    const orderIdRaw = raw['orderId'];
    const statusRaw = raw['status'];
    const messageRaw = raw['message'];

    const orderId = normalizeOrderId(orderIdRaw);
    if (!isPtStatus(statusRaw)) {
        throw new Error(`PtStatus: invalid status value: ${String(statusRaw)}`);
    }
    const status = statusRaw as PtStatus;
    const message = isString(messageRaw) ? messageRaw : undefined;

    return { orderId, status, message };
}

/* ----------------- adapter implementation ----------------- */

const orderApiAdapter = {
    /**
     * Create Pt on server.
     *
     * @param payload - CreatePtRequest with items and email.
     * @returns CreatePtResponse — validated structure with numeric orderId.
     * @throws Error for network or validation problems.
     */
    async createPt(payload: CreatePtRequest): Promise<CreatePtResponse> {
        const res = await fetch(CREATE_ORDER, {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            const text = await res.text().catch(() => '');
            throw new Error(`createPt failed: ${res.status} ${text}`);
        }

        const json = await res.json().catch((err) => {
            throw new Error(`createPt: failed to parse JSON: ${String(err)}`);
        });

        return parseCreatePtResponse(json);
    },

    /**
     * Get Pt status from the server.
     *
     * @param orderId - numeric Pt id.
     * @returns PtStatusResponse validated.
     */
    async getPtStatus(orderId: number): Promise<PtStatusResponse> {
        const url = `${ORDER_STATUS}?orderId=${encodeURIComponent(orderId)}`;
        const res = await fetch(url, { method: 'GET', credentials: 'same-origin' });

        if (!res.ok) {
            const text = await res.text().catch(() => '');
            throw new Error(`PtStatus failed: ${res.status} ${text}`);
        }

        const json = await res.json().catch((err) => {
            throw new Error(`PtStatus: failed to parse JSON: ${String(err)}`);
        });

        return parsePtStatusResponse(json);
    }
};

export default orderApiAdapter;
