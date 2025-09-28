
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from './Icon';
import SimpleBottomSheet from './BottomSheet';

interface ExportProjectProps {
  isVisible: boolean;
  onClose: () => void;
}

const ExportProject: React.FC<ExportProjectProps> = ({ isVisible, onClose }) => {
  const [exportStep, setExportStep] = useState<'select' | 'instructions'>('select');

  const exportOptions = [
    {
      id: 'android-studio',
      title: 'Android Studio Project',
      description: 'Експорт для відкриття в Android Studio',
      icon: 'code',
      action: () => showAndroidStudioInstructions()
    },
    {
      id: 'apk-build',
      title: 'APK Build',
      description: 'Інструкції для збірки APK файлу',
      icon: 'download',
      action: () => showAPKInstructions()
    },
    {
      id: 'source-code',
      title: 'Source Code',
      description: 'Експорт вихідного коду проекту',
      icon: 'folder',
      action: () => showSourceCodeInstructions()
    }
  ];

  const showAndroidStudioInstructions = () => {
    setExportStep('instructions');
  };

  const showAPKInstructions = () => {
    Alert.alert(
      'APK Build Instructions',
      'Для збірки APK файлу:\n\n1. Встановіть EAS CLI: npm install -g @expo/eas-cli\n2. Увійдіть: eas login\n3. Зберіть APK: npm run build:android:apk\n\nДетальні інструкції в файлі build-instructions.md',
      [{ text: 'OK' }]
    );
  };

  const showSourceCodeInstructions = () => {
    Alert.alert(
      'Source Code Export',
      'Для експорту вихідного коду:\n\n1. Скопіюйте всі файли проекту\n2. Виключіть папки: node_modules, .expo, android, ios\n3. Включіть: app/, components/, hooks/, services/, styles/, package.json, app.json\n\nСтворіть ZIP архів з цими файлами.',
      [{ text: 'OK' }]
    );
  };

  const renderInstructions = () => (
    <ScrollView style={styles.instructionsContainer}>
      <View style={styles.instructionHeader}>
        <TouchableOpacity 
          onPress={() => setExportStep('select')}
          style={styles.backButton}
        >
          <Icon name="arrow-left" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.instructionTitle}>Android Studio Setup</Text>
      </View>

      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>Крок 1: Підготовка</Text>
        <Text style={styles.stepText}>
          Встановіть залежності:{'\n'}
          <Text style={styles.codeText}>npm install</Text>
        </Text>
      </View>

      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>Крок 2: Prebuild</Text>
        <Text style={styles.stepText}>
          Створіть нативні папки:{'\n'}
          <Text style={styles.codeText}>npx expo prebuild --platform android --clean</Text>
        </Text>
      </View>

      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>Крок 3: ZIP архів</Text>
        <Text style={styles.stepText}>
          Після prebuild створіть ZIP архів з папками:{'\n'}
          • android/ (нативний проект){'\n'}
          • app/ (React Native код){'\n'}
          • components/, hooks/, services/{'\n'}
          • package.json, app.json, metro.config.js
        </Text>
      </View>

      <View style={styles.stepContainer}>
        <Text style={styles.stepTitle}>Крок 4: Android Studio</Text>
        <Text style={styles.stepText}>
          1. Відкрийте Android Studio{'\n'}
          2. Open existing project{'\n'}
          3. Виберіть папку android/{'\n'}
          4. Дочекайтеся Gradle sync
        </Text>
      </View>

      <TouchableOpacity 
        style={styles.actionButton}
        onPress={() => Alert.alert('Info', 'Детальні інструкції збережено в файлах android-studio-setup.md та build-instructions.md')}
      >
        <Icon name="info" size={20} color={colors.white} />
        <Text style={styles.actionButtonText}>Детальні інструкції</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderOptions = () => (
    <View style={styles.optionsContainer}>
      <Text style={styles.title}>Експорт проекту</Text>
      <Text style={styles.subtitle}>Виберіть тип експорту для GreenRat Trading</Text>
      
      {exportOptions.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={styles.optionCard}
          onPress={option.action}
        >
          <View style={styles.optionIcon}>
            <Icon name={option.icon} size={24} color={colors.primary} />
          </View>
          <View style={styles.optionContent}>
            <Text style={styles.optionTitle}>{option.title}</Text>
            <Text style={styles.optionDescription}>{option.description}</Text>
          </View>
          <Icon name="chevron-right" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SimpleBottomSheet isVisible={isVisible} onClose={onClose}>
      {exportStep === 'select' ? renderOptions() : renderInstructions()}
    </SimpleBottomSheet>
  );
};

const styles = {
  optionsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 24,
  },
  optionCard: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryLight,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginRight: 16,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: colors.text,
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  instructionsContainer: {
    padding: 20,
    maxHeight: 600,
  },
  instructionHeader: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginBottom: 24,
  },
  backButton: {
    marginRight: 16,
  },
  instructionTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: colors.text,
  },
  stepContainer: {
    marginBottom: 24,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: colors.text,
    marginBottom: 8,
  },
  stepText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  codeText: {
    fontFamily: 'monospace',
    backgroundColor: colors.surface,
    padding: 4,
    borderRadius: 4,
    color: colors.primary,
  },
  actionButton: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  actionButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600' as const,
    marginLeft: 8,
  },
};

export default ExportProject;
