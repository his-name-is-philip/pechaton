// src/assets/mybarba.ts
import { initProductPage } from '@/ui/productPage';
import catalogService from '../services/catalogService';

enum NamespaceParam {
    CATALOG = '[data-barba-namespace="catalog"]',
    PRODUCT = '[data-barba-namespace="product-item"]',
}

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
     * @param el - the element matching NamespaceParam.CATALOG (Barba-inserted container or initial DOM)
     */
    function handleCatalogFound(el: Element): void {
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
    async function scanExisting(): Promise<void> {
        console.log('mybarba: scanExisting');
        const catalogEl = document.querySelector<Element>(NamespaceParam.CATALOG);
        if (catalogEl) handleCatalogFound(catalogEl);
        const productEl = document.querySelector<Element>(NamespaceParam.PRODUCT);
        if (productEl) initProductPage(productEl);
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
                if (el.matches(NamespaceParam.CATALOG)) {
                    handleCatalogFound(el);
                    continue;
                } else if (el.matches(NamespaceParam.PRODUCT)) {
                    initProductPage(el);
                    continue;
                }

                // todo хз че за двойной вызов, чекни
                // // Otherwise, check if the container exists somewhere inside the added subtree
                // const inner = el.querySelector(NamespaceParam.CATALOG);
                // if (inner) handleCatalogFound(inner);
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
