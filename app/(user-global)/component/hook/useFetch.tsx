import { useState, useEffect } from 'react';

export const useFetchData = (url: string, token: string) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) throw new Error('Failed to fetch data');
                const result = await response.json();
                setData(result);
            } catch (err: any) {
                setError(err.message);
            }
        };
        fetchData();
    }, [url, token]);

    return { data, error };
};
