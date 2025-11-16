// src/services/catalogService.ts
import { Worksheet, parseRawWorksheet } from '../entities/worksheet';
import { appendProductCardTo } from '../ui/productCard';
import { rebindPage } from '../adapters/barbaAdapter';

const CATALOG_URL = '/assets/goods.json';

export class CatalogService {
    private cache: Map<number, Worksheet> | null = null;

    /**
     * Fetch and return all worksheets from the goods.json.
     *
     * - Uses an in-memory cache to avoid refetching.
     * - Parses and validates entries with parseRawWorksheet; invalid entries are skipped with a warning.
     *
     * @returns Promise resolving to an array of valid Worksheet objects.
     */
    async getAll(): Promise<Worksheet[]> {
        console.log('getAllGoods');
        if (this.cache) return Array.from(this.cache.values());
        const resp = await fetch(CATALOG_URL, { method: 'GET', credentials: 'same-origin' });
        if (!resp.ok) {
            throw new Error(`Failed to load catalog: ${resp.status} ${resp.statusText}`);
        }
        const raw = (await resp.json()) as unknown;
        if (!Array.isArray(raw)) {
            throw new Error('Invalid goods.json format: expected array');
        }
        const map = new Map<number, Worksheet>();
        for (const entry of raw) {
            try {
                const ws = parseRawWorksheet(entry as any);
                map.set(ws.id, ws);
            } catch (err) {
                // eslint-disable-next-line no-console
                console.warn('catalogService: skipping invalid entry', err);
            }
        }
        this.cache = map;
        return Array.from(map.values());
    }

    /**
     * Get a worksheet by its numeric id.
     *
     * - If cache is present and contains the id, returns the item.
     * - Otherwise triggers getAll() to populate cache and then tries again.
     *
     * @param id - numeric worksheet id
     * @returns Promise resolving to Worksheet or null if not found
     */
    async getById(id: number): Promise<Worksheet | null> {
        if (this.cache && this.cache.has(id)) return this.cache.get(id) ?? null;
        await this.getAll();
        return this.cache?.get(id) ?? null;
    }

    /**
     * Clear the in-memory catalog cache.
     */
    clearCache(): void {
        this.cache = null;
    }

    /**
     * Render the catalog into the provided container (or the default grid).
     *
     * This implementation performs a DOM synchronization:
     * - it computes desired item IDs from the source (goods.json)
     * - finds existing rendered items (by data-id)
     * - removes obsolete DOM nodes
     * - inserts missing nodes
     * - reorders nodes to match source order
     *
     * This avoids duplicate cards when renderCatalog is called multiple times.
     *
     * @param container - optional ParentNode or CSS selector string for the row container.
     *                    If omitted, uses '#catalog-grid .row' or '#catalog-grid' as fallback.
     * @returns Promise resolving to the array of rendered Worksheet objects.
     */
    async renderCatalog(container?: ParentNode | string): Promise<Worksheet[]> {
        console.log('renderCatalog');
        // Determine row element where .col.mb-5 children will be appended
        let rowEl: ParentNode | null = null;
        if (typeof container === 'string') {
            const node = document.querySelector(container);
            rowEl = node ?? null;
        } else if (container instanceof Node) {
            rowEl = container;
        } else {
            // default selectors matching your template:
            rowEl = document.querySelector('#catalog-grid .row') || document.querySelector('#catalog-grid');
        }

        if (!rowEl) {
            throw new Error('Catalog grid container not found. Expected selector "#catalog-grid .row" or pass container.');
        }

        // Determine append target: prefer inner .row when outer wrapper passed
        let appendTarget: ParentNode = rowEl;
        if ((rowEl as Element).classList && (rowEl as Element).classList.contains('column-22')) {
            const inner = (rowEl as Element).querySelector('.row');
            if (inner) appendTarget = inner;
        }

        // Insert a loader if needed (will be removed once items are ready)
        const loader = document.createElement('div');
        loader.className = 'catalog-loader';
        loader.textContent = 'Загрузка...';
        // Only add loader if appendTarget appears empty or contains a previous loader only
        const hasProductChildren = Array.from(appendTarget.childNodes).some((n) => {
            return n.nodeType === Node.ELEMENT_NODE && (n as Element).classList.contains('col');
        });
        if (!hasProductChildren) {
            appendTarget.appendChild(loader);
        }

        try {
            const items = await this.getAll();

            // compute desired ids in string form (order matters)
            const desiredIds = items.map((ws) => String(ws.id));

            // Build map of existing rendered items: id -> outer `.col.mb-5` element
            const existingMap = new Map<string, Element>();
            const nodesWithId = appendTarget.querySelectorAll<HTMLElement>('[data-id]');
            nodesWithId.forEach((node) => {
                const idAttr = node.getAttribute('data-id');
                if (!idAttr) return;
                // find ancestor column element (.col.mb-5)
                const col = node.closest('.col.mb-5') as Element | null;
                const elementToTrack = col ?? node;
                if (!existingMap.has(idAttr)) {
                    existingMap.set(idAttr, elementToTrack);
                }
            });

            // Remove loader now (we are about to ensure DOM matches items)
            if (loader.parentNode) loader.parentNode.removeChild(loader);

            // Remove obsolete DOM nodes (present in existingMap but not in desiredIds)
            for (const [existingId, el] of existingMap.entries()) {
                if (!desiredIds.includes(existingId)) {
                    try {
                        if (el.parentNode) el.parentNode.removeChild(el);
                    } catch {
                        /* ignore removal errors */
                    }
                    existingMap.delete(existingId);
                }
            }

            // Ensure order and append missing nodes
            for (const ws of items) {
                const idStr = String(ws.id);
                const existingEl = existingMap.get(idStr);
                if (existingEl) {
                    // move existing element to correct order (append moves it)
                    appendTarget.appendChild(existingEl);
                } else {
                    // create and append new card
                    appendProductCardTo(ws, appendTarget);
                }
            }

            // rebind add-to-cart buttons within the appended block
            try {
                rebindPage(appendTarget);
            } catch (err) {
                // eslint-disable-next-line no-console
                console.warn('catalogService: rebindPage failed', err);
            }

            return items;
        } catch (err) {
            // cleanup loader if still present and rethrow
            if (loader.parentNode) loader.parentNode.removeChild(loader);
            throw err;
        }
    }
}

export const catalogService = new CatalogService();
export default catalogService;
