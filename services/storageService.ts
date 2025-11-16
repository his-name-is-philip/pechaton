// src/services/storageService.ts
// Universal wrapper for storing JSON in cookies.
// The API is setItem/getItem/removeItem to allow future extensions (localStorage/sessionStorage/etc).

type CookieOptions = {
    days?: number;        // number of days to keep the cookie
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: 'Lax' | 'Strict' | 'None';
};

class StorageService {
    private namespace: string;

    /**
     * Construct a StorageService using a namespace prefix for stored keys.
     *
     * @param namespace - prefix added to cookie keys, defaults to 'app'
     */
    constructor(namespace = 'app') {
        this.namespace = namespace;
    }

    /**
     * Build the namespaced key used in cookies.
     *
     * @param k - key name
     * @returns namespaced key string
     */
    private key(k: string) {
        return `${this.namespace}:${k}`;
    }

    /**
     * Set a JSON-serializable value into a cookie.
     *
     * - The value is wrapped with metadata { v, ts, data } before storing.
     * - Uses encodeURIComponent to make the payload cookie-safe.
     * - If options.days is omitted the cookie is a session cookie.
     *
     * @param key - logical key name
     * @param value - serializable value
     * @param options - cookie options (days, path, domain, secure, sameSite)
     */
    setItem<T>(key: string, value: T, options?: CookieOptions): void {
        const k = this.key(key);
        const payload = {
            v: 1, // version of serialization format (for migrations)
            ts: new Date().toISOString(),
            data: value,
        };
        const str = encodeURIComponent(JSON.stringify(payload));
        // cookie attributes
        const path = options?.path ?? '/';
        const secure = options?.secure ? '; Secure' : '';
        const domain = options?.domain ? `; Domain=${options.domain}` : '';
        const sameSite = options?.sameSite ? `; SameSite=${options.sameSite}` : '; SameSite=Lax';
        let expires = '';
        if (typeof options?.days === 'number') {
            const d = new Date();
            d.setTime(d.getTime() + options!.days! * 24 * 60 * 60 * 1000);
            expires = `; Expires=${d.toUTCString()}`;
        }
        // Set the cookie
        document.cookie = `${k}=${str}${expires}; Path=${path}${domain}${secure}${sameSite}`;
    }

    /**
     * Retrieve a deserialized value from cookie.
     *
     * - Returns the stored `.data` or null if not present or parse fails.
     *
     * @param key - logical key name
     * @returns deserialized value or null
     */
    getItem<T>(key: string): T | null {
        const k = this.key(key) + '=';
        const decoded = decodeURIComponent(document.cookie || '');
        // Simple cookie parsing
        const parts = decoded.split('; ').map(p => p.trim());
        for (const p of parts) {
            if (p.startsWith(k)) {
                const val = p.substring(k.length);
                try {
                    const parsed = JSON.parse(val);
                    // expect { v, ts, data }
                    if (parsed && parsed.data !== undefined) {
                        return parsed.data as T;
                    }
                } catch (e) {
                    console.warn('storageService: failed parse cookie', e);
                    return null;
                }
            }
        }
        return null;
    }

    /**
     * Remove a namespaced cookie by setting an expired date.
     *
     * @param key - logical key name to remove
     */
    removeItem(key: string): void {
        const k = this.key(key);
        // Expire the cookie
        document.cookie = `${k}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/`;
    }

    /**
     * Future extension point:
     * - Implement adapters for localStorage/sessionStorage and switch storage backends.
     */
}

const storageService = new StorageService('myapp'); // namespace can be changed
export default storageService;
