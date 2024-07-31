import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

// Foreground message handler
export const handleForegroundNotification = () => {
  messaging().onMessage(async remoteMessage => {
    console.log('A new FCM message arrived in the foreground!', remoteMessage);

    // Display an alert with the notification data
    Alert.alert(
      remoteMessage.notification.title,
      remoteMessage.notification.body,
      [{ text: 'OK' }]
    );
  });
};

// Background message handler
export const handleBackgroundNotification = async () => {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('A new FCM message arrived in the background!', remoteMessage);
    // Handle the background notification here
  });
};
