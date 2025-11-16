// assets/mybarba.ts
/**
 * mybarba.ts
 *
 * Исправленная минимальная TypeScript-версия вашей исходной mybarba.js логики.
 *
 * Что делает:
 *  - При full-page load (DOMContentLoaded) проверяет текущий namespace страницы
 *    и, если это "resources", подгружает /assets/catalogTestStyles.css.
 *  - Инициализирует Barba, когда он доступен (если Barba уже загружен — сразу,
 *    иначе пытается в течение короткого времени ожидать его появление).
 *  - При Barba-переходах: leave -> fadeOut; enter -> (если namespace === 'resources' -> loadCSS),
 *    затем fadeIn; затем rebindPage для нового контейнера.
 *  - Для view namespace 'resources' — после ухода (afterLeave) выполняется unloadCSSByNamespace('resources').
 *
 * ВАЖНО: не добавлено никакой новой функциональности помимо описанной.
 */

import { loadCSS, unloadCSSByNamespace } from './cssHelper';
import { rebindPage } from '../adapters/barbaAdapter'; // путь поправь, если у тебя другой

// -----------------------------
// Типы (простые)
// -----------------------------
interface BarbaContainer {
    container: HTMLElement;
    namespace?: string;
}
interface BarbaData {
    current?: BarbaContainer;
    next: BarbaContainer;
}

// -----------------------------
// Конфигурация: namespace -> css
// -----------------------------
const PAGE_CSS_BY_NAMESPACE: Record<string, string> = {
    resources: '/assets/catalogTestStyles.css'
};

// -----------------------------
// Простейшие fade функции (Promise)
// -----------------------------
function fadeOut(el?: HTMLElement, duration = 300): Promise<void> {
    return new Promise((resolve) => {
        if (!el) return resolve();
        // ensure style exists
        el.style.transition = `opacity ${duration}ms ease`;
        el.style.opacity = '0';
        let done = false;
        const onEnd = () => {
            if (done) return;
            done = true;
            el.removeEventListener('transitionend', onEnd);
            resolve();
        };
        el.addEventListener('transitionend', onEnd);
        // safe fallback
        setTimeout(onEnd, duration + 50);
    });
}

function fadeIn(el?: HTMLElement, duration = 300): Promise<void> {
    return new Promise((resolve) => {
        if (!el) return resolve();
        el.style.opacity = '0';
        // force reflow/apply initial style
        requestAnimationFrame(() => {
            el.style.transition = `opacity ${duration}ms ease`;
            el.style.opacity = '1';
        });
        let done = false;
        const onEnd = () => {
            if (done) return;
            done = true;
            el.removeEventListener('transitionend', onEnd);
            resolve();
        };
        el.addEventListener('transitionend', onEnd);
        setTimeout(onEnd, duration + 50);
    });
}

// -----------------------------
// Helper: detect current page namespace on initial load
// -----------------------------
function detectCurrentNamespace(): string | null {
    // Common patterns:
    // - Barba v2: container has attribute data-barba-namespace="..."
    // - You might also have data-namespace or other marker; check both
    const nsAttr =
        document.querySelector<HTMLElement>('[data-barba-namespace]')?.getAttribute('data-barba-namespace') ||
        document.querySelector<HTMLElement>('[data-namespace]')?.getAttribute('data-namespace') ||
        null;

    if (nsAttr) return nsAttr;

    // Fallback: check URL path for resources.html
    const path = window.location.pathname || '';
    if (path.endsWith('/resources.html') || path.endsWith('/resources')) return 'resources';
    return null;
}

// -----------------------------
// Barba init wrapper
// -----------------------------
function setupBarbaIfAvailable(): boolean {
    // Use window.barba if provided by the CDN script
    const wbarba = (window as any).barba;
    if (!wbarba || typeof wbarba.init !== 'function') return false;

    // Initialize Barba with minimal transitions & views (as in your original logic)
    try {
        wbarba.init({
            transitions: [
                {
                    name: 'fade-transition',
                    async leave(data: BarbaData) {
                        await fadeOut(data.current?.container);
                    },
                    async enter(data: BarbaData) {
                        // If next namespace has CSS configured -> load it
                        const ns = data.next.namespace ?? '';
                        const cssHref = PAGE_CSS_BY_NAMESPACE[ns];
                        if (cssHref) {
                            try {
                                loadCSS(cssHref, ns); // loadCSS(href, namespace)
                            } catch (err) {
                                // don't block transition on CSS failure
                                // eslint-disable-next-line no-console
                                console.warn('loadCSS failed for', cssHref, err);
                            }
                        }

                        // Show new container
                        await fadeIn(data.next.container);

                        // Bind adapter logic (rebind add-to-cart etc.)
                        try {
                            rebindPage(data.next.container);
                        } catch (err) {
                            // eslint-disable-next-line no-console
                            console.error('rebindPage failed in enter hook', err);
                        }
                    }
                }
            ],
            views: [
                {
                    namespace: 'resources',
                    // afterLeave: unload resources css
                    afterLeave() {
                        try {
                            unloadCSSByNamespace('resources');
                        } catch (err) {
                            // eslint-disable-next-line no-console
                            console.warn('unloadCSSByNamespace failed for resources', err);
                        }
                    },
                    afterEnter(data?: BarbaData) {
                        if (!data) return;
                        try {
                            rebindPage(data.next.container);
                        } catch (err) {
                            // eslint-disable-next-line no-console
                            console.error('rebindPage failed in resources.afterEnter', err);
                        }
                    }
                },
                // Generic fallback view to ensure rebind on regular pages too
                {
                    namespace: 'default',
                    afterEnter(data?: BarbaData) {
                        if (!data) return;
                        try {
                            rebindPage(data.next.container);
                        } catch (err) {
                            // eslint-disable-next-line no-console
                            console.error('rebindPage failed in default.afterEnter', err);
                        }
                    }
                }
            ]
        });

        return true;
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Barba init threw an error', err);
        return false;
    }
}

// -----------------------------
// Try to init Barba now or poll a short time for it to appear
// -----------------------------
function initBarbaWithShortPoll(maxMs = 2000, intervalMs = 100): void {
    // Try immediately
    if (setupBarbaIfAvailable()) return;

    // Poll for a short period, in case Barba script is loaded slightly later
    const start = Date.now();
    const timer = setInterval(() => {
        if (setupBarbaIfAvailable()) {
            clearInterval(timer);
            return;
        }
        if (Date.now() - start > maxMs) {
            clearInterval(timer);
            // Give up quietly — Barba may not be used on full page loads.
        }
    }, intervalMs);
}

// -----------------------------
// DOMContentLoaded: initial bindings & CSS for direct load
// -----------------------------
document.addEventListener('DOMContentLoaded', () => {
    // 1) Bind add-to-cart handlers on the initial DOM
    try {
        rebindPage(document);
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Initial rebindPage(document) failed', err);
    }

    // 2) If the current page is resources (direct load), ensure its CSS is loaded now
    const currentNs = detectCurrentNamespace();
    if (currentNs) {
        const css = PAGE_CSS_BY_NAMESPACE[currentNs];
        if (css) {
            try {
                loadCSS(css, currentNs);
            } catch (err) {
                // eslint-disable-next-line no-console
                console.warn('Initial loadCSS failed for', css, err);
            }
        }
    }

    // 3) Try to initialize Barba (may be present already, or poll shortly)
    initBarbaWithShortPoll();
});

// Mark module
export { };
