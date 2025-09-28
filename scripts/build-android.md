
# GreenRat Trading - Android APK Build Guide

## Інструкція для збірки APK файлу

### Крок 1: Підготовка середовища

1. Встановіть Node.js (версія 18 або новіша)
2. Встановіть Expo CLI глобально:
   ```bash
   npm install -g @expo/cli
   ```

3. Встановіть EAS CLI:
   ```bash
   npm install -g @expo/eas-cli
   ```

### Крок 2: Налаштування проекту

1. Клонуйте або завантажте проект
2. Встановіть залежності:
   ```bash
   npm install
   ```

3. Увійдіть в Expo акаунт:
   ```bash
   eas login
   ```

### Крок 3: Збірка APK

Для тестової збірки (preview):
```bash
eas build --platform android --profile preview
```

Для production збірки:
```bash
eas build --platform android --profile production
```

### Крок 4: Завантаження APK

1. Після завершення збірки, перейдіть на https://expo.dev
2. Знайдіть ваш проект "GreenRat Trading"
3. Завантажте APK файл

### Крок 5: Встановлення на Android

1. Перенесіть APK файл на Android пристрій
2. Увімкніть "Встановлення з невідомих джерел" в налаштуваннях
3. Відкрийте APK файл та встановіть

### Альтернативні методи

#### Локальна збірка (потребує Android Studio):
```bash
npx expo run:android
```

#### Експорт для веб:
```bash
npx expo export -p web
```

### Налаштування для різних середовищ

#### Development Build:
```bash
eas build --platform android --profile development
```

#### Встановлення Development Client:
```bash
npx expo install expo-dev-client
```

### Корисні команди

- Перевірка статусу збірки: `eas build:list`
- Скасування збірки: `eas build:cancel [BUILD_ID]`
- Перегляд логів: `eas build:view [BUILD_ID]`

### Вимоги

- Expo SDK 54+
- Node.js 18+
- Android 6.0+ (API level 23+)
- 50MB вільного місця на пристрої

### Підтримка

Для отримання допомоги:
1. Перевірте документацію Expo: https://docs.expo.dev
2. Перегляньте логи збірки в Expo Dashboard
3. Зверніться до спільноти Expo на Discord або форумі
