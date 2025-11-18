// src/ui/productCard.ts
import { Worksheet, formatPrice } from '../entities/worksheet';
import cartController from '../services/cartController';
import catalogService from '../services/catalogService';
import { EventBus } from '../services/events';
import { EventNames } from '../entities/base';
import { CartUpdatedDetail } from '../entities/eventDetails';
import { dropHeaderFor2s } from '../index';

/**
 * Create a product card element for the catalog grid.
 *
 * @param ws - Worksheet object (id, name, priceKopecks, previewUrl, etc.)
 * @returns HTMLElement representing the outer column (.col.mb-5)
 */
export function createProductCard(ws: Worksheet): HTMLElement {
    const productLink = `./product?id=${ws.id}`;
    const outer = document.createElement('a');
    outer.className = 'col mb-5';
    outer.href = productLink;
    outer.setAttribute('aria-label', `Перейти к товару ${ws.name}`);
    outer.dataset.barbaTrigger = 'catalog-card';

    const card = document.createElement('div');
    card.className = 'card h-100 | -radius';
    card.setAttribute('data-id', String(ws.id));

    // Product image
    const img = document.createElement('img');
    img.className = 'card-img-top';
    
    const match = ws.previewUrl.match(/id=(.*)$/);
    img.src = `media/previews/${match?.[1]}.png`;
    console.log('productCard: img.src:', img.src);
    img.alt = ws.name;
    // todo
    // img.loading = 'lazy';

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

    const btn = document.createElement('button');
    btn.type = 'button';
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
        ev.stopPropagation();
        // If already added, simply flash and return
        if (btnHasAddedState(btn)) {
            flashElement(btn);
            return;
        }

        // Immediate UI update
        setAddedState(btn);

        // Header animation: drop header for 2 seconds
        dropHeaderFor2s();

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
 * Update all product card buttons based on current cart state.
 * This function is called when CART_UPDATED event is emitted.
 */
function updateAllProductButtons(detail: CartUpdatedDetail): void {
    const cartItemIds = new Set(detail.items.map(item => item.worksheetId));
    const buttons = Array.from(document.querySelectorAll<HTMLElement>('.js-add-to-cart[data-id]'));
    
    for (const button of buttons) {
        const wsIdStr = button.getAttribute('data-id');
        if (!wsIdStr) continue;
        
        const wsId = Number.parseInt(wsIdStr, 10);
        if (Number.isNaN(wsId)) continue;
        
        const isInCart = cartItemIds.has(wsId);
        if (isInCart) {
            setAddedState(button);
        } else {
            setDefaultState(button);
        }
    }
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
 * Utility: create a card and append it to provided container node.
 *
 * @param ws - Worksheet
 * @param container - parent where to append the generated `.col.mb-5` node
 */
export function appendProductCardTo(ws: Worksheet, container: ParentNode): void {
    const card = createProductCard(ws);
    container.appendChild(card);
}

// Subscribe to CART_UPDATED events to keep buttons in sync
EventBus.on(EventNames.CART_UPDATED, (detail) => {
    if (detail instanceof CartUpdatedDetail) {
        updateAllProductButtons(detail);
    }
});

export default createProductCard;
