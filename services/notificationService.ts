
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export interface PriceAlert {
  tokenId: string;
  tokenName: string;
  targetPrice: number;
  currentPrice: number;
  goalType: 'x2' | 'x3' | 'custom';
}

class NotificationService {
  private expoPushToken: string | null = null;

  async initialize() {
    console.log('Initializing notification service...');
    
    if (!Device.isDevice) {
      console.log('Must use physical device for Push Notifications');
      return false;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return false;
    }

    try {
      const token = await Notifications.getExpoPushTokenAsync({
        projectId: 'greenrat-trading-crypto-tracker',
      });
      this.expoPushToken = token.data;
      console.log('Expo push token:', this.expoPushToken);
      return true;
    } catch (error) {
      console.log('Error getting push token:', error);
      return false;
    }
  }

  async scheduleGoalNotification(alert: PriceAlert) {
    console.log('Scheduling goal notification for:', alert.tokenName);
    
    const title = `🎯 Goal Reached!`;
    const body = `${alert.tokenName} reached ${alert.goalType} target! Current price: $${alert.currentPrice.toFixed(4)}`;

    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          sound: 'default',
          data: {
            tokenId: alert.tokenId,
            goalType: alert.goalType,
            price: alert.currentPrice,
          },
        },
        trigger: null, // Show immediately
      });
      console.log('Goal notification scheduled successfully');
    } catch (error) {
      console.log('Error scheduling notification:', error);
    }
  }

  async schedulePriceAlert(alert: PriceAlert) {
    console.log('Scheduling price alert for:', alert.tokenName);
    
    const title = `📈 Price Alert`;
    const body = `${alert.tokenName} is now $${alert.currentPrice.toFixed(4)}`;

    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          sound: 'default',
          data: {
            tokenId: alert.tokenId,
            price: alert.currentPrice,
          },
        },
        trigger: null,
      });
      console.log('Price alert scheduled successfully');
    } catch (error) {
      console.log('Error scheduling price alert:', error);
    }
  }

  async cancelAllNotifications() {
    console.log('Cancelling all notifications...');
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
      console.log('All notifications cancelled');
    } catch (error) {
      console.log('Error cancelling notifications:', error);
    }
  }

  async cancelNotificationsByToken(tokenId: string) {
    console.log('Cancelling notifications for token:', tokenId);
    try {
      const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
      const tokenNotifications = scheduledNotifications.filter(
        notification => notification.content.data?.tokenId === tokenId
      );
      
      for (const notification of tokenNotifications) {
        await Notifications.cancelScheduledNotificationAsync(notification.identifier);
      }
      console.log(`Cancelled ${tokenNotifications.length} notifications for ${tokenId}`);
    } catch (error) {
      console.log('Error cancelling token notifications:', error);
    }
  }

  getExpoPushToken(): string | null {
    return this.expoPushToken;
  }

  // Listen for notification responses
  addNotificationResponseListener(listener: (response: Notifications.NotificationResponse) => void) {
    return Notifications.addNotificationResponseReceivedListener(listener);
  }

  // Listen for notifications received while app is foregrounded
  addNotificationReceivedListener(listener: (notification: Notifications.Notification) => void) {
    return Notifications.addNotificationReceivedListener(listener);
  }
}

export const notificationService = new NotificationService();
