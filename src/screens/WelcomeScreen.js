import React, { useRef } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Animated, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const WelcomeScreen = ({ navigation }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageContainer}>
          <Image source={require('../img/bike.jpg')} style={styles.bikeImage} />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Welcome to BikeHub</Text>
          <Text style={styles.subtitle}>Explore the world of cycling with our community</Text>
        </View>
      </ScrollView>
      <TouchableWithoutFeedback onPressIn={handlePressIn}>
        <Animated.View style={[styles.buttonContainer, { transform: [{ scale: scaleValue }] }]}>
          <Button
            title="Get Started"
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
            onPressOut={handlePressOut}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  imageContainer: {
    width: '120%',
  
    marginBottom: 30,
    alignItems: 'center',
  },
  bikeImage: {
    width: '100%',
    height: height * 0.4,
    resizeMode: 'cover',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 22,
    marginBottom: 25,
    textAlign: 'center',
    color: '#666',
  },
  buttonContainer: {
    position: 'center',
    bottom: 40,
    width: '80%',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#4CAF50',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginLeft:30,
    elevation: 3,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 10,
    
  },
  buttonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default WelcomeScreen;
