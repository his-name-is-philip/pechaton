// src/index.ts
/// <reference path="./assets/barba-shim.d.ts" />
/// <reference path="./assets/anime-shim.d.ts" />
import { rebindPage } from './adapters/barbaAdapter';
// Side-effect import to include the site runtime (animations, modules) inside the bundle
import './assets/site.Dca_zzip.js';
// Import Barba transitions and views configuration (init function)
import { registerCatalogRenderer  } from './assets/mybarba';
import { openCartModal, closeCartModal } from './ui/cartView';
import { registerCartEvents, refreshCartBadge } from './ui/cartEvents';

const ONCE_ANIMATE_CLASS = '-onceAnimate';
const LOADER_CLEANUP_TIMEOUT = 6_000;

/**
 * Initialize the application:
 * - mount persistent UI (cart overlay)
 * - bind UI controls (cart toggle)
 * - run initial DOM binding for add-to-cart buttons
 * - try to initialize or hook into Barba.js to rebind after navigation
 */
function init(): void {
    console.log('index.ts: init');

    // Initialize Barba (sets up views and afterEnter hooks)
    try {
        registerCatalogRenderer ();
    } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('registerCatalogRenderer failed', err);
    }

    // Remove initial loader once the loader animation runs (or fall back after a timeout)
    scheduleLoaderCleanup();

    // Mount persistent UI components that should survive page transitions.
    // Cart overlay is controlled via hash routing and direct API calls.

    registerCartEvents();

    // Initial DOM binding for add-to-cart buttons (existing DOM)
    // rebindPage(document);

    // If current page contains the catalog grid, render catalog programmatically.
    // This ensures resources.html gets populated on initial load (non-Barba navigation).
    const catalogGrid = document.getElementById('catalog-grid');
    if (catalogGrid) {
        // console.log('index.ts: catalogGrid found, rendering catalog');
            // catalogService.renderCatalog(catalogGrid).catch((err) => {
            //     // eslint-disable-next-line no-console
            //     console.error('Failed to render catalog on initial load', err);
            // });
    } else {
        // eslint-disable-next-line no-console
        console.debug('catalogGrid not found on initial load');
    }

    // Rebind also on initial load any other UI that depends on controller state.
    refreshCartBadge();

    // Attach hash-based routing for the cart overlay
    setupCartHashRouting();
}

/* Helpers */

/**
 * Handle cart opening/closing via URL hash (`#cart`).
 */
function setupCartHashRouting(): void {
    const syncWithHash = (): void => {
        if (window.location.hash === '#cart') {
            openCartModal();
        } else {
            closeCartModal();
        }
    };

    window.addEventListener('hashchange', syncWithHash);
    syncWithHash();
}
/**
 * Ensure the page becomes interactive on initial load:
 * - remove html "is-loading" class
 * - add html "is-loaded" class
 * - hide/remove the splash loader element if present
 */
function releaseInitialLoader(): void {
    const htmlEl = document.documentElement;
    if (htmlEl.classList.contains('is-loading')) {
        htmlEl.classList.remove('is-loading');
        htmlEl.classList.add('is-loaded');
    }
    const loaderEl = document.getElementById('js-loader');
    if (loaderEl) {
        try {
            loaderEl.remove();
        } catch {
            (loaderEl as HTMLElement).style.display = 'none';
        }
    }
    (document.body as HTMLBodyElement).style.overflow = '';
}

/**
 * This is for preventing index.ts from being loaded before the loader animation runs.
 * Schedule the cleanup of the initial loader once the loader animation runs (or fall back after a timeout)
 */
function scheduleLoaderCleanup(): void {
    const body = document.body;
    if (!body) {
        releaseInitialLoader();
        return;
    }

    let cleaned = false;
    let observer: MutationObserver | null = null;
    let fallbackId: number | null = null;

    const cleanup = () => {
        if (cleaned) {
            return;
        }
        cleaned = true;
        if (observer) {
            observer.disconnect();
        }
        if (fallbackId !== null) {
            window.clearTimeout(fallbackId);
        }
        releaseInitialLoader();
    };

    if (body.classList.contains(ONCE_ANIMATE_CLASS)) {
        cleanup();
        return;
    }

    observer = new MutationObserver(() => {
        if (body.classList.contains(ONCE_ANIMATE_CLASS)) {
            cleanup();
        }
    });
    observer.observe(body, { attributes: true, attributeFilter: ['class'] });
    fallbackId = window.setTimeout(cleanup, LOADER_CLEANUP_TIMEOUT);
}

/* Auto init on DOMContentLoaded */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

/* Expose for debug / manual control (optional) */
export { init };
