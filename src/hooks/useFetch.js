import { useState, useEffect, useMemo } from 'react';

// ---------------------------------------------------------------------------
// Конфигурация URL
// ---------------------------------------------------------------------------
// DEV  → Vite proxy (/api → api.football-data.org, см. vite.config.js)
// PROD → внешний прокси-сервер (Render / Railway / Cloudflare Worker)
//        URL задаётся через VITE_PROXY_URL в .env.local
// ---------------------------------------------------------------------------
const IS_DEV = import.meta.env.DEV;
const API_KEY = import.meta.env.VITE_FOOTBALL_API_KEY;
const PROXY_URL = import.meta.env.VITE_PROXY_URL; // напр. https://my-proxy.onrender.com

const BASE_URL = IS_DEV ? '/api' : `${PROXY_URL}/api`;

const cache = new Map();
const MAX_CACHE_SIZE = 50;

const useFetch = (path) => {
    const url = useMemo(() => {
        // Убираем возможный префикс /api из path, чтобы не дублировать
        const cleanPath = path.replace(/^\/?api\/?/, '/');
        const safePath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;

        return `${BASE_URL}${safePath}`;
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

        const controller = new AbortController();

        const fetchData = async () => {
            try {
                setLoading(true);

                // В DEV — шлём ключ напрямую через Vite proxy
                // В PROD — ключ хранится на прокси-сервере, НЕ отправляем его из браузера
                const headers = IS_DEV
                    ? { 'X-Auth-Token': API_KEY }
                    : {};

                const response = await fetch(url, {
                    method: 'GET',
                    headers,
                    signal: controller.signal,
                });

                if (!response.ok) {
                    throw new Error(`Ошибка сервера: ${response.status}`);
                }

                const result = await response.json();

                if (cache.size >= MAX_CACHE_SIZE) {
                    const firstKey = cache.keys().next().value;
                    cache.delete(firstKey);
                }

                cache.set(url, result);
                setData(result);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => controller.abort();
    }, [url]);

    return { data, loading, error };
};

export default useFetch;
