// src/events/base.ts
// Базовые типы и enum событий
//
// Содержит:
// - PtStatus — внутренний статус платежа (payment status).
// - EventNames — единый enum для имён событий, используемых EventBus.
// - CartItem / CartTotals — базовые типы для корзины (рекомендуется использовать унифицированный тип по всему проекту).
// - EventDetail — абстрактный базовый класс для деталей событий (каждый конкретный класс-деталь наследует его).
//
// Примечание: EventDetail хранит event как значение EventNames — это гарантирует согласованность имён событий.
export enum PtStatus {
    PENDING = 'pending',
    PAID = 'paid',
    FAILED = 'failed'
}

/**
 * Централизованное перечисление всех событий.
 * Используется вместо строковых литералов в деталях и EventBus.
 */
export enum EventNames {
    CART_UPDATED = 'cart:updated',
    CHECKOUT_START = 'cart:checkout-start',
    CHECKOUT_PROGRESS = 'cart:checkout-progress',
    CHECKOUT_STATUS = 'cart:checkout-status',
    CHECKOUT_SUCCESS = 'cart:checkout-success',
    CHECKOUT_FAILED = 'cart:checkout-failed'
}

/**
 * Описание элемента корзины.
 * todo зачем это здесь, если есть Worksheet
 */
export type CartItem = {
    worksheetId: number;
    name: string;
    priceKopecks: number;
};

/**
 * Абстрактный базовый класс для деталей событий.
 * Каждая конкретная деталь должна передавать соответствующее значение EventNames.
 *
 * Экземпляры подклассов передаются в CustomEvent.detail и эмитятся через EventBus.
 */
export abstract class EventDetail {
    public readonly event: EventNames;

    protected constructor(event: EventNames) {
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
