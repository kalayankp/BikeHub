import React, { useState, useEffect } from 'react'; 
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image ,Alert} from 'react-native';
import { Button } from 'react-native-elements';

const OTPVerificationScreen = ({ route, navigation }) => {
  const [otp, setOtp] = useState('');
  const { phoneNumber } = route.params;

  // Automatically display 000000 when the screen is loaded
  useEffect(() => {
    setOtp('00000'); 
  }, []); 

  const handleVerifyOTP = () => {
   
    console.log('Verifying OTP:', otp, 'for phone:', phoneNumber);
    if (otp === '00000') { // Placeholder for OTP verification
      Alert.alert('OTP Verification', 'OTP Verified Successfully!', [
        { text: 'OK', onPress: () => navigation.replace('HomeTabs') },
      ]);
    } else {
      Alert.alert('Error', 'Incorrect OTP. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../img/hand-holding-a-phone-to-take-a-selfie-pic.png')} style={styles.image} />
      <Text style={styles.title}>OTP sent to</Text>
      <Text style={styles.phoneNumber}>{phoneNumber}</Text>
      <View style={styles.otpInputContainer}>
        {[1, 2, 3, 4, 5].map((_, index) => (
          <TextInput
            key={index}
            style={[styles.otpInput, otp[index] ? styles.otpInputFilled : null]}
            keyboardType="number-pad"
            maxLength={1}
            value={otp[index]}
            onChangeText={(text) => {
              const newOtp = [...otp];
              newOtp[index] = text;
              setOtp(newOtp.join(''));
            }}
          />
        ))}
      </View>
      <Button
        title="Verify OTP"
        buttonStyle={styles.button}
        titleStyle={styles.buttonTitle}
        onPress={handleVerifyOTP}
      />
      <Text style={styles.terms}>By signing up, you agree to our Terms and conditions.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 30,
    },
    image: {
      width: 120,
      height: 120,
      marginBottom: 40,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#333',
    },
    phoneNumber: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 40,
      color: '#007bff',
    },
    otpInputContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 40,
    },
    otpInput: {
      width: 55,
      height: 55,
      borderWidth: 2,
      borderColor: '#ddd',
      borderRadius: 12,
      textAlign: 'center',
      fontSize: 24,
      fontWeight: 'bold',
      marginHorizontal: 10,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    otpInputFilled: {
      backgroundColor: '#007bff',
      borderColor: '#007bff',
      color: '#fff',
    },
    button: {
      backgroundColor: '#007bff',
      borderRadius: 50,
      paddingVertical: 18,
      paddingHorizontal: 40,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    buttonTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
    },
    terms: {
      textAlign: 'center',
      color: '#666',
      fontSize: 14,
      marginTop: 30,
    },
  });
export default OTPVerificationScreen; 