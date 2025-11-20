// src/ui/productCard.ts
import { Worksheet, formatPrice } from '../entities/worksheet';
import cartController from '../services/cartController';
import catalogService from '../services/catalogService';
import {
    btnHasAddedState,
    handleAddToCartError,
    drawUiAddedToCart,
    handleAlreadyAddedClick,
    setAddedState,
    setDefaultState
} from './cartEvents';

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
    
    // const match = ws.previewUrl.match(/id=(.*)$/);
    // img.src = `media/previews/${match?.[1]}.png`;
    img.src = ws.previewUrl;
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
            handleAlreadyAddedClick(btn);
            return;
        }

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
            drawUiAddedToCart(btn, added);
            // cartController will emit cart updated and persist via storageAdapter
        } catch (err) {
            handleAddToCartError(btn, err);
        }
    });

    return outer;
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
