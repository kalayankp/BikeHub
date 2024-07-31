// src/services/notificationService.js
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
};

export const notificationListener = () => {
  messaging().onMessage(async remoteMessage => {
    Alert.alert('A new message arrived!', JSON.stringify(remoteMessage));
  });
};
