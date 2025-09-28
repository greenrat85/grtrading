
# Інструкції для збірки GreenRat Trading

## Автоматична збірка APK через EAS

### 1. Встановлення EAS CLI
```bash
npm install -g @expo/eas-cli
```

### 2. Логін в Expo
```bash
eas login
```

### 3. Збірка APK
```bash
# Для тестування
npm run build:android:apk

# Для production
npm run build:android:production
```

## Ручна збірка через Android Studio

### 1. Підготовка проекту
```bash
npm install
npx expo prebuild --platform android --clean
```

### 2. Відкриття в Android Studio
1. Відкрийте Android Studio
2. Виберіть "Open an existing Android Studio project"
3. Відкрийте папку `android/`

### 3. Збірка APK
1. У Android Studio: Build → Build Bundle(s) / APK(s) → Build APK(s)
2. Або через командний рядок:
```bash
cd android
./gradlew assembleRelease
```

## Структура проекту для Android Studio

```
android/
├── app/
│   ├── src/main/
│   │   ├── java/com/greenrat/trading/
│   │   ├── res/
│   │   └── AndroidManifest.xml
│   └── build.gradle
├── gradle/
├── build.gradle
└── settings.gradle
```

## Налаштування підпису APK

Для production збірки потрібно налаштувати підпис:

1. Створіть keystore:
```bash
keytool -genkey -v -keystore greenrat-release-key.keystore -alias greenrat-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

2. Додайте в `android/gradle.properties`:
```
GREENRAT_UPLOAD_STORE_FILE=greenrat-release-key.keystore
GREENRAT_UPLOAD_KEY_ALIAS=greenrat-key-alias
GREENRAT_UPLOAD_STORE_PASSWORD=***
GREENRAT_UPLOAD_KEY_PASSWORD=***
```

## Тестування

### Емулятор
```bash
npm run android
```

### Фізичний пристрій
1. Увімкніть режим розробника на пристрої
2. Увімкніть USB debugging
3. Підключіть пристрій
4. Запустіть: `npm run android`
