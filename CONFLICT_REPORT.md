# 🔴 Отчёт о конфликтах и проблемах в коде

**Дата проверки:** 25 января 2026  
**Критическая проблема:** ✅ Конфликты модулей ES vs CommonJS

---

## ⚠️ КРИТИЧЕСКИЕ КОНФЛИКТЫ

### 1. **Конфликт модульных систем в `backend/seed.js`** 🔴
**Серьезность:** КРИТИЧЕСКАЯ  
**Файл:** [backend/seed.js](backend/seed.js#L1-L7)

**Проблема:**
- `seed.js` использует **CommonJS** (`require()`)
- Все модели используют **ES Modules** (`import/export`)
- `package.json` имеет `"type": "module"`

**Конфликт:**
```javascript
// ❌ НЕПРАВИЛЬНО: seed.js (CommonJS)
const sequelize = require('./config/database');
const User = require('./models/User');

// ✅ Остальной код (ES Modules)
import sequelize from './config/database.js';
import User from './models/User.js';
```

**Результат:** `npm run seed` завершится с ошибкой `ReferenceError: require is not defined`

**Решение:** Переписать seed.js на ES modules

---

## ⚠️ СЕРЬЕЗНЫЕ ПРОБЛЕМЫ

### 2. **Missing Barber Model Route** 🔴
**Файл:** [backend/routes/](backend/routes/)  
**Проблема:** 
- Нет файла `barberRoutes.js`
- Frontend ожидает `GET /api/barbers` в [services/api.ts](services/api.ts#L14-L18)
- Fallback возвращает пустой массив `[]`

**Решение:** Создать `barberRoutes.js` с контроллером для получения барберов

---

### 3. **Vite Config Import проблема** 🟡
**Файл:** [vite.config.ts](vite.config.ts#L1)

**Проблемы:**
```typescript
import path from 'path';  // ❌ Должно быть: import path from 'node:path'
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const geminiApiKey = env.GEMINI_API_KEY || env.API_KEY;
    return {
      // ...
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),  // ❌ __dirname не определен в ES modules
        }
      }
    };
});
```

**Лinting ошибки:**
- Prefer `node:path` над `path`
- `__dirname` не доступен в ES modules контексте

---

## 📋 LINTING ОШИБКИ В КОМПОНЕНТАХ

### 4. **App.tsx - Accessibility & Unused Imports** 🟡
**Файл:** [App.tsx](App.tsx)

**Unused Imports:**
- Line 7: `BARBERS`, `TESTIMONIALS` не используются
- Line 9: `Send` не используется
- Line 10: `Sparkle`, `Tag` не используются
- Line 152: `pragueMapsUrl` не используется
- Line 154: `handleShareActiveGalleryImage` не используется

**Accessibility Issues (a11y):**
- [Line 317](App.tsx#L317): Gallery images - используют div с onClick вместо button
- [Line 369](App.tsx#L369): Modal background - div с onClick без keyboard listener
- [Line 381, 528, 529, 583, 591-593](App.tsx): Links с пустыми href="#" - требуют валидных URL или замены на button

---

### 5. **README.md - Markdown Linting** 🟡
**Файл:** [README.md](README.md)

**Проблемы:**
- Missing blank lines around headings (MD022)
- Lists not surrounded by blank lines (MD032)
- Table column style issues (MD060)
- Code fences missing blank lines (MD031)

---

## ✅ ЧИСТЫЕ ОБЛАСТИ (БЕЗ КОНФЛИКТОВ)

### Конфигурационные файлы
- ✅ [tsconfig.json](tsconfig.json) - OK
- ✅ [.env.production](.env.production) - OK
- ✅ [docker-compose.yml](docker-compose.yml) - OK (но проверить версии сервисов)
- ✅ [backend/config/database.js](backend/config/database.js) - OK (SSL настроена правильно)
- ✅ [backend/Dockerfile](backend/Dockerfile) - OK

### Backend Models
- ✅ [Service.js](backend/models/Service.js) - OK
- ✅ [Booking.js](backend/models/Booking.js) - OK
- ✅ [User.js](backend/models/User.js) - OK
- ✅ [Product.js](backend/models/Product.js) - OK
- ✅ **ОТСУТСТВУЕТ:** [Barber.js](backend/models/Barber.js) - нет файла!

### Backend Controllers & Routes
- ✅ [authController.js](backend/controllers/authController.js) - OK
- ✅ [bookingController.js](backend/controllers/bookingController.js) - OK
- ✅ [authRoutes.js](backend/routes/authRoutes.js) - OK
- ✅ [bookingRoutes.js](backend/routes/bookingRoutes.js) - OK
- ⚠️ **ОТСУТСТВУЕТ:** barberRoutes.js

### Frontend Services
- ✅ [types.ts](types.ts) - OK
- ✅ [services/api.ts](services/api.ts) - OK (fallback логика для пустых barbers)

### Frontend Components
- ✅ [components/Navbar.tsx](components/Navbar.tsx) - структурно OK
- ✅ [components/BookingModal.tsx](components/BookingModal.tsx) - структурно OK
- ✅ [components/AdminDashboard.tsx](components/AdminDashboard.tsx) - структурно OK
- ✅ [components/CartDrawer.tsx](components/CartDrawer.tsx) - структурно OK
- ✅ [components/LoginModal.tsx](components/LoginModal.tsx) - структурно OK
- ✅ [components/StyleAssistant.tsx](components/StyleAssistant.tsx) - структурно OK

---

## 🛠️ РЕКОМЕНДУЕМЫЙ ПОРЯДОК ИСПРАВЛЕНИЙ

### Приоритет 1 (КРИТИЧЕСКОЕ - блокирует Docker build)
1. Переписать [backend/seed.js](backend/seed.js) на ES modules
2. Создать [backend/models/Barber.js](backend/models/Barber.js)
3. Создать [backend/routes/barberRoutes.js](backend/routes/barberRoutes.js)
4. Добавить barberRoutes в [backend/index.js](backend/index.js)
5. Создать [backend/controllers/barberController.js](backend/controllers/barberController.js)

### Приоритет 2 (ВАЖНОЕ - требуется для Vercel)
6. Исправить [vite.config.ts](vite.config.ts) - __dirname и node:path
7. Удалить unused imports из [App.tsx](App.tsx)
8. Исправить accessibility issues (links и buttons)

### Приоритет 3 (ОПЦИОНАЛЬНО - Linting)
9. Исправить Markdown в [README.md](README.md)

---

## 📊 Статистика

| Категория | Критические | Серьезные | Предупреждения | OK |
|-----------|-------------|-----------|----------------|-----|
| Backend | 1 | 2 | 0 | 12 |
| Frontend | 0 | 0 | 15+ | 30+ |
| Config | 0 | 1 | 0 | 4 |
| **ИТОГО** | **1** | **3** | **15+** | **46+** |

---

## ✋ NO MERGE CONFLICTS DETECTED
Проверка на маркеры слияния `<<<<<<<`, `=======`, `>>>>>>>` не выявила никаких конфликтов слияния Git.

