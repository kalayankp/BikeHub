import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, KeyboardAvoidingView, TextInput, Alert } from 'react-native';
import { Button, Input } from 'react-native-elements';

// Signup Screen
const SignupScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [generatedOTP, setGeneratedOTP] = useState(null);
  const [phoneNumberError, setPhoneNumberError] = useState(null); 

  const handleGetOTP = () => {
    // Phone Number Validation
    if (!validatePhoneNumber(phoneNumber)) {
      setPhoneNumberError('Please enter a valid phone number.');
      return; // Stop if validation fails
    } 

    // Generate OTP
    const newOTP = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOTP(newOTP); 

    // Navigate to OTP Verification screen
    navigation.navigate('OTP', { phoneNumber, otp: newOTP });
  };

  // Basic Phone Number Validation using Regex (replace with more robust validation if needed)
  const validatePhoneNumber = (number) => {
    // Regex for common phone number formats
    const phoneNumberRegex = /^\d{10}$/; // 10 digits
    return phoneNumberRegex.test(number);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image source={require('../img/bike.jpg')} style={styles.bikeImage} />
      <Text style={styles.title}>Sign Up</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={(text) => {
            setPhoneNumber(text);
            if (validatePhoneNumber(text)) {
              setPhoneNumberError(null); // Clear error if valid
            }
          }}
          style={styles.input}
          placeholderTextColor="#999"
        />
        {phoneNumberError && <Text style={styles.errorText}>{phoneNumberError}</Text>} 
      </View>

      <Button
        title="Get OTP"
        buttonStyle={styles.button}
        titleStyle={styles.buttonTitle}
        onPress={handleGetOTP}
      />
      <Text style={styles.terms}>By signing up, you agree to our Terms and conditions.</Text>
    </KeyboardAvoidingView>
  );
};

// OTP Verification Screen
const OTPVerificationScreen = ({ route, navigation }) => {
  const { phoneNumber, otp } = route.params;
  const [enteredOTP, setEnteredOTP] = useState('');
  const [otpError, setOtpError] = useState(null); 

  const handleVerifyOTP = () => {
    // Basic OTP Validation
    if (!enteredOTP || enteredOTP.length !== 6 || isNaN(enteredOTP)) {
      setOtpError('Please enter a valid 6-digit OTP.');
      return; // Stop if validation fails
    }

    if (enteredOTP === otp) {
      // OTP is correct! Proceed with registration or whatever logic you have
      console.log('OTP Verified!');
      // ... Your actions here 
      // Example: Navigate to next screen
      navigation.navigate('RegistrationComplete'); 

    } else {
      // Invalid OTP
      console.log('Incorrect OTP');
      setOtpError('Incorrect OTP. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Enter the OTP sent to {phoneNumber}</Text>
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        value={enteredOTP}
        onChangeText={(text) => {
          setEnteredOTP(text);
          if (text.length === 6 && !isNaN(text)) {
            setOtpError(null); // Clear error if valid
          }
        }}
      />
      {otpError && <Text style={styles.errorText}>{otpError}</Text>}
      <Button title="Verify OTP" onPress={handleVerifyOTP} />
    </View>
  );
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  bikeImage: {
    width: '100%',
    height: height * 0.36,
    resizeMode: 'cover',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 12,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 50,
    paddingHorizontal: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 14,
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 50,
    paddingVertical: 16,
    paddingHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 50,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  terms: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
});

export default SignupScreen; 