// src/entities/worksheet.ts
export interface WorksheetRaw {
    id: string | number;
    name: string;
    price: string | number;
    unit: string;
    preview: string;
    illustration: string;
    description: string;
}

export interface Worksheet {
    id: number; // positive integer
    name: string;
    priceKopecks: number; // integer >= 0
    unitUrl: string;
    previewUrl: string;
    illustrationUrl: string;
    description: string;
}

/**
 * Validates string value and returns trimmed version.
 * @throws TypeError when value is not a non-empty string.
 */
function validateString(value: unknown, fieldName: string, id: number): string {
    if (typeof value !== 'string' || value.trim() === '') {
        throw new TypeError(`Worksheet ${id}: missing or invalid ${fieldName}`);
    }
    return value.trim();
}

/**
 * Parse and validate a raw entry from goods.json -> Worksheet.
 * Throws on invalid data.
 *
 * @param raw — объект, полученный из goods.json (id может быть строкой или числом)
 * @returns Worksheet — валидированная структура, готовая к использованию в UI/логике.
 */
export function parseRawWorksheet(raw: WorksheetRaw): Worksheet {
    if (raw === null || typeof raw !== 'object') {
        throw new TypeError('Invalid worksheet entry (not an object)');
    }

    const idNum = Number(raw.id); // allow string or number in source, convert to integer
    if (!Number.isFinite(idNum) || !Number.isInteger(Math.round(idNum)) || idNum <= 0) {
        throw new TypeError(`Invalid worksheet id: ${raw.id}`);
    }
    const id = Math.round(idNum);

    const name = validateString(raw.name, 'name', id);

    const priceStr = validateString(raw.price, 'price', id);
    const priceKopecks = Math.round(Number(priceStr) * 100);
    const unitUrl = validateString(raw.unit, 'unit URL', id);
    const previewUrl = validateString(raw.preview, 'preview URL', id);
    const illustrationUrl = validateString(raw.illustration, 'illustration URL', id);
    const description = validateString(raw.description, 'description', id);

    return {
        id,
        name,
        priceKopecks,
        unitUrl,
        previewUrl,
        illustrationUrl,
        description
    };
}

/**
 * Utility to format kopecks to human-readable RU price string.
 *
 * @example formatPrice(123456) -> "1 234,56 ₽"
 */
export function formatPrice(kopecks: number): string {
    const rub = Math.floor(kopecks / 100);
    const kope = Math.abs(kopecks % 100);
    return `${new Intl.NumberFormat('ru-RU').format(rub)},${kope.toString().padStart(2, '0')} ₽`;
}
