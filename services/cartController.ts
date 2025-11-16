// src/services/cartController.ts
import CartModel, { CartSnapshot } from '../entities/cartModel';
import storageAdapter from '../adapters/storageAdapter';
import { EventBus } from './events';
import { CartUpdatedDetail, CheckoutProgressDetail } from '../entities/eventDetails';
import { CartItem } from '../entities/base';
import { Worksheet } from '../entities/worksheet';

const CART_KEY = 'cart_v1';
const DEFAULT_DAYS = 180;

class CartController {
    private model: CartModel;
    private checkoutInProgress = false;

    constructor() {
        this.model = new CartModel();
        this.initFromStorage();
    }

    /**
     * Load snapshot from storage (if present) and emit initial CART_UPDATED event.
     * Note: CartUpdatedDetail currently expects (items, totals) but here only items are passed.
     * Please ensure CartUpdatedDetail signature matches usage.
     */
    private initFromStorage(): void {
        const snap = storageAdapter.get<CartSnapshot>(CART_KEY);
        if (snap) {
            this.model.loadSnapshot(snap);
        }
        // Emit strongly-typed event with a class instance
        const items = this.model.getItems();
        EventBus.emit(new CartUpdatedDetail(items));
    }

    /**
     * Persist cart snapshot to storage.
     */
    private persist(): void {
        const snapshot = this.model.serialize();
        storageAdapter.set<CartSnapshot>(CART_KEY, snapshot, { days: DEFAULT_DAYS });
    }

    /**
     * Add worksheet (one copy only). Returns true if item was added, false if it was already present.
     *
     * @param ws - object with id, name and priceKopecks properties.
     */
    addFromWorksheet(ws: Worksheet): boolean {
        const success = this.model.add({
            worksheetId: ws.id,
            name: ws.name,
            priceKopecks: ws.priceKopecks
        });
        if (success) {
            this.persist();
            EventBus.emit(new CartUpdatedDetail(this.model.getItems()));
        }
        if (!success) {
            console.log('addFromWorksheet: item already existed in cart');
        }
        return success;
    }

    /**
     * Remove item by worksheetId.
     *
     * @param worksheetId - numeric id to remove.
     * @returns true if removed.
     */
    removeFromWorksheet(worksheetId: number): boolean {
        const success = this.model.remove(worksheetId);
        if (success) {
            this.persist();
            EventBus.emit(new CartUpdatedDetail(this.model.getItems()));
        }
        if (!success) {
            console.log('removeFromWorksheet: item not found in cart');
        }
        return success;
    }

    /**
     * Clear the cart and persist the empty state.
     */
    clear(): void {
        this.model.clear();
        this.persist();
        EventBus.emit(new CartUpdatedDetail(this.model.getItems()));
    }

    /**
     * Get current cart items.
     *
     * @returns array of CartItem (worksheetId, name, priceKopecks).
     */
    getItems(): CartItem[] {
        return this.model.getItems();
    }

    /**
     * Get totals. Since CartTotals was removed, totals reflect subtotal only.
     *
     * @returns object with subtotalKopecks and totalKopecks (equal for now).
     */
    getTotals(): { subtotalKopecks: number; totalKopecks: number } {
        return this.model.getTotals();
    }

    /**
     * Check whether item exists in the cart.
     */
    has(worksheetId: number): boolean {
        return this.model.has(worksheetId);
    }

    /**
     * Set checkout-in-progress flag and emit CheckoutProgressDetail.
     *
     * @param flag - boolean indicating whether checkout is in progress.
     */
    setCheckoutInProgress(flag: boolean): void {
        this.checkoutInProgress = !!flag;
        EventBus.emit(new CheckoutProgressDetail(this.checkoutInProgress));
    }

    /**
     * Get current checkout-in-progress flag.
     */
    getCheckoutInProgress(): boolean {
        return this.checkoutInProgress;
    }
}

const cartController = new CartController();
export default cartController;
