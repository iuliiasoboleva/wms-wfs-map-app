# 🗺️ React + OpenLayers — Тестовое задание (WMS / WFS)

### **Задача**
Разработать небольшое приложение на **React**, которое отображает карту с подключением геосервисов **WMS / WFS**.

---

## 🚀 Технологии
- **React 18**
- **OpenLayers 8**
- **ol-layerswitcher**
- **Vite / Create React App** (в зависимости от окружения)
- **CSS Modules**

---

## ⚙️ Функционал
- Отображение карты (OSM + WMS слой)
- Получение данных из **WFS**
- Обработка клика по объекту
- Выделение объекта и показ его атрибутов во всплывающем окне (popup)
- Минимальная обработка ошибок

---

## 🌍 Источники данных
**ZuluGIS**  
URL: [http://zs.zulugis.ru:6473/ZuluWeb/#!/maps](http://zs.zulugis.ru:6473/ZuluWeb/#!/maps)  
**Логин:** `mo`  
**Пароль:** `mo`

**Документация:**  
[Politerm OGC](https://www.politerm.com/ogc/index.php)

---

## 🧩 Настройка переменных окружения

Создайте в корне проекта файл `.env` со следующим содержимым:

```bash
REACT_APP_WMS_URL=http://zs.zulugis.ru:6473/ws?
REACT_APP_WFS_URL=http://zs.zulugis.ru:6473/ws?
REACT_APP_WMS_LAYER=world:world
REACT_APP_WFS_LAYER=world:world
REACT_APP_WMS_VERSION=1.3.0
REACT_APP_WFS_VERSION=1.0.0
REACT_APP_USERNAME=mo
REACT_APP_PASSWORD=mo
```

*(При необходимости `world:world` можно заменить на доступный слой из GetCapabilities.)*

---

## 🧭 Запуск проекта

Установка зависимостей:
```bash
npm install
```

Запуск в dev-режиме:
```bash
npm start
```

Сборка production-версии:
```bash
npm run build
```
