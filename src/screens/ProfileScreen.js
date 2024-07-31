import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

// Sample profile image
import ProfileImage from '../img/profile.png';

const ProfileScreen = () => {
  const handleEditProfile = () => {
    // Handle profile editing
  };

  const handleSettings = () => {
    // Navigate to settings screen
  };

  const handleLogout = () => {
    // Handle logout
  };

  const handleChangePassword = () => {
    // Navigate to change password screen
  };

  const handleHelpSupport = () => {
    // Navigate to help & support screen
  };

  const handlePrivacyPolicy = () => {
    // Navigate to privacy policy screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={ProfileImage} style={styles.profileImage} />
        <Text style={styles.profileName}>John Doe</Text>
        <Text style={styles.profileEmail}>johndoe@example.com</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSettings}>
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
     
        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleHelpSupport}>
          <Text style={styles.buttonText}>Help & Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePrivacyPolicy}>
          <Text style={styles.buttonText}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  profileEmail: {
    fontSize: 16,
    color: '#777',
  },
  buttonsContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
