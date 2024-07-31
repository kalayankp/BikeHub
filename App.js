import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppNavigator from './src/navigation/AppNavigator';
import { store, persistor } from './src/redux/store';
import 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';
import { handleForegroundNotification, handleBackgroundNotification } from './src/screens/PushNotificationService'; // Adjust the path accordingly

const App = () => {
  useEffect(() => {
    // Initialize foreground notification handling
    handleForegroundNotification();
    
    // Initialize background notification handling
    handleBackgroundNotification();

    // Request permission for iOS (if needed)
    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    };

    requestUserPermission();

    // Clean up on component unmount
    return () => {
      messaging().onMessage(() => {}); // Unsubscribe from foreground messages
      messaging().setBackgroundMessageHandler(() => {}); // Unsubscribe from background messages
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
