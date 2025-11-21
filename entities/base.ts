// src/events/base.ts
// Базовые типы и enum событий
//
// Содержит:
// - PtStatus — внутренний статус платежа (payment status).
// - EventName — единый enum для имён событий, используемых EventBus.
// - CartItem / CartTotals — базовые типы для корзины (рекомендуется использовать унифицированный тип по всему проекту).
// - EventDetail — абстрактный базовый класс для деталей событий (каждый конкретный класс-деталь наследует его).
//
// Примечание: EventDetail хранит event как значение EventName — это гарантирует согласованность имён событий.
export enum PtStatus {
    PENDING = 'pending',
    PAID = 'paid',
    FAILED = 'failed'
}

/**
 * Централизованное перечисление всех событий.
 * Используется вместо строковых литералов в деталях и EventBus.
 */
export enum EventName {
    CART_UPDATED = 'cart:updated',
    CHECKOUT_START = 'cart:checkout-start',
    CHECKOUT_PROGRESS = 'cart:checkout-progress',
    CHECKOUT_STATUS = 'cart:checkout-status',
    CHECKOUT_SUCCESS = 'cart:checkout-success',
    CHECKOUT_FAILED = 'cart:checkout-failed'
}


/**
 * Абстрактный базовый класс для деталей событий.
 * Каждая конкретная деталь должна передавать соответствующее значение EventName.
 *
 * Экземпляры подклассов передаются в CustomEvent.detail и эмитятся через EventBus.
 */
export abstract class EventDetail {
    public readonly event: EventName;

    protected constructor(event: EventName) {
        this.event = event;
    }

    /**
     * toJSON используется при логировании/сериализации.
     * Подклассы обычно расширяют этот метод, возвращая свои поля.
     */
    toJSON(): Record<string, unknown> {
        return { event: this.event };
    }
}
