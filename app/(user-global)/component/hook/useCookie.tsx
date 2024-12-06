'use client'

import { useState, useEffect } from 'react';

const useCookie = (name: string) => {
    const [cookieValue, setCookieValue] = useState<string | null>(null);

    useEffect(() => {
        const getCookie = (name: string) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop()?.split(';').shift();
            return null;
        };

        setCookieValue(getCookie(name) ?? null);
    }, [name]);

    return cookieValue;
};

export default useCookie;