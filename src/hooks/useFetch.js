import { useState, useEffect, useMemo } from 'react';

const API_KEY = import.meta.env.VITE_FOOTBALL_API_KEY;

// В режиме разработки (npm run dev) используем прокси '/api' из vite.config.js
// В режиме продакшена (GitHub Pages) используем прямой URL с CORS-прокси
const BASE_URL = 'https://api.football-data.org/v4';
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

const cache = new Map();

const useFetch = (path) => {
    // Формируем URL в зависимости от окружения
    const url = useMemo(() => {
        const safePath = path.startsWith('/') ? path : `/${path}`;
        const cleanPath = safePath.replace('/api/', '/').replace('/api', '');

        if (import.meta.env.DEV) {
            // Локально: используем прокси Vite
            return `/api${cleanPath}`;
        } else {
            // В продакшене (GitHub Pages): используем CORS-прокси + прямой URL
            const apiUrl = `${BASE_URL}${cleanPath}`;
            return `${CORS_PROXY}${encodeURIComponent(apiUrl)}`;
        }
    }, [path]);

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

