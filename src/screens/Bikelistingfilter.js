import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { BikeContext } from '../Context/BikeContext';

const Bikelistingfilter = () => {
  const { addToCart, removeFromCart, cart } = useContext(BikeContext);
  const route = useRoute();
  const bike = route.params.bike;
  const [selectedTab, setSelectedTab] = useState('Description'); // State to track the selected tab
  const isInCart = cart.some(item => item.id === bike.id); // Check if the bike is in the cart

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleCartToggle = () => {
    if (isInCart) {
      removeFromCart(bike.id);
    } else {
      addToCart(bike);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={bike.image} style={styles.bikeImage} />
      <Text style={styles.bikeName}>{bike.name}</Text>
      <Text style={styles.bikePrice}>${bike.price.toFixed(2)}</Text>

      {/* Tab Buttons */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'Description' && styles.selectedTab]}
          onPress={() => handleTabChange('Description')}
        >
          <Text style={styles.tabText}>Description</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'Specifications' && styles.selectedTab]}
          onPress={() => handleTabChange('Specifications')}
        >
          <Text style={styles.tabText}>Specifications</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      <View style={styles.tabContent}>
        {selectedTab === 'Description' ? (
          <View>
            <Text style={styles.bikeDetailsText}>{bike.details}</Text>
            {bike.extraDescription && (
              <Text style={styles.extraDescriptionText}>{bike.extraDescription}</Text>
            )}
          </View>
        ) : (
          <View>
            <Text style={styles.specificationTitle}>Specifications:</Text>
            {/* Check if specifications exist and is an array before mapping */}
            {Array.isArray(bike.specifications) && bike.specifications.length > 0 ? (
              bike.specifications.map((spec, index) => (
                <Text key={index} style={styles.specificationText}>
                  {spec}
                </Text>
              ))
            ) : (
              <Text style={styles.specificationText}>High-Speed Road Bike </Text>
              
            )}
            {bike.extraSpecifications && (
              <View style={styles.extraSpecificationsContainer}>
                <Text style={styles.extraSpecificationsTitle}>Additional Specifications:</Text>
                {bike.extraSpecifications.map((spec, index) => (
                  <Text key={index} style={styles.specificationText}>
                    {spec}
                  </Text>
                ))}
              </View>
            )}
          </View>
        )}
      </View>

      {/* Tab Description Text */}
      <Text style={styles.tabDescription}>
        {selectedTab === 'Description'
          ? 'Here you can find detailed information about the bike, including its features, performance, and other relevant details.Here you can find the technical specifications of the bike, including its dimensions, weight, and other technical details.'
          : 'Here you can find the technical specifications of the bike, including its dimensions, weight, and other technical details.Here you can find the technical specifications of the bike, including its dimensions, weight, and other technical details.'}
      </Text>

      {/* Amount Display */}
      <View style={styles.amountContainer}>
        <Text style={styles.amountText}>Total: ${bike.price.toFixed(2)}</Text>
      </View>

      {/* Cart Button */}
      <TouchableOpacity
        style={[styles.cartButton, isInCart ? styles.removeFromCartButton : styles.addToCartButton]}
        onPress={handleCartToggle}
      >
        <Text style={styles.cartButtonText}>{isInCart ? 'Remove from Cart' : 'Add to Cart'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#121212',
    padding: 16,
  },
  bikeImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 16,
  },
  bikeName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  bikePrice: {
    fontSize: 20,
    color: '#007bff',
    marginBottom: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#007bff',
    marginRight: 5,
  },
  selectedTab: {
    backgroundColor: '#007bff',
  },
  tabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tabContent: {
    marginVertical: 10,
    width: '100%',
  },
  bikeDetailsText: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
  },
  extraDescriptionText: {
    fontSize: 16,
    color: '#aaa',
    marginTop: 10,
    textAlign: 'center',
  },
  specificationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  specificationText: {
    fontSize: 16,
    color: '#ccc',
  },
  extraSpecificationsContainer: {
    marginTop: 10,
  },
  extraSpecificationsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  tabDescription: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginVertical: 10,
  },
  amountContainer: {
    position: 'absolute',
    bottom: 50,
    left: 16,
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  cartButton: {
    position: 'absolute',
    bottom: 16,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    elevation: 5,
    marginBottom: 16,
  },
  addToCartButton: {
    backgroundColor: '#007bff',
    right: 16,
  },
  removeFromCartButton: {
    backgroundColor: '#ff4c4c',
    right: 16,
  },
  cartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Bikelistingfilter;

