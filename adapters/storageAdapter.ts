// src/adapters/storageAdapter.ts
export type StorageOptions = {
    days?: number;
};

const NAMESPACE = 'pechaton';

function cookieKey(key: string): string {
    return `${NAMESPACE}:${key}`;
}

/**
 * Encode a payload into an URI-safe string for cookie storage.
 *
 * @param payload - any JSON-serializable payload
 * @returns encoded string
 */
function encodePayload<T>(payload: T): string {
    return encodeURIComponent(JSON.stringify(payload));
}

/**
 * Decode and parse an encoded cookie payload.
 *
 * @param raw - encoded cookie value
 * @returns parsed payload or null on failure
 */
function decodePayload<T>(raw: string): T | null {
    try {
        return JSON.parse(decodeURIComponent(raw)) as T;
    } catch {
        return null;
    }
}

/**
 * Set a cookie raw value with optional expiration days.
 *
 * @param name - cookie name
 * @param value - raw (already encoded) value
 * @param days - optional TTL in days
 */
function setCookieRaw(name: string, value: string, days?: number): void {
    let expires = '';
    if (typeof days === 'number') {
        const d = new Date();
        d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
        expires = `; Expires=${d.toUTCString()}`;
    }
    document.cookie = `${name}=${value || ''}${expires}; Path=/; SameSite=Lax`;
}

/**
 * Read raw cookie value by name.
 *
 * @param name - cookie name
 * @returns raw value or null if not found
 */
function getCookieRaw(name: string): string | null {
    const raw = document.cookie;
    if (!raw) return null;
    const parts = raw.split('; ').map((p) => p.trim());
    for (const p of parts) {
        if (p.startsWith(`${name}=`)) {
            return p.substring(name.length + 1);
        }
    }
    return null;
}

const storageAdapter = {
    /**
     * Set a namespaced value in cookies.
     *
     * @param key - logical key
     * @param value - serializable value
     * @param options - optional storage options (days)
     */
    set<T>(key: string, value: T, options?: StorageOptions): void {
        const days = options?.days ?? 180;
        const payload = { v: 1, ts: new Date().toISOString(), data: value };
        const encoded = encodePayload(payload);
        setCookieRaw(cookieKey(key), encoded, days);
    },

    /**
     * Get a namespaced value from cookies.
     *
     * @param key - logical key
     * @returns parsed value or null
     */
    get<T>(key: string): T | null {
        const raw = getCookieRaw(cookieKey(key));
        if (!raw) return null;
        const parsed = decodePayload<{ v: number; ts: string; data: T }>(raw);
        if (!parsed || parsed.data === undefined) return null;
        return parsed.data;
    },

    /**
     * Remove a namespaced cookie by expiring it.
     *
     * @param key - logical key to remove
     */
    remove(key: string): void {
        // expire cookie
        setCookieRaw(cookieKey(key), '', -1);
    }
};

export default storageAdapter;
