import React, { useRef, useState } from 'react';
import { View, TextInput, Text, ActivityIndicator, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Dimensions, StyleSheet, Platform, StatusBar, Image } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';

const { width, height } = Dimensions.get('window');

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

const evaluatePasswordStrength = (password) => {
  let strength = 0;
  if (password.length > 6) strength += 10;
  if (password.match(/[a-z]/)) strength += 10;
  if (password.match(/[A-Z]/)) strength += 20;
  if (password.match(/[0-9]/)) strength += 20;
  if (password.match(/[^a-zA-Z0-9]/)) strength += 20;
  return strength;
};

const LoginForm = ({ navigation }) => {
  const passwordInputRef = useRef(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const dispatch = useDispatch();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <LinearGradient colors={['#e0e0e0', '#ffffff']} style={styles.gradient}>
          <View style={styles.header}>
            <Image source={require('../img/twitter.png')} style={styles.welcomeImage} />
            <Text style={styles.welcomeText}>Welcome Back!</Text>
          </View>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              // Perform login action here
              console.log(values);
              // Simulate API call and dispatch login action
              setTimeout(() => {
                dispatch(login(values.email, 'dummy-token'));
                setSubmitting(false);
              }, 2000);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
              <Animatable.View animation="fadeInUp" duration={1500} style={styles.formContainer}>
                <Animatable.View animation="fadeInRight" duration={1000} delay={500}>
                  <TextInput
                    placeholder="Email"
                    style={[styles.input, isTyping ? styles.inputActive : null]}
                    onChangeText={(text) => {
                      handleChange('email')(text);
                      setIsTyping(true);
                    }}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    keyboardType="email-address"
                    returnKeyType="next"
                    onSubmitEditing={() => passwordInputRef.current.focus()}
                  />
                  {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
                </Animatable.View>
                <Animatable.View animation="fadeInRight" duration={1000} delay={700}>
                  <TextInput
                    placeholder="Password"
                    style={[styles.input, isTyping ? styles.inputActive : null]}
                    onChangeText={(text) => {
                      handleChange('password')(text);
                      setPasswordStrength(evaluatePasswordStrength(text));
                      setIsTyping(true);
                    }}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry
                    ref={passwordInputRef}
                    returnKeyType="done"
                    onSubmitEditing={handleSubmit}
                  />
                  {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}
                  <View style={styles.strengthContainer}>
                    <View style={[styles.strengthBar, { width: `${passwordStrength}%` }]} />
                  </View>
                  <Text style={styles.strengthText}>
                    {passwordStrength < 30 ? 'Weak' : passwordStrength < 60 ? 'Moderate' : 'Strong'}
                  </Text>
                </Animatable.View>
                <Animatable.View animation="fadeInUp" duration={1000} delay={900}>
                  <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
                  </TouchableOpacity>
                </Animatable.View>
                <Animatable.View animation="fadeInUp" duration={1000} delay={1100}>
                  <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.signupButtonText}>Sign Up</Text>
                  </TouchableOpacity>
                </Animatable.View>
              </Animatable.View>
            )}
          </Formik>
        </LinearGradient>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  gradient: {
    flex: 1,
    width: width,
    height: height,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  welcomeImage: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: (width * 0.3) / 2,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    height: height * 0.07,
    width: width * 0.9,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  inputActive: {
    borderColor: '#6C63FF',
    borderWidth: 2,
  },
  button: {
    height: height * 0.07,
    width: width * 0.9,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#6C63FF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  strengthContainer: {
    height: 5,
    width: '100%',
    backgroundColor: '#ddd',
    borderRadius: 2.5,
    marginTop: 10,
  },
  strengthBar: {
    height: '100%',
    backgroundColor: '#6C63FF',
    borderRadius: 2.5,
  },
  strengthText: {
    marginTop: 5,
    fontSize: 12,
    color: '#6C63FF',
  },
});

export default LoginForm;
