import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const handleLogoutPress = () => {
    // Perform logout logic (e.g., clear local storage, redirect)
    console.log('Logout pressed');
    navigation.navigate('Login'); // Navigate back to LoginScreen
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }} 
          style={styles.profileImage}
        />
        <Text style={styles.userName}>John Doe</Text>
        <Text style={styles.userEmail}>john.doe@example.com</Text>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('Bikes')}>
          <Text style={styles.optionText}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('Map')}>
          <Text style={styles.optionText}>Maps</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('Documents')}>
          <Text style={styles.optionText}>Documents</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.optionButton, styles.logoutButton]} onPress={handleLogoutPress}>
          <Text style={styles.optionText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderColor: '#ddd',
    borderWidth: 2,
  },
  userName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  optionsContainer: {
    flex: 1,
  },
  optionButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    marginVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
  logoutButton: {
    backgroundColor: '#ff4d4d',
  },
  optionText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
