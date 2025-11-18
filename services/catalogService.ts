// src/services/catalogService.ts
import { Worksheet, parseRawWorksheet } from '../entities/worksheet';
import { appendProductCardTo } from '../ui/productCard';
import { rebindPage } from '../adapters/barbaAdapter';

const CATALOG_URL = 'assets/goods.json';

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
        console.log('catalogService: getAllGoods');
        if (this.cache) return Array.from(this.cache.values());
        console.log('catalogService: getAllGoods, no cache');
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
     * todo get rid of getAll() call here
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
     * - This method fetches items (using the internal cache) and programmatically
     *   creates product card nodes via appendProductCardTo (from ui/productCard).
     * - After appending cards, it calls rebindPage(rowElement) to attach click handlers.
     *
     * @param container - optional ParentNode or CSS selector string for the row container.
     *                    If omitted, uses '#catalog-grid .row' or '#catalog-grid' as fallback.
     * @returns Promise resolving to the array of rendered Worksheet objects.
     */
    async renderCatalog(container?: ParentNode | string): Promise<Worksheet[]> {
        console.log('catalogService: renderCatalog');
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

        // Clear existing rendered children (keep the row element itself)
        // If rowEl is the outer wrapper that contains the row, try to find inner row
        let appendTarget: ParentNode = rowEl;
        if ((rowEl as Element).classList && (rowEl as Element).classList.contains('column-22')) {
            const inner = (rowEl as Element).querySelector('.row');
            if (inner) appendTarget = inner;
        }

        // Диагностика: перед удалением детей
        // console.group('catalogService: debug appendTarget vs global selector');
        // console.log('appendTarget (the one we will clear):', appendTarget);
        // console.log('appendTarget.isConnected:', appendTarget instanceof Element ? appendTarget.isConnected : '(not Element)');
        // console.log('appendTarget child count:', (appendTarget instanceof Element) ? appendTarget.childElementCount : '(n/a)');
        // console.log('global selector #catalog-grid .row ->', document.querySelector('#catalog-grid .row'));
        // console.log('global selector #catalog-grid ->', document.querySelector('#catalog-grid'));
        // console.groupEnd();


        // Remove all existing product columns
        while (appendTarget.firstChild) {
            appendTarget.removeChild(appendTarget.firstChild);
            // console.log('catalogService: child removed', String(appendTarget.firstChild?.textContent).trim());
        }

        // Optional: insert a minimal loading indicator
        const loader = document.createElement('div');
        loader.className = 'catalog-loader';
        loader.textContent = 'Загрузка...';
        appendTarget.appendChild(loader);

        try {
            const items = await this.getAll();

            // remove loader
            if (loader.parentNode) loader.parentNode.removeChild(loader);
            console.log('catalogService: appendTarget children count:', appendTarget.childElementCount);
            // append cards
            for (const ws of items) {
                appendProductCardTo(ws, appendTarget);
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
            // cleanup loader and rethrow for caller to handle
            if (loader.parentNode) loader.parentNode.removeChild(loader);
            throw err;
        }
    }
}

export const catalogService = new CatalogService();
export default catalogService;
