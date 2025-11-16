// src/entities/eventDetails.ts

import { EventDetail, CartItem, PtStatus, EventNames } from './base';

/**
 * CartUpdatedDetail — деталь события обновления корзины.
 * Содержит items.
 */
export class CartUpdatedDetail extends EventDetail {
    public readonly items: CartItem[];

    constructor(items: CartItem[]) {
        super(EventNames.CART_UPDATED);
        this.items = items;
    }

    /**
     * Сериализация детали — полезна для логирования.
     */
    override toJSON() {
        return { event: this.event, items: this.items };
    }
}

/**
 * CheckoutStartDetail — событие старта платежного процесса (создан Pt на сервере).
 * orderId (теперь PtId) — число.
 */
export class CheckoutStartDetail extends EventDetail {
    public readonly orderId: number;

    constructor(orderId: number) {
        super(EventNames.CHECKOUT_START);
        this.orderId = orderId;
    }

    override toJSON() {
        return { event: this.event, orderId: this.orderId };
    }
}

/**
 * CheckoutProgressDetail — индикация прогресса оформления (true/false).
 */
export class CheckoutProgressDetail extends EventDetail {
    public readonly inProgress: boolean;

    constructor(inProgress: boolean) {
        super(EventNames.CHECKOUT_PROGRESS);
        this.inProgress = inProgress;
    }

    override toJSON() {
        return { event: this.event, inProgress: this.inProgress };
    }
}

/**
 * CheckoutStatusDetail — промежуточные статусы Pt (orderId, status, message?).
 * status использует PtStatus (PENDING/PAID/FAILED).
 */
export class CheckoutStatusDetail extends EventDetail {
    public readonly orderId: number;
    public readonly status: PtStatus;
    public readonly message?: string | undefined;

    constructor(orderId: number, status: PtStatus, message?: string) {
        super(EventNames.CHECKOUT_STATUS);
        this.orderId = orderId;
        this.status = status;
        this.message = message;
    }

    override toJSON() {
        return { event: this.event, orderId: this.orderId, status: this.status, message: this.message };
    }
}

/**
 * CheckoutSuccessDetail — успешный Pt (оплата подтверждена).
 */
export class CheckoutSuccessDetail extends EventDetail {
    public readonly orderId: number;

    constructor(orderId: number) {
        super(EventNames.CHECKOUT_SUCCESS);
        this.orderId = orderId;
    }

    override toJSON() {
        return { event: this.event, orderId: this.orderId, status: PtStatus.PAID };
    }
}

/**
 * CheckoutFailedDetail — Pt завершился неуспешно.
 */
export class CheckoutFailedDetail extends EventDetail {
    public readonly orderId: number;
    public readonly message?: string | undefined;

    constructor(orderId: number, message?: string) {
        super(EventNames.CHECKOUT_FAILED);
        this.orderId = orderId;
        this.message = message;
    }

    override toJSON() {
        return { event: this.event, orderId: this.orderId, message: this.message };
    }
}

/* Объединённый тип всех возможных деталей */
export type EventDetailUnion =
    | CartUpdatedDetail
    | CheckoutStartDetail
    | CheckoutProgressDetail
    | CheckoutStatusDetail
    | CheckoutSuccessDetail
    | CheckoutFailedDetail;

/* Type guards (через instanceof) — используются EventBus для рантайм-проверок. */
export function isCartUpdated(d: unknown): d is CartUpdatedDetail {
    return d instanceof CartUpdatedDetail;
}
export function isCheckoutStart(d: unknown): d is CheckoutStartDetail {
    return d instanceof CheckoutStartDetail;
}
export function isCheckoutProgress(d: unknown): d is CheckoutProgressDetail {
    return d instanceof CheckoutProgressDetail;
}
export function isCheckoutStatus(d: unknown): d is CheckoutStatusDetail {
    return d instanceof CheckoutStatusDetail;
}
export function isCheckoutSuccess(d: unknown): d is CheckoutSuccessDetail {
    return d instanceof CheckoutSuccessDetail;
}
export function isCheckoutFailed(d: unknown): d is CheckoutFailedDetail {
    return d instanceof CheckoutFailedDetail;
}
