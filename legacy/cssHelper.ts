/**
 * assets/cssHelper.ts
 * Утилиты для динамической подгрузки и выгрузки CSS-файлов.
 */

export function loadCSS(href: string, id?: string): void {
    console.log('loadCSS', href, id);
    // Проверяем, нет ли уже такого CSS
    if (document.querySelector(`link[data-barba-css="${href}"]`)) return;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    if (id) link.id = id;
    link.dataset.barbaCss = href;

    document.head.appendChild(link);
}

export function unloadCSSByNamespace(namespace: string): void {
    const links = Array.from(
        document.querySelectorAll<HTMLLinkElement>('link[data-barba-css]')
    );
    for (const link of links) {
        const href = link.dataset.barbaCss;
        if (href && href.includes(namespace)) {
            link.remove();
        }
    }
}
