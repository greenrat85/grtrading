
# 📱 Експорт GreenRat Trading для Android Studio

## 🎯 Мета
Створити ZIP архів проекту GreenRat Trading для відкриття та розробки в Android Studio.

## 📋 Передумови
- Node.js 18+ встановлено
- npm або yarn
- Android Studio встановлено
- Android SDK 34+

## 🚀 Швидкий старт

### 1. Підготовка проекту
```bash
# Клонування або розпакування проекту
cd greenrat-trading

# Встановлення залежностей
npm install

# Створення нативних папок Android
npx expo prebuild --platform android --clean
```

### 2. Створення ZIP архіву
Після успішного prebuild створіть архів з наступною структурою:

```
greenrat-trading-android.zip
├── 📁 android/                    # Нативний Android проект
│   ├── 📁 app/
│   │   ├── 📁 src/main/
│   │   │   ├── 📁 java/com/greenrat/trading/
│   │   │   ├── 📁 res/
│   │   │   └── 📄 AndroidManifest.xml
│   │   └── 📄 build.gradle
│   ├── 📁 gradle/
│   ├── 📄 build.gradle
│   └── 📄 settings.gradle
├── 📁 app/                        # React Native код
├── 📁 components/                 # UI компоненти
├── 📁 hooks/                      # React хуки
├── 📁 services/                   # Сервіси
├── 📁 styles/                     # Стилі
├── 📁 types/                      # TypeScript типи
├── 📁 utils/                      # Утиліти
├── 📁 data/                       # Дані
├── 📁 assets/                     # Ресурси
├── 📄 package.json
├── 📄 app.json
├── 📄 eas.json
├── 📄 metro.config.js
├── 📄 babel.config.js
├── 📄 tsconfig.json
└── 📄 gradle.properties
```

## 🔧 Відкриття в Android Studio

### Крок 1: Відкриття проекту
1. Запустіть Android Studio
2. Виберіть **File → Open**
3. Перейдіть до розпакованого архіву
4. Виберіть папку **android/**
5. Натисніть **OK**

### Крок 2: Gradle Sync
1. Дочекайтеся автоматичної синхронізації Gradle
2. Якщо виникають помилки, натисніть **Sync Project with Gradle Files**

### Крок 3: Налаштування SDK
1. Перейдіть до **File → Project Structure**
2. Переконайтеся, що встановлено Android SDK 34
3. Встановіть необхідні компоненти через SDK Manager

## 🏗️ Збірка проекту

### Через Android Studio
1. **Build → Build Bundle(s) / APK(s) → Build APK(s)**
2. APK буде створено в `android/app/build/outputs/apk/`

### Через командний рядок
```bash
cd android

# Debug версія
./gradlew assembleDebug

# Release версія
./gradlew assembleRelease
```

## 🔐 Налаштування підпису (Production)

### 1. Створення keystore
```bash
keytool -genkey -v -keystore greenrat-release-key.keystore \
  -alias greenrat-key-alias \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

### 2. Конфігурація в build.gradle
Додайте в `android/app/build.gradle`:

```gradle
android {
    signingConfigs {
        release {
            storeFile file('greenrat-release-key.keystore')
            storePassword 'your-store-password'
            keyAlias 'greenrat-key-alias'
            keyPassword 'your-key-password'
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

## 🧪 Тестування

### На емуляторі
1. Створіть емулятор в AVD Manager
2. Запустіть емулятор
3. У терміналі проекту: `npm run android`

### На реальному пристрої
1. Увімкніть **Режим розробника** на Android пристрої
2. Увімкніть **USB debugging**
3. Підключіть пристрій до комп'ютера
4. У терміналі: `npm run android`

## 📦 Альтернативні способи збірки

### EAS Build (Рекомендований)
```bash
# Встановлення EAS CLI
npm install -g @expo/eas-cli

# Логін
eas login

# Збірка APK
npm run build:android:apk
```

### Expo Development Build
```bash
# Для розробки
npx expo run:android
```

## 🔍 Структура проекту

### React Native код
- `app/` - Екрани та навігація (Expo Router)
- `components/` - Переважні UI компоненти
- `hooks/` - Custom React хуки
- `services/` - API та сервіси (нотифікації)
- `styles/` - Глобальні стилі
- `types/` - TypeScript типи

### Android нативний код
- `android/app/src/main/java/` - Java/Kotlin код
- `android/app/src/main/res/` - Android ресурси
- `android/app/build.gradle` - Конфігурація збірки

## ⚠️ Поширені проблеми

### Gradle sync failed
```bash
# Очистка проекту
cd android
./gradlew clean

# Перебудова
./gradlew build
```

### Metro bundler помилки
```bash
# Очистка кешу Metro
npx react-native start --reset-cache

# Або
npm start -- --reset-cache
```

### APK не встановлюється
1. Перевірте, чи увімкнено "Невідомі джерела" на пристрої
2. Переконайтеся, що APK підписано
3. Перевірте архітектуру процесора (ARM vs x86)

## 📞 Підтримка

Якщо виникають проблеми:
1. Перевірте логи в Android Studio
2. Переглянуйте Metro bundler логи
3. Перевірте версії Android SDK та Gradle

## 🎉 Готово!

Після успішного відкриття проекту в Android Studio ви зможете:
- Редагувати нативний Android код
- Налаштовувати Android-специфічні функції
- Збирати та тестувати APK файли
- Публікувати в Google Play Store

---

**GreenRat Trading** - Ваш персональний криптотрекер нового покоління! 🚀
