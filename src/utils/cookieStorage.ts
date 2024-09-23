export class CookieStorage {
    public static getItem(key: string): string | null {
        return this.getCookie(key);
    }

    public static setItem(key: string, value: string, days: number = 365): void {
        this.setCookie(key, value, days);
    }

    public static removeItem(key: string): void {
        this.deleteCookie(key);
    }

    public static clear(): void {
        const cookies = document.cookie.split("; ");
        for (const cookie of cookies) {
            const [name] = cookie.split("=");
            this.deleteCookie(name);
        }
    }

    private static getCookie(name: string): string | null {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
        return null;
    }
    
    private static setCookie(name: string, value: string, days: number = 365): void {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        const expiresString = `expires=${expires.toUTCString()}`;
        document.cookie = `${name}=${value}; ${expiresString}; path=/`;
    }

    private static deleteCookie(name: string): void {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
}

// Expose CookieStorage to the global scope
(window as { cookieStorage?: CookieStorage }).cookieStorage = CookieStorage;