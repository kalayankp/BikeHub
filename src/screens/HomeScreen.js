import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Image, TouchableOpacity, DrawerLayoutAndroid, VirtualizedList, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData, fetchUsersList, deleteUser } from '../redux/userSlice';
import { logout } from '../redux/authSlice'; // Import logout action
import MenuIcon from '../img/menu.png';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [refreshing, setRefreshing] = useState(false);
  const drawerRef = React.useRef(null);

  const userData = useSelector(state => state.auth.userData || {});
  const usersList = useSelector(state => state.user.list || []);

  useEffect(() => {
    fetchData();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [dispatch, fadeAnim]);

  const fetchData = async () => {
    try {
      await dispatch(fetchUserData()).unwrap();
      await dispatch(fetchUsersList()).unwrap();
    } catch (error) {
      console.error("Failed to fetch data: ", error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('Login');
  };

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
  };

  const handleEditUser = (userId) => {
    navigation.navigate('Edit', { userId });
  };

  const getItem = (data, index) => data[index];
  const getItemCount = (data) => data.length;

  const renderItem = ({ item }) => (
    <View style={styles.userContainer}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
      </View>
      <View style={styles.userActions}>
        <TouchableOpacity onPress={() => handleEditUser(item.id)}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteUser(item.id)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderDrawerContent = () => (
    <View style={styles.drawerContent}>
      <View style={styles.drawerHeader}>
        <Image source={require('../img/twitter.png')} style={styles.logo} />
      </View>
      <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Home')}>
        <Image source={require('../img/home.png')} style={styles.icon} />
        <Text style={styles.drawerText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Profile')}>
        <Image source={require('../img/profile.png')} style={styles.icon} />
        <Text style={styles.drawerText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Settings')}>
        <Image source={require('../img/settings.png')} style={styles.icon} />
        <Text style={styles.drawerText}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem} onPress={handleLogout}>
        <Image source={require('../img/profile.png')} style={styles.icon} />
        <Text style={styles.drawerText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawerRef}
      drawerWidth={300}
      drawerPosition={DrawerLayoutAndroid.positions.Left}
      renderNavigationView={renderDrawerContent}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => drawerRef.current.openDrawer()} style={styles.drawerButton}>
            <Image source={MenuIcon} style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.title}>Home</Text>
        </View>
        <VirtualizedList
          data={usersList}
          initialNumToRender={10}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          getItemCount={getItemCount}
          getItem={getItem}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            // Handle lazy loading or fetching more data
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          }
        />
      </View>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  drawerButton: {
    marginRight: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#777',
  },
  userActions: {
    flexDirection: 'row',
  },
  editButton: {
    color: '#007BFF',
    marginRight: 15,
    fontWeight: 'bold',
  },
  deleteButton: {
    color: '#FF4136',
    fontWeight: 'bold',
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: '#007BFF',
  },
  drawerContent: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  drawerHeader: {
    marginBottom: 20,
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  drawerText: {
    fontSize: 18,
    marginLeft: 15,
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
