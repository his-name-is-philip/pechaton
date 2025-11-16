// src/entities/cartModel.ts

import { CartItem } from "./base";

export interface CartSnapshot {
    version: number;
    items: CartItem[];
    updatedAt: string;
}

/**
 * Pure cart model: holds unique items (one copy per worksheet).
 * No side-effects here (no persistence, no events).
 *
 * Документация к экспортируемым методам:
 * - constructor(): создаёт пустую модель корзины.
 * - getItems(): CartItem[] — возвращает копию списка элементов корзины.
 * - has(worksheetId: number): boolean — проверяет наличие товара по id.
 * - add(item: CartItem): boolean — добавляет товар, если его ещё нет; возвращает true если добавлен.
 * - remove(worksheetId: number): boolean — удаляет товар; возвращает true если удалён.
 * - clear(): void — очищает корзину.
 * - getTotals(): { subtotalKopecks: number; totalKopecks: number } — считает итоги в копейках.
 * - serialize(): CartSnapshot — сериализует текущее состояние.
 * - loadSnapshot(snapshot: CartSnapshot | null): void — загружает snapshot (без побочных эффектов).
 */
export default class CartModel {
    private items: Map<number, CartItem>;

    constructor() {
        this.items = new Map<number, CartItem>();
    }

    /**
     * Возвращает массив копий элементов корзины.
     */
    getItems(): CartItem[] {
        return Array.from(this.items.values()).map((i) => ({ ...i }));
    }

    /**
     * Проверяет, есть ли товар с указанным id в корзине.
     */
    has(worksheetId: number): boolean {
        return this.items.has(worksheetId);
    }

    /**
     * Добавляет элемент в корзину, только если такого ещё нет.
     * Возвращает true при успешном добавлении, false если элемент уже присутствует.
     * Бросает ошибку, если worksheetId некорректен.
     */
    add(item: CartItem): boolean {
        const id = item.worksheetId;
        if (!Number.isInteger(id) || id <= 0) {
            throw new Error('Invalid worksheetId');
        }
        if (this.items.has(id)) return false;
        this.items.set(id, { worksheetId: id, name: String(item.name), priceKopecks: Number(item.priceKopecks) });
        return true;
    }

    /**
     * Удаляет товар по worksheetId. Возвращает true, если товар был удалён.
     */
    remove(worksheetId: number): boolean {
        return this.items.delete(worksheetId);
    }

    /**
     * Полностью очищает корзину.
     */
    clear(): void {
        this.items.clear();
    }

    /**
     * Подсчитывает итоговые суммы в копейках.
     * Возвращает объект { subtotalKopecks, totalKopecks }.
     * На текущий момент total == subtotal (без налогов/доставки).
     */
    getTotals(): { subtotalKopecks: number; totalKopecks: number } {
        let subtotal = 0;
        for (const it of this.items.values()) {
            subtotal += Math.round(it.priceKopecks);
        }
        return { subtotalKopecks: subtotal, totalKopecks: subtotal };
    }

    /**
     * Сериализует текущее состояние корзины в CartSnapshot.
     */
    serialize(): CartSnapshot {
        return {
            version: 1,
            items: this.getItems(),
            updatedAt: new Date().toISOString()
        };
    }

    /**
     * Загружает snapshot в модель. Если snapshot === null — ничего не делает.
     * Этот метод НЕ выполняет побочных эффектов (не записывает в storage, не эмитит событий).
     */
    loadSnapshot(snapshot: CartSnapshot | null): void {
        this.items.clear();
        if (!snapshot || !Array.isArray(snapshot.items)) return;
        for (const it of snapshot.items) {
            if (it && Number.isInteger(it.worksheetId) && it.worksheetId > 0) {
                this.items.set(it.worksheetId, { worksheetId: it.worksheetId, name: it.name, priceKopecks: it.priceKopecks });
            }
        }
    }
}
