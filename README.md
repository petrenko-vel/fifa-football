# ⚽ FIFA Football

Приложение для просмотра футбольных лиг, команд и матчей на основе [football-data.org API](https://www.football-data.org/).
---

## Технологии

| Категория | Стек |
|---|---|
| UI-фреймворк | React 19 |
| Роутинг | React Router DOM 7 |
| Сборщик | Vite 8 |
| Стили | SCSS (sass-embedded) |
| Деплой | GitHub Pages (`gh-pages`) |
| Линтинг | ESLint + Stylelint |
| API | football-data.org v4 |

---

## Функциональность

- 📋 **Лиги** — список футбольных лиг с логотипами и странами
- 🏟️ **Команды** — список команд с эмблемами
- 📅 **Матчи** — таблица матчей для выбранной лиги или команды
- 🔍 **Текстовый поиск** — фильтрация по названию на всех страницах
- 📆 **Фильтр по дате** — фильтрация матчей в выбранном диапазоне дат
- 📄 **Пагинация** — постраничная навигация
- ⏳ **Анимация загрузки** — спиннер с точками при ожидании данных
- 📱 **Адаптивность** — плавное масштабирование от 390px до 1920px через `clamp()`

---

## Запуск локально

### 1. Клонировать репозиторий

```bash
git clone https://github.com/petrenko-vel/fifa-football.git
cd fifa-football
```

### 2. Установить зависимости

```bash
npm install
```

### 3. Получить API-ключ

Зарегистрироваться на [football-data.org](https://www.football-data.org/) и получить бесплатный токен.

### 4. Создать файл `.env.local`

```env
VITE_API_TOKEN=your_api_token_here
```

> ⚠️ Файл `.env.local` добавлен в `.gitignore` и не попадает в репозиторий.

### 5. Запустить дев-сервер

```bash
npm run dev
```

Приложение откроется на [http://localhost:5173/fifa-football/](http://localhost:5173/fifa-football/)

---

## Скрипты

| Команда | Описание |
|---|---|
| `npm run dev` | Запуск dev-сервера с HMR |
| `npm run build` | Production-сборка в `/dist` |
| `npm run preview` | Предпросмотр production-сборки |
| `npm run lint` | Запуск JS + SCSS линтеров |
| `npm run lint:scss:fix` | Автофикс SCSS ошибок |
| `npm run deploy` | Деплой на GitHub Pages |

---

## Архитектура проекта

Проект построен по методологии **Feature-Sliced Design (FSD)**:

```
src/
├── pages/              # Страницы (композиция виджетов и сущностей)
│   ├── leagues/        # Страница лиг
│   ├── teams/          # Страница команд
│   └── matches/        # Страница матчей (лиги или команды)
│
├── widgets/            # Крупные самостоятельные блоки
│   ├── header/         # Шапка: логотип, навигация, адаптивность
│   └── match-table/    # Таблица матчей с пагинацией
│
├── features/           # Бизнес-взаимодействия пользователя
│   ├── search/         # Компонент поиска
│   ├── date-filter/    # Фильтр по датам
│   └── pagination/     # Пагинация
│
├── entities/           # Бизнес-сущности
│   ├── league/         # Сущность "Лига"
│   └── team/           # Сущность "Команда"
│
├── shared/             # Переиспользуемый код
│   ├── ui/             # UI-компоненты (EntityCard, EntityList, Loader, Pagination)
│   └── hooks/          # Хуки (useFetch с кешированием)
│
└── style/              # Глобальные стили
    ├── helpers/        # SCSS-утилиты: rem(), fluid(), миксины, брейкпоинты
    └── variables.scss  # CSS-переменные (цвета, шрифты, размеры)
```

---

## Адаптивность

Вместо брейкпоинтов используется функция `fluid(max, min)` из `src/style/helpers/functions.scss`, которая генерирует `clamp()` — значения плавно масштабируются от `390px` до `1920px` без скачков.

```scss
font-size: fluid(25, 12);   // 25px на > 1920px → плавно → 12px на < 390px
gap: fluid(40, 10);
```

---

## API и Proxy

В dev-режиме Vite проксирует запросы `/api/*` на `https://api.football-data.org/v4`, подставляя API-ключ из `.env.local`. Это позволяет избежать CORS-ошибок при локальной разработке.

```
/api/competitions             → GET /competitions
/api/teams                    → GET /teams
/api/competitions/:id/matches → GET /competitions/:id/matches
```
