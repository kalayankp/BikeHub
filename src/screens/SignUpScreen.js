import React, { useRef, useState } from 'react';
import { View, TextInput, Text, ActivityIndicator, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Dimensions, StyleSheet, Platform, StatusBar, Image } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const signUpValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
});

const SignUp = ({ navigation }) => {
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <LinearGradient colors={['#e0e0e0', '#ffffff']} style={styles.gradient}>
          <View style={styles.header}>
            <Image source={require('../img/twitter.png')} style={styles.welcomeImage} />
            <Text style={styles.welcomeText}>Create Account</Text>
          </View>
          <Formik
            initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
            validationSchema={signUpValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              // Perform sign-up action here
              console.log(values);
              // Simulate API call and navigate to Home
              setTimeout(() => {
                navigation.navigate('Home');
                setSubmitting(false);
              }, 2000);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
              <Animatable.View animation="fadeInUp" duration={1500} style={styles.formContainer}>
                <Animatable.View animation="fadeInRight" duration={1000} delay={500}>
                  <TextInput
                    placeholder="Name"
                    style={[styles.input, isTyping ? styles.inputActive : null]}
                    onChangeText={(text) => {
                      handleChange('name')(text);
                      setIsTyping(true);
                    }}
                    onBlur={handleBlur('name')}
                    value={values.name}
                    returnKeyType="next"
                    onSubmitEditing={() => passwordInputRef.current.focus()}
                  />
                  {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}
                </Animatable.View>
                <Animatable.View animation="fadeInRight" duration={1000} delay={700}>
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
                <Animatable.View animation="fadeInRight" duration={1000} delay={900}>
                  <TextInput
                    placeholder="Password"
                    style={[styles.input, isTyping ? styles.inputActive : null]}
                    onChangeText={(text) => {
                      handleChange('password')(text);
                      setIsTyping(true);
                    }}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry
                    ref={passwordInputRef}
                    returnKeyType="next"
                    onSubmitEditing={() => confirmPasswordInputRef.current.focus()}
                  />
                  {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}
                </Animatable.View>
                <Animatable.View animation="fadeInRight" duration={1000} delay={1100}>
                  <TextInput
                    placeholder="Confirm Password"
                    style={[styles.input, isTyping ? styles.inputActive : null]}
                    onChangeText={(text) => {
                      handleChange('confirmPassword')(text);
                      setIsTyping(true);
                    }}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    secureTextEntry
                    ref={confirmPasswordInputRef}
                    returnKeyType="done"
                    onSubmitEditing={handleSubmit}
                  />
                  {touched.confirmPassword && errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}
                </Animatable.View>
                <Animatable.View animation="fadeInUp" duration={1000} delay={1300}>
                  <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign Up</Text>}
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
    resizeMode: 'cover',
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  formContainer: {
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  inputActive: {
    borderColor: '#007BFF',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SignUp;
