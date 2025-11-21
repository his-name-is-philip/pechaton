import { HEADER_HIDE_DELAY_MS } from './cartEvents';

export function dropHeaderForAMoment(): { cancel: () => void } | void {
    const headerElement = document.querySelector('[data-module-header="header"]') || document.querySelector('header');
    if (!headerElement) {
        // eslint-disable-next-line no-console
        console.warn('Header element not found');
        return;
    }

    const wasAlreadyVisible = !headerElement.classList.contains('-isHidden');

    //показываем тут
    headerElement.classList.remove('-isHidden');

    const initialScrollY = window.scrollY;
    const initialUrl = window.location.href;
    let wasHiddenManually = false;

    //todo2 чекни че по производительности. мб можно сделать через scroll event
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (headerElement.classList.contains('-isHidden')) {
                    wasHiddenManually = true;
                }
            }
        });
    });

    observer.observe(headerElement, {
        attributes: true,
        attributeFilter: ['class']
    });

    const timeoutId = window.setTimeout(() => {
        observer.disconnect();

        const currentUrl = window.location.href;
        const urlChanged = currentUrl !== initialUrl;

        const currentScrollY = window.scrollY;
        const scrollDidNotGoUp = currentScrollY >= initialScrollY;

        if (scrollDidNotGoUp && !wasHiddenManually && !wasAlreadyVisible && !urlChanged) {
            headerElement.classList.add('-isHidden');
        }
    }, HEADER_HIDE_DELAY_MS);

    return {
        cancel: () => {
            clearTimeout(timeoutId);
            observer.disconnect();
        }
    };
}


