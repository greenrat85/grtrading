
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from './Icon';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  header: {
    alignItems: 'center' as const,
    marginBottom: 32,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginBottom: 16,
  },
  logoText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '800' as const,
  },
  title: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: colors.text,
    textAlign: 'center' as const,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center' as const,
  },
  statusCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statusHeader: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginBottom: 12,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: colors.text,
    marginLeft: 12,
  },
  statusText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  infoRow: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: colors.text,
  },
  actionButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center' as const,
    marginBottom: 12,
  },
  actionButtonSecondary: {
    backgroundColor: colors.backgroundAlt,
    borderColor: colors.border,
    borderWidth: 1,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600' as const,
  },
  actionButtonTextSecondary: {
    color: colors.text,
  },
  successIcon: {
    color: colors.success,
  },
  warningIcon: {
    color: colors.warning,
  },
  errorIcon: {
    color: colors.danger,
  },
};

export default function InstallationStatus() {
  const [deviceInfo, setDeviceInfo] = useState<any>({});
  const [appInfo, setAppInfo] = useState<any>({});

  useEffect(() => {
    loadDeviceInfo();
    loadAppInfo();
  }, []);

  const loadDeviceInfo = async () => {
    const info = {
      isDevice: Device.isDevice,
      deviceName: Device.deviceName,
      deviceType: Device.deviceType,
      osName: Device.osName,
      osVersion: Device.osVersion,
      platform: Device.platformApiLevel,
    };
    setDeviceInfo(info);
    console.log('Device info loaded:', info);
  };

  const loadAppInfo = () => {
    const info = {
      appVersion: Constants.expoConfig?.version || '1.0.0',
      buildVersion: Constants.expoConfig?.android?.versionCode || 1,
      bundleId: Constants.expoConfig?.android?.package || 'com.greenrat.trading',
      sdkVersion: Constants.expoConfig?.sdkVersion || '54.0.0',
    };
    setAppInfo(info);
    console.log('App info loaded:', info);
  };

  const openBuildGuide = () => {
    Alert.alert(
      'Інструкція збірки',
      'Відкрити детальну інструкцію по збірці APK файлу?',
      [
        { text: 'Скасувати', style: 'cancel' },
        { 
          text: 'Відкрити', 
          onPress: () => Linking.openURL('https://docs.expo.dev/build/setup/') 
        },
      ]
    );
  };

  const openExpoConsole = () => {
    Linking.openURL('https://expo.dev/accounts/[your-username]/projects/greenrat-trading');
  };

  const shareAPK = () => {
    Alert.alert(
      'Поділитися APK',
      'APK файл буде доступний після збірки в Expo Console',
      [{ text: 'OK' }]
    );
  };

  const isAndroid = deviceInfo.osName === 'Android';
  const isPhysicalDevice = deviceInfo.isDevice;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>GR</Text>
        </View>
        <Text style={styles.title}>GreenRat Trading</Text>
        <Text style={styles.subtitle}>Готовий до встановлення на Android</Text>
      </View>

      {/* Device Status */}
      <View style={styles.statusCard}>
        <View style={styles.statusHeader}>
          <Icon 
            name={isPhysicalDevice ? "phone-portrait" : "desktop"} 
            size={24} 
            color={isPhysicalDevice ? colors.success : colors.warning} 
          />
          <Text style={styles.statusTitle}>Статус пристрою</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Тип пристрою</Text>
          <Text style={styles.infoValue}>
            {isPhysicalDevice ? 'Фізичний пристрій' : 'Емулятор/Веб'}
          </Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Операційна система</Text>
          <Text style={styles.infoValue}>
            {deviceInfo.osName} {deviceInfo.osVersion}
          </Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Сумісність</Text>
          <Text style={[styles.infoValue, { color: isAndroid ? colors.success : colors.warning }]}>
            {isAndroid ? 'Сумісний' : 'Потрібен Android'}
          </Text>
        </View>
      </View>

      {/* App Status */}
      <View style={styles.statusCard}>
        <View style={styles.statusHeader}>
          <Icon name="information-circle" size={24} color={colors.primary} />
          <Text style={styles.statusTitle}>Інформація про додаток</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Версія</Text>
          <Text style={styles.infoValue}>{appInfo.appVersion}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Build</Text>
          <Text style={styles.infoValue}>{appInfo.buildVersion}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Package ID</Text>
          <Text style={styles.infoValue}>{appInfo.bundleId}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Expo SDK</Text>
          <Text style={styles.infoValue}>{appInfo.sdkVersion}</Text>
        </View>
      </View>

      {/* Actions */}
      <TouchableOpacity style={styles.actionButton} onPress={openBuildGuide}>
        <Text style={styles.actionButtonText}>📱 Інструкція збірки APK</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.actionButton, styles.actionButtonSecondary]} 
        onPress={openExpoConsole}
      >
        <Text style={[styles.actionButtonText, styles.actionButtonTextSecondary]}>
          🌐 Відкрити Expo Console
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.actionButton, styles.actionButtonSecondary]} 
        onPress={shareAPK}
      >
        <Text style={[styles.actionButtonText, styles.actionButtonTextSecondary]}>
          📤 Поділитися APK
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.actionButton, { backgroundColor: colors.secondary }]} 
        onPress={() => Alert.alert(
          'Android Studio Export',
          'Для створення ZIP архіву:\n\n1. Виконайте: npm install\n2. Виконайте: npx expo prebuild --platform android --clean\n3. Створіть ZIP з папками: android/, app/, components/, package.json та іншими файлами\n\nДетальні інструкції в Settings → Export for Android Studio',
          [{ text: 'OK' }]
        )}
      >
        <Text style={styles.actionButtonText}>
          💻 Експорт для Android Studio
        </Text>
      </TouchableOpacity>

      {/* Status Message */}
      <View style={[styles.statusCard, { marginTop: 16 }]}>
        <View style={styles.statusHeader}>
          <Icon 
            name={isAndroid && isPhysicalDevice ? "checkmark-circle" : "warning"} 
            size={24} 
            color={isAndroid && isPhysicalDevice ? colors.success : colors.warning} 
          />
          <Text style={styles.statusTitle}>
            {isAndroid && isPhysicalDevice ? 'Готовий до встановлення' : 'Потрібна підготовка'}
          </Text>
        </View>
        <Text style={styles.statusText}>
          {isAndroid && isPhysicalDevice 
            ? 'Ваш пристрій готовий для встановлення GreenRat Trading APK файлу. Слідуйте інструкції збірки для створення APK.'
            : 'Для встановлення APK потрібен Android пристрій. Поточне середовище підходить тільки для розробки та тестування.'
          }
        </Text>
      </View>
    </SafeAreaView>
  );
}
