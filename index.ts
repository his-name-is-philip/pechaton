// src/index.ts
/// <reference path="./assets/barba-shim.d.ts" />
/// <reference path="./assets/anime-shim.d.ts" />
import { rebindPage } from './adapters/barbaAdapter';
// Side-effect import to include the site runtime (animations, modules) inside the bundle
import './assets/site.Dca_zzip.js';
// Import Barba transitions and views configuration (init function)
import { registerCatalogRenderer  } from './assets/mybarba';
import cartController from './services/cartController';
import { openCartModal, closeCartModal } from './ui/cartView';

/**
 * Show the header briefly and auto-hide after a short period.
 *
 * Cases not to hide:
 * - User manually have hidden the header
 * - Scroll position goes up
 * - URL changed (user navigated to another page)
 * - The header was initially visible
 */
function dropHeaderFor2s(): { cancel: () => void } | void {
    const headerElement = document.querySelector('[data-module-header="header"]') || document.querySelector('header');
    if (!headerElement) {
        // eslint-disable-next-line no-console
        console.warn('Header element not found');
        return;
    }

    // Check 1: Header should not be hidden if it was already visible at the time of function call
    const wasAlreadyVisible = !headerElement.classList.contains('-isHidden');

    // Show header (remove potential hidden class)
    headerElement.classList.remove('-isHidden');

    const initialScrollY = window.scrollY;
    const initialUrl = window.location.href;
    let wasHiddenManually = false;

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (headerElement.classList.contains('-isHidden')) {
                    wasHiddenManually = true;
                }
            }
        });
    });

    observer.observe(headerElement, {
        attributes: true,
        attributeFilter: ['class']
    });

    // Keep header visible for 2 seconds, then hide it if user didn't scroll up and it wasn't hidden manually.
    const timeoutId = window.setTimeout(() => {
        observer.disconnect();
        
        // Check 2: Header should not be hidden if URL changed (user navigated to another page)
        const currentUrl = window.location.href;
        const urlChanged = currentUrl !== initialUrl;
        
        const currentScrollY = window.scrollY;
        const scrollDidNotGoUp = currentScrollY >= initialScrollY;
        
        if (scrollDidNotGoUp && !wasHiddenManually && !wasAlreadyVisible && !urlChanged) {
            headerElement.classList.add('-isHidden');
        }
    }, 2000);

    return {
        cancel: () => {
            clearTimeout(timeoutId);
            observer.disconnect();
        }
    };
}

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

    // Remove initial loader and prepare page
    releaseInitialLoader();

    // Mount persistent UI components that should survive page transitions.
    // Cart overlay is controlled via hash routing and direct API calls.

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
 * Refresh any visible cart badge indicators based on current cart state.
 * If your UI contains a badge element with class '.js-cart-count', it will be updated.
 */
function refreshCartBadge(): void {
    const count = cartController.getItems().length;
    const badges = Array.from(document.querySelectorAll<HTMLElement>('.js-cart-count'));
    for (const el of badges) {
        el.textContent = String(count);
        el.setAttribute('aria-label', `Cart items: ${count}`);
    }
}

/**
 * Handle cart opening/closing via URL hash (`#cart`).
 */
function setupCartHashRouting(): void {
    // eslint-disable-next-line no-console
    console.log('setupCartHashRouting');
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

/* Auto init on DOMContentLoaded */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

/* Expose for debug / manual control (optional) */
export { init, refreshCartBadge, dropHeaderFor2s };
