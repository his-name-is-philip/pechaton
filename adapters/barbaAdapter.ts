// integration/barbaAdapter.ts
// Small utility to re-bind "Add to cart" buttons after Barba page transitions.
// Call rebindPage(container) after new content is inserted.

import catalogService from '../services/catalogService';
import cartController from '../services/cartController';
import { openCartModal } from '../ui/cartView';

/**
 * Rebind "Add to cart" buttons within the provided container (or document by default).
 *
 * - Finds elements with .js-add-to-cart and uses data-id attribute.
 * - Prevents double-binding by marking bound elements.
 *
 * @param container - optional ParentNode to scope query (defaults to document)
 */
export function rebindPage(container?: ParentNode) {
    console.log('barbaAdapter: rebindPage');
    // container — root element of the newly inserted section (barba provides), default document
    const root = container ?? document;
    // Assumes add buttons have class `.js-add-to-cart` and numeric data-id attribute
    const addButtons = Array.from(root.querySelectorAll<HTMLElement>('.js-add-to-cart'));

    addButtons.forEach(btn => {
        // remove previous listener marker
        if ((btn as any).__add_to_cart_bound) return; // already bound
        // todo слушатель вообще не тут должен быть. его нужно перенести в productCard.ts
        btn.addEventListener('click', async (ev) => {
            ev.preventDefault();
            const idAttr = btn.getAttribute('data-id');
            if (!idAttr) {
                console.warn('add-to-cart clicked without data-id');
                return;
            }
            const id = Number(idAttr);
            if (!Number.isInteger(id) || id <= 0) {
                console.warn('invalid product id', idAttr);
                return;
            }

            // If cart already has item -> show small feedback, do not add second copy
            const exists = cartController.getItems().some(i => i.worksheetId === id);
            if (exists) {
                // feedback (flash)
                btn.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.04)' }, { transform: 'scale(1)' }], { duration: 220 });
                return;
            }

            // fetch worksheet info from catalogService (cached)
            try {
                const ws = await catalogService.getById(id);
                if (!ws) {
                    alert('Товар не найден.');
                    return;
                }
                cartController.addFromWorksheet(ws);
                // open centralized cart modal
                // todo нафига
                openCartModal();
            } catch (err) {
                console.error('add-to-cart error', err);
                alert('Не удалось добавить в корзину');
            }
        });
        (btn as any).__add_to_cart_bound = true;
    });
}
