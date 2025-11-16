// src/assets/mybarba.ts
import catalogService from '../services/catalogService';

const CATALOG_SELECTOR = '[data-barba-namespace="catalog"]';

/**
 * Register a watcher that detects insertion of the catalog container (Barba or direct load)
 * and triggers programmatic rendering of the catalog into that container.
 *
 * Use this function once during app initialization (e.g. call registerCatalogRenderer() from index.ts).
 */
export function registerCatalogRenderer(): void {
    // WeakSet prevents handling the same DOM element multiple times
    const handled = new WeakSet<Element>();

    /**
     * Handle a newly found catalog container element.
     *
     * @param el - the element matching CATALOG_SELECTOR (Barba-inserted container or initial DOM)
     */
    function handleFound(el: Element): void {
        if (handled.has(el)) return;
        handled.add(el);

        // Defer to an async helper so we can await renderCatalog and catch errors
        (async () => {
            try {
                // Try to find the #catalog-grid inside the provided container.
                // If not present, pass the container itself to renderCatalog (it will find inner .row).
                const grid = (el as Element).querySelector('#catalog-grid') as ParentNode | null;
                const target: ParentNode = grid ?? (el as ParentNode);

                // Render the catalog into the found target.
                // catalogService.renderCatalog will append product cards and call rebindPage internally.
                await catalogService.renderCatalog(target);
            } catch (err) {
                // eslint-disable-next-line no-console
                console.warn('catalog rendering failed for detected container', err);
            }
        })();
    }

    /**
     * Scan for an existing catalog container on initial load.
     */
    function scanExisting(): void {
        console.log('mybarba: scanExisting');
        const el = document.querySelector<Element>(CATALOG_SELECTOR);
        if (el) handleFound(el);
    }

    // Initial load: if DOM not ready, wait for DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener(
            'DOMContentLoaded',
            () => {
                scanExisting();
            },
            { once: true }
        );
    } else {
        scanExisting();
    }

    // Observe the document for inserted nodes (Barba dynamically replaces/inserts containers)
    const observer = new MutationObserver((mutations) => {
        // console.log('mybarba: mutation observer', mutations);
        for (const m of mutations) {
            for (let i = 0; i < m.addedNodes.length; i++) {
                const node = m.addedNodes[i];
                if (node.nodeType !== Node.ELEMENT_NODE) continue;
                const el = node as Element;

                // If the added node itself is the catalog container
                if (el.matches(CATALOG_SELECTOR)) {
                    handleFound(el);
                    continue;
                }

                // Otherwise, check if the container exists somewhere inside the added subtree
                const inner = el.querySelector(CATALOG_SELECTOR);
                if (inner) handleFound(inner);
            }
        }
    });

    const root = document.documentElement ?? document.body;
    if (root) {
        observer.observe(root, { childList: true, subtree: true });
    }

    // Clean up observer on page unload
    window.addEventListener(
        'beforeunload',
        () => {
            observer.disconnect();
        },
        { once: true }
    );
}
