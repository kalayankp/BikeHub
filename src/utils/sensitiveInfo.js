// src/utils/sensitiveInfo.js
import SInfo from 'react-native-sensitive-info';

const setSensitiveInfo = async (key, value) => {
  await SInfo.setItem(key, value, {
    sharedPreferencesName: 'mySharedPrefs',
    keychainService: 'myKeychain',
  });
};

const getSensitiveInfo = async (key) => {
  const value = await SInfo.getItem(key, {
    sharedPreferencesName: 'mySharedPrefs',
    keychainService: 'myKeychain',
  });
  return value;
};

export { setSensitiveInfo, getSensitiveInfo };
