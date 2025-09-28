
# Створення ZIP архіву для Android Studio

## Автоматичний спосіб (Рекомендований)

### 1. Підготовка проекту
```bash
# Встановлення залежностей
npm install

# Створення нативних папок Android
npx expo prebuild --platform android --clean
```

### 2. Створення архіву
Після успішного prebuild у вас з'явиться папка `android/`. Створіть ZIP архів з наступною структурою:

```
greenrat-trading-android.zip
├── android/                    # Нативний Android проект (створюється prebuild)
│   ├── app/
│   │   ├── src/main/
│   │   │   ├── java/com/greenrat/trading/
│   │   │   ├── res/
│   │   │   └── AndroidManifest.xml
│   │   └── build.gradle
│   ├── gradle/
│   ├── build.gradle
│   └── settings.gradle
├── app/                        # React Native код
├── components/                 # UI компоненти
├── hooks/                      # React хуки
├── services/                   # Сервіси (нотифікації, API)
├── styles/                     # Стилі
├── types/                      # TypeScript типи
├── utils/                      # Утиліти
├── data/                       # Дані та константи
├── assets/                     # Зображення та ресурси
├── node_modules/               # Залежності (опціонально)
├── package.json
├── package-lock.json
├── app.json
├── eas.json
├── metro.config.js
├── babel.config.js
├── tsconfig.json
├── gradle.properties
└── README.md
```

## Ручний спосіб

Якщо автоматичний prebuild не працює, можна створити мінімальний архів:

### Обов'язкові файли:
```
greenrat-trading-source.zip
├── app/                        # Весь код додатку
├── components/                 # Всі компоненти
├── hooks/                      # Всі хуки
├── services/                   # Всі сервіси
├── styles/                     # Стилі
├── types/                      # Типи
├── utils/                      # Утиліти
├── data/                       # Дані
├── assets/                     # Ресурси
├── package.json                # Залежності
├── app.json                    # Конфігурація Expo
├── eas.json                    # Конфігурація збірки
├── metro.config.js             # Конфігурація Metro
├── babel.config.js             # Конфігурація Babel
├── tsconfig.json               # Конфігурація TypeScript
├── gradle.properties           # Налаштування Gradle
├── android-studio-setup.md     # Інструкції
└── build-instructions.md       # Інструкції збірки
```

## Відкриття в Android Studio

### Якщо є папка android/:
1. Відкрийте Android Studio
2. File → Open
3. Виберіть папку `android/` з архіву
4. Дочекайтеся Gradle sync

### Якщо немає папки android/:
1. Розпакуйте архів
2. Відкрийте термінал у папці проекту
3. Виконайте: `npm install`
4. Виконайте: `npx expo prebuild --platform android`
5. Відкрийте папку `android/` в Android Studio

## Збірка APK

### Через Android Studio:
1. Build → Build Bundle(s) / APK(s) → Build APK(s)
2. APK буде в `android/app/build/outputs/apk/`

### Через командний рядок:
```bash
cd android
./gradlew assembleDebug        # Для debug версії
./gradlew assembleRelease      # Для release версії
```

## Налаштування для production

### 1. Створення keystore:
```bash
keytool -genkey -v -keystore greenrat-release-key.keystore -alias greenrat-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

### 2. Налаштування підпису в `android/app/build.gradle`:
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

## Тестування

### На емуляторі:
1. Запустіть емулятор Android
2. У терміналі: `npm run android`

### На реальному пристрої:
1. Увімкніть режим розробника
2. Увімкніть USB debugging
3. Підключіть пристрій
4. У терміналі: `npm run android`

## Поширені проблеми

### Gradle sync failed:
- Перевірте версію Android SDK
- Оновіть Android Studio
- Очистіть кеш: Build → Clean Project

### Metro bundler не запускається:
- Перевірте порт 8081
- Перезапустіть Metro: `npx react-native start --reset-cache`

### APK не встановлюється:
- Перевірте підпис APK
- Увімкніть "Unknown sources" на пристрої
- Перевірте архітектуру процесора
