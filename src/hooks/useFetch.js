import { useState, useEffect } from 'react';

const API_KEY = import.meta.env.VITE_FOOTBALL_API_KEY;

const cache = new Map();

const useFetch = (url) => {
    const [data, setData] = useState(() => cache.get(url) ?? []);
    const [loading, setLoading] = useState(!cache.has(url));
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) return;

        if (cache.has(url)) {
            setData(cache.get(url));
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                setLoading(true);

                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'X-Auth-Token': API_KEY,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`Ошибка сервера: ${response.status}`);
                }

                const result = await response.json();
                cache.set(url, result);
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
};

export default useFetch;