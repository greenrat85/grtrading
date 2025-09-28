
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../../styles/commonStyles';
import Icon from '../../components/Icon';
import InstallationGuide from '../../components/InstallationGuide';
import InstallationStatus from '../../components/InstallationStatus';
import ExportProject from '../../components/ExportProject';
import SimpleBottomSheet from '../../components/BottomSheet';

export default function SettingsScreen() {
  const [notifications, setNotifications] = React.useState(true);
  const [biometric, setBiometric] = React.useState(false);
  const [autoRefresh, setAutoRefresh] = React.useState(true);
  const [showInstallGuide, setShowInstallGuide] = React.useState(false);
  const [showInstallStatus, setShowInstallStatus] = React.useState(false);
  const [showExportProject, setShowExportProject] = React.useState(false);

  const SettingItem = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    rightElement 
  }: {
    icon: string;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    rightElement?: React.ReactNode;
  }) => (
    <TouchableOpacity 
      style={[commonStyles.card, styles.settingItem]} 
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingContent}>
        <Icon name={icon as any} size={24} color={colors.primary} />
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && (
            <Text style={commonStyles.textSecondary}>{subtitle}</Text>
          )}
        </View>
        {rightElement || (
          onPress && <Icon name="chevron-forward" size={20} color={colors.textSecondary} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.content}>
        <Text style={commonStyles.title}>Settings</Text>
        <Text style={[commonStyles.textSecondary, { marginBottom: 24 }]}>
          Customize your GreenRat experience
        </Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* General Settings */}
          <Text style={styles.sectionTitle}>General</Text>
          
          <SettingItem
            icon="notifications"
            title="Push Notifications"
            subtitle="Get notified when goals are reached"
            rightElement={
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={colors.background}
              />
            }
          />

          <SettingItem
            icon="refresh"
            title="Auto Refresh"
            subtitle="Automatically update prices"
            rightElement={
              <Switch
                value={autoRefresh}
                onValueChange={setAutoRefresh}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={colors.background}
              />
            }
          />

          <SettingItem
            icon="globe"
            title="Currency"
            subtitle="USD"
            onPress={() => console.log('Currency settings')}
          />

          {/* Security Settings */}
          <Text style={styles.sectionTitle}>Security</Text>
          
          <SettingItem
            icon="finger-print"
            title="Biometric Authentication"
            subtitle="Use Face ID or fingerprint"
            rightElement={
              <Switch
                value={biometric}
                onValueChange={setBiometric}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={colors.background}
              />
            }
          />

          <SettingItem
            icon="lock-closed"
            title="PIN Code"
            subtitle="Set up a PIN for app access"
            onPress={() => console.log('PIN settings')}
          />

          <SettingItem
            icon="eye-off"
            title="Privacy Mode"
            subtitle="Hide sensitive information"
            onPress={() => console.log('Privacy settings')}
          />

          {/* Data Management */}
          <Text style={styles.sectionTitle}>Data</Text>
          
          <SettingItem
            icon="download"
            title="Export Data"
            subtitle="Export portfolio to CSV/Excel"
            onPress={() => console.log('Export data')}
          />

          <SettingItem
            icon="cloud-upload"
            title="Import Data"
            subtitle="Import from CSV/Excel file"
            onPress={() => console.log('Import data')}
          />

          {/* AI Assistant */}
          <Text style={styles.sectionTitle}>AI Assistant</Text>
          
          <SettingItem
            icon="chatbubble-ellipses"
            title="GreenRat AI"
            subtitle="Configure AI assistant settings"
            onPress={() => console.log('AI settings')}
          />

          {/* Installation */}
          <Text style={styles.sectionTitle}>Installation</Text>
          
          <SettingItem
            icon="checkmark-circle"
            title="Installation Status"
            subtitle="Check device compatibility"
            onPress={() => setShowInstallStatus(true)}
          />
          
          <SettingItem
            icon="phone-portrait"
            title="Install on Android"
            subtitle="Guide for APK installation"
            onPress={() => setShowInstallGuide(true)}
          />

          <SettingItem
            icon="code"
            title="Export for Android Studio"
            subtitle="Create ZIP archive for development"
            onPress={() => setShowExportProject(true)}
          />

          {/* About */}
          <Text style={styles.sectionTitle}>About</Text>
          
          <SettingItem
            icon="information-circle"
            title="App Version"
            subtitle="v1.0.0"
          />

          <SettingItem
            icon="help-circle"
            title="Help & Support"
            onPress={() => console.log('Help')}
          />

          <SettingItem
            icon="document-text"
            title="Privacy Policy"
            onPress={() => console.log('Privacy policy')}
          />
        </ScrollView>
      </View>

      <SimpleBottomSheet
        isVisible={showInstallGuide}
        onClose={() => setShowInstallGuide(false)}
      >
        <InstallationGuide />
      </SimpleBottomSheet>

      <SimpleBottomSheet
        isVisible={showInstallStatus}
        onClose={() => setShowInstallStatus(false)}
      >
        <InstallationStatus />
      </SimpleBottomSheet>

      <ExportProject
        isVisible={showExportProject}
        onClose={() => setShowExportProject(false)}
      />
    </SafeAreaView>
  );
}

const styles = {
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: colors.text,
    marginTop: 24,
    marginBottom: 12,
    marginLeft: 4,
  },
  settingItem: {
    marginBottom: 8,
    paddingVertical: 16,
  },
  settingContent: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  settingText: {
    flex: 1,
    marginLeft: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500' as const,
    color: colors.text,
    marginBottom: 2,
  },
};
