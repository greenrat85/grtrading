
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from './Icon';

const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  step: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  commandBox: {
    backgroundColor: colors.backgroundAlt,
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  commandText: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: colors.text,
  },
  linkButton: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  linkButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  warningBox: {
    backgroundColor: '#FEF3C7',
    borderColor: '#F59E0B',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
  },
  warningText: {
    color: '#92400E',
    fontSize: 14,
  },
};

export default function InstallationGuide() {
  const openEASLink = () => {
    Linking.openURL('https://expo.dev/accounts/[your-username]/projects/greenrat-trading/builds');
  };

  const openPlayStoreLink = () => {
    Linking.openURL('https://developer.android.com/studio');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={commonStyles.title}>Встановлення GreenRat Trading</Text>
        <Text style={commonStyles.textSecondary}>
          Інструкція для встановлення додатку на Android пристрій
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Step 1 */}
        <View style={styles.step}>
          <View style={commonStyles.row}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <View style={commonStyles.flex1}>
              <Text style={styles.stepTitle}>Встановіть EAS CLI</Text>
            </View>
          </View>
          <Text style={styles.stepDescription}>
            Встановіть Expo Application Services CLI для збірки APK файлу:
          </Text>
          <View style={styles.commandBox}>
            <Text style={styles.commandText}>npm install -g @expo/eas-cli</Text>
          </View>
        </View>

        {/* Step 2 */}
        <View style={styles.step}>
          <View style={commonStyles.row}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <View style={commonStyles.flex1}>
              <Text style={styles.stepTitle}>Увійдіть в Expo акаунт</Text>
            </View>
          </View>
          <Text style={styles.stepDescription}>
            Створіть акаунт на expo.dev та увійдіть через CLI:
          </Text>
          <View style={styles.commandBox}>
            <Text style={styles.commandText}>eas login</Text>
          </View>
        </View>

        {/* Step 3 */}
        <View style={styles.step}>
          <View style={commonStyles.row}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <View style={commonStyles.flex1}>
              <Text style={styles.stepTitle}>Зберіть APK файл</Text>
            </View>
          </View>
          <Text style={styles.stepDescription}>
            Запустіть збірку APK файлу для Android:
          </Text>
          <View style={styles.commandBox}>
            <Text style={styles.commandText}>eas build --platform android --profile preview</Text>
          </View>
          <Text style={[styles.stepDescription, { marginTop: 8 }]}>
            Або для production збірки:
          </Text>
          <View style={styles.commandBox}>
            <Text style={styles.commandText}>eas build --platform android --profile production</Text>
          </View>
        </View>

        {/* Step 4 */}
        <View style={styles.step}>
          <View style={commonStyles.row}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>4</Text>
            </View>
            <View style={commonStyles.flex1}>
              <Text style={styles.stepTitle}>Завантажте APK</Text>
            </View>
          </View>
          <Text style={styles.stepDescription}>
            Після завершення збірки, завантажте APK файл з Expo Dashboard:
          </Text>
          <TouchableOpacity style={styles.linkButton} onPress={openEASLink}>
            <Text style={styles.linkButtonText}>Відкрити Expo Dashboard</Text>
          </TouchableOpacity>
        </View>

        {/* Step 5 */}
        <View style={styles.step}>
          <View style={commonStyles.row}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>5</Text>
            </View>
            <View style={commonStyles.flex1}>
              <Text style={styles.stepTitle}>Встановіть на Android</Text>
            </View>
          </View>
          <Text style={styles.stepDescription}>
            1. Перенесіть APK файл на ваш Android пристрій
            {'\n'}2. Увімкніть "Встановлення з невідомих джерел" в налаштуваннях
            {'\n'}3. Відкрийте APK файл та встановіть додаток
          </Text>
        </View>

        {/* Alternative Method */}
        <View style={styles.step}>
          <View style={commonStyles.row}>
            <Icon name="information-circle" size={24} color={colors.primary} />
            <View style={[commonStyles.flex1, { marginLeft: 12 }]}>
              <Text style={styles.stepTitle}>Альтернативний метод</Text>
            </View>
          </View>
          <Text style={styles.stepDescription}>
            Ви також можете використовувати Expo Development Build для тестування:
          </Text>
          <View style={styles.commandBox}>
            <Text style={styles.commandText}>npx expo run:android</Text>
          </View>
        </View>

        <View style={styles.warningBox}>
          <Text style={styles.warningText}>
            ⚠️ Увага: Для збірки APK файлу потрібен акаунт Expo. Безкоштовний план дозволяє 
            обмежену кількість збірок на місяць.
          </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
