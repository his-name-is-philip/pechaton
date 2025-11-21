// src/ui/productPage.ts

import catalogService from '../services/catalogService';
import cartController from '../services/cartController';
import { Worksheet, formatPrice } from '../entities/worksheet';
import { setAddedState, flashElement, setDefaultState } from './productCard';
import { btnHasAddedState, handleAddToCartError, handleAlreadyAddedClick } from './cartEvents';

/**
 * Parse numeric id from current location search 'id' parameter.
 * Returns a positive integer or null if invalid.
 */
function parseIdFromLocation(): number | null {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get('id');
    if (!raw) return null;
    const n = Number(raw);
    if (!Number.isFinite(n) || !Number.isInteger(n) || n <= 0) return null;
    return n;
}

/**
 * Insert text into an element if that element exists.
 */
function setText(selector: string | ParentNode, text: string, container?: ParentNode | Document): void {
    const root = (container ?? document) as ParentNode;
    const el = typeof selector === 'string' ? (root.querySelector(selector) as HTMLElement | null) : (selector as HTMLElement | null);
    if (el) el.textContent = text;
}

/**
 * Set HTML (innerHTML) into element if exists.
 */
function setHTML(selector: string, html: string, container?: ParentNode | Document): void {
    const root = (container ?? document) as ParentNode;
    const el = root.querySelector(selector) as HTMLElement | null;
    if (el) el.innerHTML = html;
}

/**
 * Main initializer for product page.
 *
 * - Attempts to acquire Worksheet by id from URL.
 * - If not found, shows an inline message and returns.
 * - Fills page title, header, id, price, description and preview image.
 * - Binds back button ("Материалы") to history.back().
 *
 * @param container - optional parent node (Barba provides data.next.container)
 */
export async function initProductPage(container: ParentNode): Promise<void> {
    // 1) Acquire id
    const id = parseIdFromLocation();
    if (!id) {
        // show gentle error
        console.error('productPage: missing or invalid id in URL');
        showNotFound(container);
        return;
    }

    // 2) Acquire worksheet from catalogService
    let worksheet: Worksheet | null = null;
    worksheet = (await catalogService.getById(id)) ?? null;

    if (!worksheet) {
        // not found
        showNotFound(container);
        return;
    }

    // 3) Fill document title
    try {
        document.title = `${worksheet.name} — Печатон`;
    } catch (e) {
        console.warn('productPage: error setting document title', e);
    }

    // 4) Fill visible fields in the DOM. Prefer explicit ids if present, otherwise try best-effort selectors.

    // 4.1 Title (h1 with data-title=title or .a-title)
    const titleEl = (container.querySelector('[data-title=title]') as HTMLElement | null) || (container.querySelector('.a-title') as HTMLElement | null);
    if (titleEl) titleEl.textContent = worksheet.name;

    // 4.2 Replace the big heading (if there is another heading)
    const bigH1 = (container.querySelector('h1.a-title') as HTMLElement | null);
    if (bigH1) bigH1.textContent = worksheet.name;

    // 4.3 ID bubble (e.g. .m-adDetail__circle)
    const idBubble = container.querySelector('.m-adDetail__circle') as HTMLElement | null;
    if (idBubble) idBubble.textContent = String(worksheet.id);

    // 4.4 Price: try #product-price if present, or the third .m-adDetail span if possible
    const priceElById = container.querySelector('#product-price') as HTMLElement | null;
    if (priceElById) {
        priceElById.textContent = formatPrice(worksheet.priceKopecks);
    } else {
        // try to find third .m-adDetail .tx-s inside left column (best-effort)
        const mDetails = Array.from(container.querySelectorAll('.t-adsItem__details .m-adDetail, .m-adDetail')) as Element[];
        if (mDetails.length >= 3) {
            const el = mDetails[2].querySelector('.tx-s') as HTMLElement | null;
            if (el) el.textContent = formatPrice(worksheet.priceKopecks);
        } else {
            // fallback: try any element that looks like price
            const anyPrice = container.querySelector('.m-adDetail .tx-s, .a-price, .product-price') as HTMLElement | null;
            if (anyPrice) anyPrice.textContent = formatPrice(worksheet.priceKopecks);
        }
    }

    // 4.5 Description: try #product-description or .t-adsItem__description
    const descById = container.querySelector('#product-description') as HTMLElement | null;
    if (descById) {
        descById.textContent = worksheet.description;
    } else {
        const descEl = container.querySelector('.t-adsItem__description, .m-contentPublic, .m-contentPublic__ahead') as HTMLElement | null;
        if (descEl) {
            // replace inner text safely
            descEl.textContent = worksheet.description;
        }
    }

    // 4.6 Set preview image: we expect product.html to include <img id="product-preview">
    const img = (container.querySelector('#product-preview') as HTMLImageElement | null);
    if (img) {
        img.src = worksheet.previewUrl;
        img.alt = worksheet.name;
    } else {
        // If no img element exists, try to replace the earlier contact block with an image container
        const contactBlock = container.querySelector('.t-adsItem__contact') as HTMLElement | null;
        if (contactBlock) {
            const fig = document.createElement('figure');
            fig.className = 'a-image t-adsItem__contactCover -product-preview';
            const newImg = document.createElement('img');
            newImg.id = 'product-preview';
            newImg.className = 'a-image__image js-image-image -landscape';
            newImg.alt = worksheet.name;
            newImg.src = worksheet.previewUrl;
            fig.appendChild(newImg);
            contactBlock.parentNode?.replaceChild(fig, contactBlock);
        }
    }

    //todo а эта кнопка есть? создай
    // 5) Bind "Материалы" back button: prefer element with class .js-back-to-resources or data-back-button
    const backBtn =
        (document.querySelector('.js-back-to-resources') as HTMLElement | null) ||
        (container.querySelector('[data-back-button]') as HTMLElement | null) ||
        // try to find button with exact text 'Материалы'
        Array.from(document.querySelectorAll('button, a')).find((el) => el.textContent?.trim() === 'Материалы') as HTMLElement | null;

    if (backBtn) {
        backBtn.addEventListener('click', (ev) => {
            ev.preventDefault();
            // Navigate back in history
            if (window.history.length > 1) {
                history.back();
            } else {
                // fallback: go to resources page
                window.location.href = './resources.html';
            }
        });
    }

    // 6) Bind add-to-cart inside product page if present (element with .js-add-to-cart)
    const addBtn = container.querySelector('.js-add-to-cart') as HTMLElement | null;
    if (addBtn) {
        // Set initial state based on cart
        if (cartController.has(worksheet.id)) {
            setAddedState(addBtn);
        } else {
            setDefaultState(addBtn);
        }

        //todo слушателю тут не место, объедини или просто вынеси отдельной функцией
        addBtn.addEventListener('click', async (ev) => {
            ev.preventDefault();
            ev.stopPropagation();

            // If already added, simply flash and return
            if (btnHasAddedState(addBtn)) {
                handleAlreadyAddedClick(addBtn);
                return;
            }

            try {
                const added = cartController.addFromWorksheet(worksheet as Worksheet);
                // Always sync visual state with cart contents, regardless of return value.
                // If the item was already in the cart (added === false), we still want the
                // button to reflect the "added" state, then provide a small flash feedback.
                setAddedState(addBtn);
                if (!added) {
                    // already present - flash briefly
                    flashElement(addBtn);
                }
            } catch (err) {
                handleAddToCartError(addBtn, err);
            }
        });
    }

    // 7) Ensure any in-page links that should preserve SPA behavior use Barba (optional)
    // e.g. convert links with relative hrefs to use Barba if needed - left to caller.

    // Done
}

/**
 * Show a not-found message in the container.
 */
function showNotFound(container: ParentNode): void {
    // Simple inline message; could be replaced with styled error block
    const root = (container ?? document) as ParentNode;
    const holder = document.createElement('div');
    holder.className = 'product-not-found';
    holder.innerHTML = '<p>Рабочий лист не найден. Вернитесь назад.</p>';
    root.appendChild(holder);
    // Optionally go back after a few seconds:
    setTimeout(() => {
        if (window.history.length > 1) history.back();
        else window.location.href = './resources.html';
    }, 2500);
}

export default initProductPage;
