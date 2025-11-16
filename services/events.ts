// src/events/events.ts
// EventBus (class) — type-safe on()/off() overloads implemented as generic handler.
// NOTE: Keep an eye on module locations and imports — see top-level notes.

import {
    EventDetailUnion,
    isCartUpdated,
    isCheckoutStart,
    isCheckoutProgress,
    isCheckoutStatus,
    isCheckoutSuccess,
    isCheckoutFailed
} from '../entities/eventDetails';

import { EventDetail, EventNames } from '../entities/base';

type Listener<T extends EventDetail> = (detail: T) => void;

export class EventBus {
    /**
     * Emit a typed event.
     *
     * @param detail - an instance of one of event detail classes (EventDetailUnion).
     * This instance will be attached to CustomEvent.detail and dispatched on window.
     *
     * Note: listeners receive the actual class instance (not a plain object).
     */
    static emit(detail: EventDetailUnion): void {
        const ev = new CustomEvent(detail.event, { detail });
        window.dispatchEvent(ev);
    }

    /**
     * Subscribe to an event.
     *
     * @param eventName - one of EventNames enum values.
     * @param listener - callback that receives the typed detail instance. At runtime a guard
     * checks that the detail matches the expected class before calling the listener.
     * @returns unsubscribe function.
     *
     * Implementation note:
     * - The wrapper uses runtime instanceof checks (via the isX guards) to ensure that only
     *   valid class instances are forwarded to the listener.
     * - If an external emitter dispatches a plain object (not an instance), it will be ignored
     *   by the wrapper. If you want to accept plain objects, implement fromJSON factory methods
     *   in detail classes and attempt reconstruction here.
     */
    static on(eventName: EventNames, listener: (detail: EventDetailUnion) => void): () => void {
        const wrapper = (ev: Event) => {
            const ce = ev as CustomEvent<EventDetailUnion>;
            const d = ce.detail;

            // runtime guards: if detail is not the expected class — ignore
            switch (eventName) {
                case EventNames.CART_UPDATED:
                    if (isCartUpdated(d)) listener(d);
                    break;
                case EventNames.CHECKOUT_START:
                    if (isCheckoutStart(d)) listener(d);
                    break;
                case EventNames.CHECKOUT_PROGRESS:
                    if (isCheckoutProgress(d)) listener(d);
                    break;
                case EventNames.CHECKOUT_STATUS:
                    if (isCheckoutStatus(d)) listener(d);
                    break;
                case EventNames.CHECKOUT_SUCCESS:
                    if (isCheckoutSuccess(d)) listener(d);
                    break;
                case EventNames.CHECKOUT_FAILED:
                    if (isCheckoutFailed(d)) listener(d);
                    break;
            }
        };
        window.addEventListener(eventName, wrapper as EventListener);
        return () => window.removeEventListener(eventName, wrapper as EventListener);
    }

    /**
     * Unregister a previously registered EventListener (low-level).
     *
     * @param eventName - string event name (prefer EventNames enum when calling).
     * @param listener - actual EventListener to remove.
     *
     * Note: prefer the unsubscribe returned by on(...) instead of calling off directly.
     */
    static off(eventName: string, listener: EventListener): void {
        window.removeEventListener(eventName, listener);
    }
}
