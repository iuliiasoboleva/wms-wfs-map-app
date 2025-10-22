# WMS/WFS Map Application

Интерактивное React-приложение для работы с картами WMS/WFS-сервисов (GeoServer).  
Пользователь может просматривать карту, кликать по объектам и получать атрибуты выбранного участка.

---

## Стек технологий

- **React + TypeScript**
- **OpenLayers** — визуализация карт и работа с WMS/WFS слоями  
- **Vite / Create React App** — сборка и запуск проекта  
- **CSS Modules** — стилизация компонентов  
- **gh-pages** — деплой на GitHub Pages

---

## Запуск проекта локально

1. Установите зависимости:
   ```bash
   npm install
   ```

2. Запустите локальный сервер разработки:
   ```bash
   npm start
   ```

3. Откройте [http://localhost:3000](http://localhost:3000)  
   чтобы увидеть карту.

---

## Работа через HTTPS (GitHub Pages)

Поскольку сервер `zs.zulugis.ru:6473` использует **HTTP**, а GitHub Pages — **HTTPS**,  
браузер блокирует прямые запросы из-за политики безопасности (Mixed Content + CORS).  

Для обхода используется HTTPS-прокси **cors-anywhere**.

### 🔧 Перед запуском (один раз в день):

1. Откройте в браузере:  
   👉 [https://cors-anywhere.herokuapp.com/corsdemo](https://cors-anywhere.herokuapp.com/corsdemo)

2. Нажмите кнопку  
   **“Request temporary access to the demo server”**

После этого ваш сайт сможет выполнять запросы к WMS/WFS-серверу даже при работе с GitHub Pages.

---

## Переменные окружения (.env)

```bash
REACT_APP_PROXY=https://cors-anywhere.herokuapp.com/
REACT_APP_WMS_URL=https://cors-anywhere.herokuapp.com/http://zs.zulugis.ru:6473/ws?
REACT_APP_WFS_URL=https://cors-anywhere.herokuapp.com/http://zs.zulugis.ru:6473/ws?
REACT_APP_WMS_LAYER=world:world
REACT_APP_WFS_LAYER=world:world
REACT_APP_WMS_VERSION=1.3.0
REACT_APP_WFS_VERSION=1.0.0
REACT_APP_USERNAME=mo
REACT_APP_PASSWORD=mo
```

---

## Сборка и деплой

1. Сборка проекта:
   ```bash
   npm run build
   ```

2. Деплой на GitHub Pages:
   ```bash
   npm run deploy
   ```
---

## 🗺️ Основные функции

- Отображение базового слоя OSM
- Добавление WMS-слоя с авторизацией
- Получение информации об объекте по клику (GetFeatureInfo)
- Попап с таблицей атрибутов выбранного объекта
- Адаптация для деплоя на GitHub Pages (HTTPS + CORS-proxy)

---
