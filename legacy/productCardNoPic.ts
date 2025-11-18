// src/ui/productCard.ts
import { Worksheet, formatPrice } from '../entities/worksheet';
import cartController from '../services/cartController';
import catalogService from '../services/catalogService';

/**
 * Create a product card element for the catalog grid.
 *
 * @param ws - Worksheet object (id, name, priceKopecks, previewUrl, etc.)
 * @returns HTMLElement representing the outer column (.col.mb-5)
 */
export function createProductCard(ws: Worksheet): HTMLElement {
    const outer = document.createElement('div');
    outer.className = 'col mb-5';

    const card = document.createElement('div');
    card.className = 'card h-100 | -radius';
    card.setAttribute('data-id', String(ws.id));

    // Product image
    const img = document.createElement('img');
    img.className = 'card-img-top';
    img.src = ws.previewUrl;
    console.log('productCard: img.src:', img.src);
    img.alt = ws.name;
    img.loading = 'lazy';

    // Card body
    const body = document.createElement('div');
    body.className = 'card-body p-4';
    const bodyInner = document.createElement('div');
    bodyInner.className = 'text-center';
    const title = document.createElement('h5');
    title.className = 'tx-xs';
    title.textContent = ws.name;
    const priceEl = document.createElement('div');
    priceEl.innerText = formatPrice(ws.priceKopecks);
    bodyInner.appendChild(title);
    bodyInner.appendChild(priceEl);
    body.appendChild(bodyInner);

    // Card footer with action button
    const footer = document.createElement('div');
    footer.className = 'card-footer p-4 pt-0 border-top-0 bg-transparent';
    const footerInner = document.createElement('div');
    footerInner.className = 'text-center';

    const btn = document.createElement('a');
    btn.className = 'a-social | a-button -secondary js-add-to-cart';
    btn.setAttribute('role', 'button');
    btn.setAttribute('data-id', String(ws.id));
    btn.setAttribute('aria-label', `Add ${ws.name} to cart`);
    btn.style.cursor = 'pointer';
    // Build inner content with svg placeholder and text (SVG symbol expected elsewhere)
    btn.innerHTML = `<svg aria-hidden="true" class="a-svg" focusable="false"><use href="#icon-cart"></use></svg>&nbsp;В&nbsp;корзину`;

    footerInner.appendChild(btn);
    footer.appendChild(footerInner);

    card.appendChild(img);
    card.appendChild(body);
    card.appendChild(footer);
    outer.appendChild(card);

    // set initial added state based on cartController
    const isAdded = cartController.has(ws.id);
    if (isAdded) {
        setAddedState(btn);
    } else {
        setDefaultState(btn);
    }

    // attach click handler
    btn.addEventListener('click', async (ev) => {
        ev.preventDefault();
        // If already added, simply flash and return
        if (btnHasAddedState(btn)) {
            flashElement(btn);
            return;
        }

        // Immediate UI update
        setAddedState(btn);

        // Header animation: prefer global showHeaderWithAutoHide if present, otherwise fallback
        triggerHeaderDropFor2s();

        // Business logic: ensure we have worksheet data (ws param should be complete, but fallback to service)
        let worksheet = ws;
        try {
            if (!worksheet || typeof worksheet.id !== 'number') {
                const id = Number(btn.getAttribute('data-id'));
                const maybe = await catalogService.getById(id);
                if (!maybe) throw new Error('Worksheet not found');
                worksheet = maybe;
            }

            const added = cartController.addFromWorksheet(worksheet);
            if (!added) {
                // item already existed according to model; ensure UI reflects that and give feedback
                setAddedState(btn);
                flashElement(btn);
            }
            // cartController will emit cart updated and persist via storageAdapter
        } catch (err) {
            // On error, revert UI and notify user
            console.error('add to cart failed', err);
            setDefaultState(btn);
            alert('Не удалось добавить товар в корзину. Повторите попытку.');
        }
    });

    return outer;
}

/**
 * Set the button to "added" state.
 *
 * - Replace "-secondary" class with "-tertiary"
 * - Update text to "Добавлено"
 * - Set aria-pressed and aria-disabled
 */
export function setAddedState(button: HTMLElement): void {
    // preserve inner svg if present
    const svg = button.querySelector('svg');
    const svgHtml = svg ? svg.outerHTML : '';
    button.classList.remove('-secondary');
    if (!button.classList.contains('-tertiary')) button.classList.add('-tertiary');
    button.setAttribute('aria-pressed', 'true');
    button.setAttribute('aria-disabled', 'true');
    button.style.pointerEvents = 'none';
    // set text after svg
    if (svgHtml) {
        button.innerHTML = `${svgHtml}&nbsp;Добавлено`;
    } else {
        button.textContent = 'Добавлено';
    }
}

/**
 * Revert the button to default state.
 *
 * - Replace "-tertiary" with "-secondary"
 * - Set text to original "В корзину"
 * - Remove aria-disabled
 */
export function setDefaultState(button: HTMLElement): void {
    const svg = button.querySelector('svg');
    const svgHtml = svg ? svg.outerHTML : '';
    button.classList.remove('-tertiary');
    if (!button.classList.contains('-secondary')) button.classList.add('-secondary');
    button.removeAttribute('aria-pressed');
    button.removeAttribute('aria-disabled');
    button.style.pointerEvents = '';
    if (svgHtml) {
        button.innerHTML = `${svgHtml}&nbsp;В&nbsp;корзину`;
    } else {
        button.textContent = 'В корзину';
    }
}

/**
 * Return true if button is in added state (based on class or aria attribute).
 */
export function btnHasAddedState(button: HTMLElement): boolean {
    return button.classList.contains('-tertiary') || button.getAttribute('aria-disabled') === 'true';
}

/**
 * Small visual flash to give feedback when user tries to add already added item.
 */
function flashElement(el: HTMLElement): void {
    try {
        el.animate(
            [{ transform: 'scale(1)' }, { transform: 'scale(1.04)' }, { transform: 'scale(1)' }],
            { duration: 220 }
        );
    } catch {
        // fallback: no animation available
    }
}

/**
 * Trigger header drop for ~2 seconds.
 *
 * - If global function showHeaderWithAutoHide is defined, call it.
 * - Otherwise, fallback to a local transform animation on header element found by selector
 *   '[data-module-header="header"]' or 'header'.
 */
function triggerHeaderDropFor2s(): void {
    const globalFn = (window as any).showHeaderWithAutoHide;
    if (typeof globalFn === 'function') {
        try {
            globalFn(); // this function handles showing and auto-hide logic
            return;
        } catch (err) {
            // fall through to local fallback
            // eslint-disable-next-line no-console
            console.warn('showHeaderWithAutoHide threw, using fallback', err);
        }
    }

    const header = document.querySelector('[data-module-header="header"]') || document.querySelector('header');
    if (!header) return;

    // Apply a translateY down and then revert after 2000ms.
    const distance = 40; // pixels to drop
    const duration = 200; // ms for transition in/out
    try {
        // Use WAAPI if available
        const anim = header.animate(
            [
                { transform: 'translateY(0px)' },
                { transform: `translateY(${distance}px)` }
            ],
            { duration, easing: 'ease-out', fill: 'forwards' }
        );
        anim.onfinish = () => {
            // keep dropped for ~1800ms, then animate back
            setTimeout(() => {
                try {
                    header.animate(
                        [
                            { transform: `translateY(${distance}px)` },
                            { transform: 'translateY(0px)' }
                        ],
                        { duration, easing: 'ease-in', fill: 'forwards' }
                    );
                } catch {
                    (header as HTMLElement).style.transform = 'translateY(0px)';
                }
            }, 1800);
        };
    } catch {
        // Fallback to class toggle approach
        const el = header as HTMLElement;
        el.style.transition = `transform ${duration}ms ease-out`;
        el.style.transform = `translateY(${distance}px)`;
        setTimeout(() => {
            el.style.transform = 'translateY(0px)';
        }, 2000);
    }
}

/**
 * Utility: create a card and append it to provided container node.
 *
 * @param ws - Worksheet
 * @param container - parent where to append the generated `.col.mb-5` node
 */
export function appendProductCardTo(ws: Worksheet, container: ParentNode): void {
    const card = createProductCard(ws);
    container.appendChild(card);
}

export default createProductCard;
