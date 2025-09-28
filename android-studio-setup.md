
# Підготовка проекту GreenRat Trading для Android Studio

## Крок 1: Встановлення залежностей
```bash
npm install
```

## Крок 2: Prebuild для створення нативних папок
```bash
npx expo prebuild --platform android --clean
```

## Крок 3: Створення ZIP архіву
Після виконання prebuild у вас з'явиться папка `android/`. Створіть ZIP архів з наступними папками та файлами:

### Структура архіву:
```
greenrat-trading-android.zip
├── android/                 # Нативний Android проект
├── app/                     # React Native код
├── components/              # Компоненти
├── hooks/                   # Хуки
├── services/               # Сервіси
├── styles/                 # Стилі
├── types/                  # Типи
├── utils/                  # Утиліти
├── data/                   # Дані
├── assets/                 # Ресурси
├── package.json
├── app.json
├── metro.config.js
├── babel.config.js
├── tsconfig.json
└── eas.json
```

## Крок 4: Відкриття в Android Studio
1. Відкрийте Android Studio
2. Виберіть "Open an existing Android Studio project"
3. Перейдіть до папки `android/` у розпакованому архіві
4. Дочекайтеся синхронізації Gradle

## Крок 5: Налаштування середовища
1. Переконайтеся, що встановлено Android SDK 34
2. Встановіть необхідні емулятори або підключіть фізичний пристрій
3. Запустіть Metro bundler: `npm run android`

## Додаткові команди для збірки:
- Розробка: `npm run android`
- APK збірка: `npm run build:android:apk`
- Production збірка: `npm run build:android:production`
