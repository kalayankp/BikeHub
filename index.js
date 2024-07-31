// /**
//  * @format
//  */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';
// import 'react-native-gesture-handler';


// AppRegistry.registerComponent(appName, () => App);
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';

// Background message handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('A new FCM message arrived in the background!', remoteMessage);
  // Handle the background notification here
});

AppRegistry.registerComponent(appName, () => App);
