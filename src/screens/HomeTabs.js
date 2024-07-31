import React, { useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';

const initialLayout = { width: Dimensions.get('window').width };

const HomeTabs = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'home', title: 'Home' },
    { key: 'profile', title: 'Profile' },
    { key: 'settings', title: 'Settings' },
  ]);

  const renderScene = SceneMap({
    home: HomeScreen,
    profile: ProfileScreen,
    settings: SettingsScreen,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      labelStyle={styles.label}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: '#007BFF',
  },
  indicator: {
    backgroundColor: '#fff',
  },
  label: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeTabs;
