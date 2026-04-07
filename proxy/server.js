import express from 'express';
import cors from 'cors';

const app = express();
// CORS: разрешаем запросы ТОЛЬКО с вашего GitHub Pages
const ALLOWED_ORIGINS = [
    'https://petrenko-vel.github.io',
    'http://localhost:5173',       // Vite dev-сервер
    'http://localhost:4173',       // Vite preview
];

app.use(cors({
    origin(origin, callback) {
        // Разрешаем запросы без origin (curl, Postman) и из белого списка
        if (!origin || ALLOWED_ORIGINS.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`Origin ${origin} not allowed by CORS`));
        }
    },
}));

const API_KEY = process.env.FOOTBALL_API_KEY;

if (!API_KEY) {
    console.error('⚠️  FOOTBALL_API_KEY is not set! Add it as an environment variable.');
}


app.get('/api/*', async (req, res) => {
    const apiPath = req.params[0];
    const queryString = new URLSearchParams(req.query).toString();
    const separator = queryString ? '?' : '';
    const targetUrl = `https://api.football-data.org/v4/${apiPath}${separator}${queryString}`;

    try {
        const response = await fetch(targetUrl, {
            headers: { 'X-Auth-Token': API_KEY },
        });

        const rateLimitHeaders = [
            'x-requests-available-minute',
            'x-requestcounter-reset',
        ];
        rateLimitHeaders.forEach((h) => {
            const value = response.headers.get(h);
            if (value) res.set(h, value);
        });

        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        console.error('Proxy error:', error);
        res.status(502).json({
            error: 'Proxy error',
            message: error.message,
        });
    }
});

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`✅ Football API proxy running on port ${PORT}`);
});
