// Cart Modal API (used by ui/cartOverlay)
import cartController from '../services/cartController';

let cartModal: HTMLElement | null = null;
let savedScrollPosition = 0;

export function openCartModal(): void {
    console.log('openCartModal');

    // Save scroll position
    savedScrollPosition = window.scrollY || document.documentElement.scrollTop;

    // Fetch modal HTML from order.html
    fetch('order.html')
        .then((response: Response) => response.text())
        .then((html: string): void => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const modal = doc.querySelector('.m-popin[data-module-popin="contact"]') as HTMLElement | null;

            if (!modal) return;

            // Insert modal into page
            document.body.appendChild(modal);
            cartModal = modal;

            // Ensure modal is visible
            modal.classList.add('-isOpen');
            modal.setAttribute('aria-hidden', 'false');

            // Prevent body scroll
            document.body.style.overflow = 'hidden';

            // Hook close button to close the modal
            modal.addEventListener('click', onModalClick, { capture: true });

            // Delegate list actions
            const listEl = modal.querySelector('#cart-list');
            if (listEl) listEl.addEventListener('click', onListClick);

            // Initial render
            renderCart();
        })
        .catch((err: unknown): void => {
            // eslint-disable-next-line no-console
            console.error('Failed to load cart:', err);
        });
}

export function closeCartModal(): void {
    if (!cartModal) {
        // Update URL
        if (window.location.hash === '#cart') {
            if (history.pushState) {
                history.pushState(null, '', window.location.pathname);
            }
        }
        // Restore body scroll
        document.body.style.overflow = '';
        return;
    }

    // Detach listeners
    try {
        cartModal.removeEventListener('click', onModalClick, { capture: true } as any);
        const listEl = cartModal.querySelector('#cart-list');
        if (listEl) listEl.removeEventListener('click', onListClick as EventListener);
    } catch {
        // ignore
    }

    // Remove modal
    cartModal.remove();
    cartModal = null;

    // Restore body scroll
    document.body.style.overflow = '';

    // Restore scroll position
    window.scrollTo(0, savedScrollPosition);

    // Update URL
    if (window.location.hash === '#cart') {
        if (history.pushState) {
            history.pushState(null, '', window.location.pathname);
        }
    }
}

// Handle close and other modal-level clicks
function onModalClick(e: Event): void {
    const target = e.target as HTMLElement;
    const closeBtn = target.closest('[data-action="close"]');
    if (closeBtn) {
        e.preventDefault();
        // Close modal directly
        closeCartModal();
    }
}

// Handle item actions in the list
function onListClick(e: Event): void {
    const target = e.target as HTMLElement;
    const itemEl = target.closest('[data-cart-item]') as HTMLElement | null;
    if (!itemEl) return;

    //  TODO:
    //  этот код нужен для удаления товара из корзины, пока не реализовано.
    if (target.matches('[data-item-menu="open"]')) {
        const openBtn = itemEl.querySelector('[data-item-menu="open"]') as HTMLElement | null;
        const actions = itemEl.querySelector('[data-item-menu="actions"]') as HTMLElement | null;
        if (openBtn && actions) {
            openBtn.style.display = 'none';
            actions.style.display = '';
        }
        return;
    }
    if (target.matches('[data-item-action="back"]')) {
        const openBtn2 = itemEl.querySelector('[data-item-menu="open"]') as HTMLElement | null;
        const actions2 = itemEl.querySelector('[data-item-menu="actions"]') as HTMLElement | null;
        if (openBtn2 && actions2) {
            actions2.style.display = 'none';
            openBtn2.style.display = '';
        }
        return;
    }
    if (target.matches('[data-item-action="remove"]')) {
        const wsidStr = itemEl.getAttribute('data-wsid');
        const wsid = wsidStr ? parseInt(wsidStr, 10) : NaN;
        if (!Number.isNaN(wsid)) {
            cartController.removeFromWorksheet(wsid);
        }
        return;
    }
}

export function renderCart(): void {
    if (!cartModal) return;
    const list = cartModal.querySelector('#cart-list') as HTMLElement | null;
    const empty = cartModal.querySelector('#empty-cart-state') as HTMLElement | null;
    const emailField = cartModal.querySelector('[data-name="buyer-email"]') as HTMLElement | null;
    const submitField = cartModal.querySelector('.a-inputField__submit') as HTMLElement | null;
    if (!list || !empty) return;

    // Clear list
    list.innerHTML = '';

    const items = cartController.getItems();

    if (items.length === 0) {
        empty.style.display = '';
        list.style.display = 'none';
        if (emailField) emailField.style.display = 'none';
        if (submitField) submitField.style.display = 'none';
        return;
    }

    empty.style.display = 'none';
    list.style.display = '';
    if (emailField) emailField.style.display = '';
    if (submitField) submitField.style.display = '';

    items.forEach((it, idx) => {
        const num = String(idx + 1).padStart(2, '0');
        const li = document.createElement('li');
        li.className = 'm-stepItem m-accordeon__content';
        li.setAttribute('data-cart-item', '');
        li.setAttribute('data-wsid', String(it.worksheetId));
        li.innerHTML = `
<div class="m-stepItem__header">
  <div class="m-stepItem__lead">
    <span class="a-tag -round m-stepItem__num" aria-hidden="true">${num}</span>
    <div class="m-stepItem__titleWrap">
      <p class="m-stepItem__title">${escapeHtml(it.name)}</p>
      <div class="m-stepItem__tags" aria-label="Метки товара">
        <span class="m-tag -purple">Категория</span>
        <span class="m-tag -outline">Арт. ${it.worksheetId}</span>
      </div>
    </div>
  </div>
  <div class="m-cartItem__actions">
    <button class="a-button -tertiary -flat" data-item-menu="open" title="Действия">…</button>
    <span class="m-cartItem__actionsInline" data-item-menu="actions" style="display: none;">
      <button class="a-button -tertiary -small" data-item-action="remove">удалить</button>
      <button class="a-button -tertiary -small -outlineBack" data-item-action="back">обратно</button>
    </span>
  </div>
</div>`;
        list.appendChild(li);
    });
}


function escapeHtml(s: string): string {
    return s.replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]!));
}

// Handle browser back button to close modal if hash changes
window.addEventListener('popstate', function(_e: PopStateEvent): void {
    if (cartModal && window.location.hash !== '#cart') {
        closeCartModal();
    }
});

export default {} as Record<string, never>;
