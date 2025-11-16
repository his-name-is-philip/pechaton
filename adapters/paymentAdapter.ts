// src/adapters/paymentAdapter.ts
export type CleanupHandle = { cleanup: () => void };

/**
 * Insert widgetHtml into provided container (if any) or create modal.
 * Runs inline scripts by replacing script elements so they execute.
 *
 * Returns a handle with cleanup() to remove the widget/modal.
 */
const PAYMENT_MODAL_ID = 'pechaton-payment-modal';
const PAYMENT_MODAL_INNER = `${PAYMENT_MODAL_ID}-inner`;

function runInlineScripts(container: HTMLElement): void {
    const scripts = Array.from(container.querySelectorAll('script'));
    for (const oldScript of scripts) {
        const newScript = document.createElement('script');
        if (oldScript.src) {
            newScript.src = oldScript.src;
        } else {
            newScript.textContent = oldScript.textContent || '';
        }
        const parent = oldScript.parentNode;
        if (parent) parent.replaceChild(newScript, oldScript);
    }
}

const paymentAdapter = {
    /**
     * Render widgetHtml into the provided container or create a modal if no container provided.
     *
     * @param widgetHtml - raw HTML for payment widget (trusted HTML from your server).
     * @param container - optional element to render widget into; if omitted a modal is created.
     * @returns CleanupHandle which can be called to remove the widget/modal.
     *
     * Security note: widgetHtml is inserted as innerHTML. Only use trusted HTML (e.g. from your GAS).
     */
    renderWidgetHtml(widgetHtml: string, container?: HTMLElement | null): CleanupHandle {
        if (container) {
            container.innerHTML = widgetHtml;
            runInlineScripts(container);
            return { cleanup: () => { container.innerHTML = ''; } };
        } else {
            let modal = document.getElementById(PAYMENT_MODAL_ID) as HTMLElement | null;
            if (!modal) {
                modal = document.createElement('div');
                modal.id = PAYMENT_MODAL_ID;
                Object.assign(modal.style, {
                    position: 'fixed',
                    left: '0px',
                    top: '0px',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(0,0,0,0.4)',
                    zIndex: '10000'
                } as Partial<CSSStyleDeclaration>);
                const inner = document.createElement('div');
                inner.id = PAYMENT_MODAL_INNER;
                Object.assign(inner.style, {
                    width: 'min(900px, 95%)',
                    maxHeight: '90%',
                    overflow: 'auto',
                    background: '#fff',
                    padding: '12px',
                    borderRadius: '8px'
                } as Partial<CSSStyleDeclaration>);
                modal.appendChild(inner);
                document.body.appendChild(modal);
                modal.addEventListener('click', (ev) => {
                    if (ev.target === modal) paymentAdapter.cleanup();
                });
            }
            const innerEl = document.getElementById(PAYMENT_MODAL_INNER);
            if (innerEl) {
                innerEl.innerHTML = widgetHtml;
                runInlineScripts(innerEl);
            }
            return { cleanup: paymentAdapter.cleanup };
        }
    },

    /**
     * Cleanup helper that removes modal from DOM if present.
     */
    cleanup(): void {
        const modal = document.getElementById(PAYMENT_MODAL_ID);
        if (modal && modal.parentNode) modal.parentNode.removeChild(modal);
    }

};

export default paymentAdapter;
