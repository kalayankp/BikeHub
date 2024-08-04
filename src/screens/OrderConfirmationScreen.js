import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OrderConfirmationScreen = () => {
  const navigation = useNavigation();

  const handleContinuePress = () => {
    navigation.navigate('Bikes'); // Navigate back to the main tab navigation
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Placed Successfully!</Text>
      <Text style={styles.message}>
        Your product is on its way to you. Track your order now!
      </Text>

      <TouchableOpacity style={styles.continueButton} onPress={handleContinuePress}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 1.2,
  },
  message: {
    fontSize: 18,
    color: '#e0e0e0',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  continueButton: {
    backgroundColor: '#28a745',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default OrderConfirmationScreen;
