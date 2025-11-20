import { EventBus } from '../services/events';
import { EventNames } from '../entities/base';
import { CartUpdatedDetail } from '../entities/eventDetails';
import cartController from '../services/cartController';
import { renderCartIfModalOpen } from './cartView';
import { dropHeaderForAMoment } from './headerEffects';

type CartButton = HTMLElement;

const HEADER_SELECTOR = '[data-module-header="header"]'; // to observe "-isHidden" class
export const HEADER_HIDE_DELAY_MS = 1500;
const HEADER_DROP_DURATION_MS = 400;
const CART_COUNTER_ID = 'cart-counter';
const CART_BUBBLE_SVG_ID = 'cart-bubble-svg';

let unsubscribeCartUpdated: (() => void) | null = null;
let lastCartCount = 0;
let hasSyncedCartBadge = false;
let bubbleAnimation: Animation | null = null;

export function registerCartEvents(): void {
    if (unsubscribeCartUpdated) {
        return;
    }
    unsubscribeCartUpdated = EventBus.on(EventNames.CART_UPDATED, (detail) => {
        if (!(detail instanceof CartUpdatedDetail)) {
            return;
        }
        updateAllProductButtons(detail);
        renderCartIfModalOpen();
        if (detail.justAdded) {
            const headerElement = document.querySelector<HTMLElement>(HEADER_SELECTOR);
            const headerWasHidden = headerElement?.classList.contains('-isHidden') ?? false;
            console.log(`cartEvents.ts: headerWasHidden = ${headerWasHidden}, headerElement =`, headerElement as HTMLElement);
            console.log(`cartEvents.ts: headerElement.classList = ${Array.from(headerElement?.classList ?? []).join(', ')}`);
            dropHeaderForAMoment();

            if (headerWasHidden) {
                window.setTimeout(refreshCartBadge, HEADER_DROP_DURATION_MS);
            } else {
                refreshCartBadge();
            }
        } else {
            refreshCartBadge();
        }
    });
}

export function handleAlreadyAddedClick(button: CartButton): void {
    flashElement(button);
}

export function drawUiAddedToCart(button: CartButton, added: boolean): void {
    setAddedState(button);
    if (!added) {
        flashElement(button);
        return;
    }
}

export function handleAddToCartError(button: CartButton, err: unknown): void {
    console.error('add to cart failed', err);
    setDefaultState(button);
    alert('Не удалось добавить товар в корзину. Повторите попытку.');
}

export function setAddedState(button: CartButton): void {
    const svg = button.querySelector('svg');
    const svgHtml = svg ? svg.outerHTML : '';
    button.classList.remove('-secondary');
    if (!button.classList.contains('-tertiary')) button.classList.add('-tertiary');
    button.setAttribute('aria-pressed', 'true');
    button.setAttribute('aria-disabled', 'true');
    button.style.pointerEvents = 'none';
    if (svgHtml) {
        button.innerHTML = `${svgHtml}&nbsp;Добавлено`;
    } else {
        button.textContent = 'Добавлено';
    }
}

export function setDefaultState(button: CartButton): void {
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

export function btnHasAddedState(button: CartButton): boolean {
    return button.classList.contains('-tertiary') || button.getAttribute('aria-disabled') === 'true';
}

export function flashElement(el: CartButton): void {
    try {
        el.animate(
            [{ transform: 'scale(1)' }, { transform: 'scale(1.04)' }, { transform: 'scale(1)' }],
            { duration: 220 }
        );
    } catch {
        // no animation support
    }
}

export function refreshCartBadge(): void {
    console.log('cartEvents.ts: refreshCartBadge');
    const count = cartController.getItems().length;
    const counter = document.getElementById(CART_COUNTER_ID);
    if (counter) {
        counter.textContent = String(count);
    }

    updateBubbleVisibility(count);


    lastCartCount = count;
    hasSyncedCartBadge = true; // the only time for
}

function animateCartBubble(): void {
    const bubbleSvg = getBubbleElement();
    if (!bubbleSvg || typeof bubbleSvg.animate !== 'function') {
        return;
    }

    bubbleSvg.style.transformOrigin = 'left center';
    bubbleSvg.style.willChange = 'transform, visibility';

    if (bubbleAnimation) {
        bubbleAnimation.cancel();
    }

    bubbleSvg.style.visibility = 'visible';
    bubbleAnimation = bubbleSvg.animate(
        [
            { transform: 'scale(0)' },
            { transform: 'scale(1.3)', offset: 0.75 },
            { transform: 'scale(1)' }
        ],
        {
            duration: 1000,
            easing: 'cubic-bezier(0.35, 1.1, 0.36, 1)',
            fill: 'forwards'
        }
    );

    const finishPromise = bubbleAnimation.finished;
    if (finishPromise) {
        finishPromise
            .then(() => {
                bubbleAnimation = null;
            });
    } else {
        bubbleAnimation = null;
    }
}

function updateBubbleVisibility(count: number): void {

    const shouldAnimate = hasSyncedCartBadge && lastCartCount === 0 && count > 0;
    if (shouldAnimate) {
        animateCartBubble();
        return;
    }
    const bubbleSvg = getBubbleElement();
    if (!bubbleSvg) {
        console.warn('cartEvents.ts: bubbleSvg not found');
    } else if (count === 0) {
        cancelBubbleAnimation();
        bubbleSvg.style.visibility = 'hidden';
    } else {
        cancelBubbleAnimation();
        bubbleSvg.style.visibility = 'visible';
    }
}

function getBubbleElement(): SVGSVGElement | null {
    return document.getElementById(CART_BUBBLE_SVG_ID) as SVGSVGElement | null;
}

function cancelBubbleAnimation(): void {
    if (bubbleAnimation) {
        bubbleAnimation.cancel();
        bubbleAnimation = null;
    }
}

function updateAllProductButtons(detail: CartUpdatedDetail): void {
    const cartItemIds = new Set(detail.items.map(item => item.worksheetId));
    const buttons = Array.from(document.querySelectorAll<CartButton>('.js-add-to-cart[data-id]'));

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


