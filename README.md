# skybonds — Bond Market Viewer

React-приложение для мониторинга котировок облигаций. Позволяет просматривать список доступных ISIN, выбирать инструмент и анализировать исторические данные по цене, доходности и спреду на интерактивном графике Highstock.

## Возможности

- **Список облигаций** — загрузка и отображение доступных ISIN из PHP-бэкенда
- **Исторические данные** — при выборе ISIN загружаются price/yield/spread по инструменту
- **Интерактивный график** — React Highstock с range selector (3m, 6m, 1y, 3y, 6y, All)
- **Переключение параметров** — выбор отображаемого показателя: Price / Yield / Spread
- **PHP бэкенд** — `getisinlist.php` (список), `getisindata.php?isin=ID` (данные), SQL-схема

## Стек технологий

| Технология | Назначение |
|-----------|-----------|
| React | Frontend SPA |
| React Highstock (Highcharts) | Финансовые графики |
| PHP | REST API бэкенд |
| MySQL | База данных (SQL-дамп включён) |

## Структура

```
skybonds/
├── src/
│   ├── App.js           # Корневой компонент: state, fetch, graph config
│   └── IsinList.js      # Список облигаций с кнопками выбора
├── backend/
│   ├── getisinlist.php  # GET /getisinlist.php → JSON список ISIN
│   ├── getisindata.php  # GET /getisindata.php?isin=X → price/yield/spread history
│   └── skybond.sql      # SQL схема и данные
└── public/index.html
```

## Запуск

```bash
npm install
npm start               # React dev server → localhost:3000

# Бэкенд: PHP + MySQL
# Настроить подключение в backend/dbsetting_n_connect.php
# Импортировать backend/skybond.sql
```

## API

| Endpoint | Описание |
|---------|---------|
| `GET getisinlist.php` | Список доступных облигаций `[{id, ...}]` |
| `GET getisindata.php?isin=ID` | История: `[{price, yield, spread}]` |
