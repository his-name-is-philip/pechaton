// assets/mybarba.ts
/**
 * mybarba.ts (with click-intercept debugging)
 *
 * Minimal logic:
 *  - on full-page load (DOMContentLoaded) load CSS for resources if page is resources
 *  - try to init Barba (poll shortly)
 *  - on Barba transitions enter -> load CSS for resources + rebindPage
 *  - additionally: intercept clicks on anchors that point to "resources" and load CSS immediately
 *
 * The click-interceptor fixes the case when Barba navigation happens without firing DOMContentLoaded
 * and when our Barba hooks did not run (e.g., Barba wasn't registered or assigned our hooks).
 */

import { loadCSS, unloadCSSByNamespace } from './cssHelper';
import { rebindPage } from '../adapters/barbaAdapter';

// ---- types ----
interface BarbaContainer {
    container: HTMLElement;
    namespace?: string;
}
interface BarbaData {
    current?: BarbaContainer;
    next: BarbaContainer;
}

// ---- constants ----
const uniqCSS = '/assets/catalogTestStyles.css';
const RES_NS = 'resources';

// ---- fade helpers (same as before) ----
function fadeOut(el?: HTMLElement, duration = 300): Promise<void> {
    console.debug('[mybarba] fadeOut called', { el, duration });
    return new Promise((resolve) => {
        if (!el) {
            console.debug('[mybarba] fadeOut: no element -> resolve');
            return resolve();
        }
        el.style.transition = `opacity ${duration}ms ease`;
        el.style.opacity = '0';
        let done = false;
        const onEnd = () => {
            if (done) return;
            done = true;
            el.removeEventListener('transitionend', onEnd);
            console.debug('[mybarba] fadeOut transitionend');
            resolve();
        };
        el.addEventListener('transitionend', onEnd);
        setTimeout(() => {
            if (!done) onEnd();
        }, duration + 50);
    });
}

function fadeIn(el?: HTMLElement, duration = 300): Promise<void> {
    console.debug('[mybarba] fadeIn called', { el, duration });
    return new Promise((resolve) => {
        if (!el) {
            console.debug('[mybarba] fadeIn: no element -> resolve');
            return resolve();
        }
        el.style.opacity = '0';
        requestAnimationFrame(() => {
            el.style.transition = `opacity ${duration}ms ease`;
            el.style.opacity = '1';
        });
        let done = false;
        const onEnd = () => {
            if (done) return;
            done = true;
            el.removeEventListener('transitionend', onEnd);
            console.debug('[mybarba] fadeIn transitionend');
            resolve();
        };
        el.addEventListener('transitionend', onEnd);
        setTimeout(() => {
            if (!done) onEnd();
        }, duration + 50);
    });
}

// ---- helper detect namespace on initial load ----
function detectCurrentNamespace(): string | null {
    console.debug('[mybarba] detectCurrentNamespace() start');
    const nsAttr =
        document.querySelector<HTMLElement>('[data-barba-namespace]')?.getAttribute('data-barba-namespace') ||
        document.querySelector<HTMLElement>('[data-namespace]')?.getAttribute('data-namespace') ||
        null;

    if (nsAttr) {
        console.debug('[mybarba] namespace found via attribute:', nsAttr);
        return nsAttr;
    }

    const path = window.location.pathname || '';
    console.debug('[mybarba] path for namespace detection:', path);
    if (path.endsWith('/resources.html') || path.endsWith('/resources')) {
        console.debug('[mybarba] namespace inferred from path => resources');
        return RES_NS;
    }
    console.debug('[mybarba] no namespace detected');
    return null;
}

// ---- Barba setup wrapper ----
function setupBarbaIfAvailable(): boolean {
    const wbarba = (window as any).barba;
    console.debug('[mybarba] setupBarbaIfAvailable: window.barba present?', !!wbarba);

    if (!wbarba || typeof wbarba.init !== 'function') {
        console.debug('[mybarba] Barba not available now');
        return false;
    }

    console.info('[mybarba] Initializing Barba with minimal config');
    try {
        wbarba.init({
            transitions: [
                {
                    name: 'fade-transition',
                    async leave(data: BarbaData) {
                        console.debug('[mybarba][transition] leave', data?.current?.container);
                        await fadeOut(data.current?.container);
                        console.debug('[mybarba][transition] leave done');
                    },
                    async enter(data: BarbaData) {
                        console.debug('[mybarba][transition] enter next namespace=', data.next.namespace);
                        if ((data.next.namespace ?? '') === RES_NS) {
                            console.info('[mybarba] enter: resources namespace detected — loading CSS', uniqCSS);
                            try {
                                loadCSS(uniqCSS, RES_NS);
                                console.debug('[mybarba] loadCSS called in enter for resources');
                            } catch (err) {
                                console.warn('[mybarba] loadCSS failed in enter', err);
                            }
                        }
                        await fadeIn(data.next.container);
                        try {
                            console.debug('[mybarba] enter: calling rebindPage for new container');
                            rebindPage(data.next.container);
                        } catch (err) {
                            console.error('[mybarba] rebindPage failed in enter hook', err);
                        }
                        console.debug('[mybarba] enter hook finished');
                    }
                }
            ],
            views: [
                {
                    namespace: RES_NS,
                    afterLeave() {
                        console.info('[mybarba][view resources] afterLeave: unload CSS for resources');
                        try {
                            unloadCSSByNamespace(RES_NS);
                            console.debug('[mybarba] unloadCSSByNamespace(resources) called');
                        } catch (err) {
                            console.warn('[mybarba] unloadCSSByNamespace failed', err);
                        }
                    },
                    afterEnter(data?: BarbaData) {
                        console.debug('[mybarba][view resources] afterEnter', { data });
                        if (!data) return;
                        try {
                            rebindPage(data.next.container);
                            console.debug('[mybarba][view resources] rebindPage called');
                        } catch (err) {
                            console.error('[mybarba] rebindPage failed in resources.afterEnter', err);
                        }
                    }
                },
                {
                    namespace: 'default',
                    afterEnter(data?: BarbaData) {
                        console.debug('[mybarba][view default] afterEnter', { data });
                        if (!data) return;
                        try {
                            rebindPage(data.next.container);
                            console.debug('[mybarba][view default] rebindPage called');
                        } catch (err) {
                            console.error('[mybarba] rebindPage failed in default.afterEnter', err);
                        }
                    }
                }
            ]
        });
        console.info('[mybarba] Barba initialized successfully');
        return true;
    } catch (err) {
        console.error('[mybarba] Barba init threw:', err);
        return false;
    }
}

// ---- Polling init (short) ----
function initBarbaWithShortPoll(maxMs = 2000, intervalMs = 100): void {
    console.debug('[mybarba] initBarbaWithShortPoll start');
    if (setupBarbaIfAvailable()) {
        console.debug('[mybarba] Barba available immediately');
        return;
    }

    const start = Date.now();
    const timer = setInterval(() => {
        const elapsed = Date.now() - start;
        console.debug('[mybarba] poll tick', elapsed);
        if (setupBarbaIfAvailable()) {
            clearInterval(timer);
            console.info('[mybarba] Barba initialized during poll');
            return;
        }
        if (elapsed > maxMs) {
            clearInterval(timer);
            console.warn('[mybarba] Barba did not appear within timeout; giving up on poll');
        }
    }, intervalMs);
}

// ---- CLICK INTERCEPTOR (fix for SPA navigation where DOMContentLoaded does not fire) ----
/**
 * Intercepts clicks on anchor elements. If the clicked link target is resources (by href or data-namespace),
 * we pre-load the CSS immediately so that styles are available during the Barba transition.
 *
 * This is defensive: if Barba initialisation/hooks didn't run or run too late, CSS will still be loaded.
 */
function isAnchorToResources(anchor: HTMLAnchorElement): boolean {
    try {
        const href = anchor.getAttribute('href') ?? '';
        if (!href) return false;
        // simple heuristics: contains 'resources' or points to resources.html
        if (href.includes('/resources') || href.endsWith('resources.html') || href.endsWith('resources')) return true;
        // also check data attributes
        if ((anchor.dataset && (anchor.dataset.namespace === RES_NS || anchor.dataset.barbaNamespace === RES_NS))) return true;
        return false;
    } catch (err) {
        return false;
    }
}

document.addEventListener('click', (ev) => {
    try {
        const target = ev.target as HTMLElement | null;
        if (!target) return;
        const anchor = target.closest('a') as HTMLAnchorElement | null;
        if (!anchor) return;
        if (isAnchorToResources(anchor)) {
            console.info('[mybarba] click-intercept: anchor to resources clicked — preloading CSS', anchor.href);
            // avoid duplicate loads: check for existing link by data attribute or href
            const already = document.querySelector(`link[data-barba-css="${RES_NS}"], link[href="${uniqCSS}"]`);
            if (already) {
                console.debug('[mybarba] click-intercept: CSS already present, skipping load');
                return;
            }
            try {
                loadCSS(uniqCSS, RES_NS);
                console.debug('[mybarba] click-intercept: loadCSS called for resources');
            } catch (err) {
                console.warn('[mybarba] click-intercept: loadCSS failed', err);
            }
        }
    } catch (err) {
        console.warn('[mybarba] click-intercept handler error', err);
    }
}, { capture: true }); // capture so we run before other handlers if needed

// ---- DOMContentLoaded handler (initial load path) ----
console.log('[mybarba] script loaded — readyState:', document.readyState);
document.addEventListener('DOMContentLoaded', () => {
    console.log('[mybarba] DOMContentLoaded fired');

    // initial rebind of current DOM
    try {
        console.debug('[mybarba] initial rebindPage(document)');
        rebindPage(document);
    } catch (err) {
        console.error('[mybarba] initial rebindPage failed', err);
    }

    // if current page is resources -> load CSS immediately
    const currentNs = detectCurrentNamespace();
    console.debug('[mybarba] detectCurrentNamespace returned', currentNs);
    if (currentNs === RES_NS) {
        try {
            console.info('[mybarba] initial load of resources CSS', uniqCSS);
            loadCSS(uniqCSS, RES_NS);
            console.debug('[mybarba] initial loadCSS success for resources');
        } catch (err) {
            console.warn('[mybarba] initial loadCSS failed', err);
        }
    }

    // try to init Barba (or poll)
    initBarbaWithShortPoll();
});

// Also attempt init immediately in case script executed after DOMContentLoaded
console.debug('[mybarba] Attempt immediate Barba init (no DOM wait)');
initBarbaWithShortPoll();

// make module
export { };
