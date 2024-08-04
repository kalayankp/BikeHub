import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Animated, Easing } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { cart, subtotal, deliveryFee, discount, total } = route.params || {}; // Handle undefined params

  const [shippingAddress, setShippingAddress] = useState({
    address: '1703, Single Business Tower, Dubai', // Placeholder
    phone: '+971 4 457 7824', // Placeholder
    email: 'info@klipit.co', // Placeholder
  });

  const animation = useRef(new Animated.Value(1)).current;

  const handlePlaceOrder = () => {
    // Start the animation
    Animated.timing(animation, {
      toValue: 0.9,
      duration: 150,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start(() => {
      // Reverse the animation
      Animated.timing(animation, {
        toValue: 1,
        duration: 150,
        easing: Easing.bounce,
        useNativeDriver: true,
      }).start(() => {
        // Simulate placing order and sending to backend
        console.log('Order placed with details:', shippingAddress);
        Alert.alert('Success', 'Order placed successfully!');
        navigation.navigate('Order'); // Ensure 'Order' is a valid route
      });
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Order Summary</Text>
        {cart?.length === 0 ? (
          <Text style={styles.summaryText}>No items in cart</Text>
        ) : (
          <View>
            {cart.map(item => (
              <View key={item.id} style={styles.item}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
                <Text style={styles.itemPrice}>Price: ${item.price.toFixed(2)}</Text>
                <Text style={styles.itemTotal}>Total: ${(item.price * item.quantity).toFixed(2)}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Order Totals</Text>
        <View style={styles.totalItem}>
          <Text style={styles.totalText}>Subtotal:</Text>
          <Text style={styles.totalValue}>${subtotal?.toFixed(2)}</Text>
        </View>
        <View style={styles.totalItem}>
          <Text style={styles.totalText}>Delivery Fee:</Text>
          <Text style={styles.totalValue}>${deliveryFee?.toFixed(2)}</Text>
        </View>
        <View style={styles.totalItem}>
          <Text style={styles.totalText}>Discount:</Text>
          <Text style={styles.totalValue}>-${discount?.toFixed(2)}</Text>
        </View>
        <View style={styles.totalItem}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalValue}>${total?.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.address}>
        <Text style={styles.addressTitle}>Shipping Address</Text>
        <View style={styles.addressItem}>
          <Text style={styles.addressLabel}>Address:</Text>
          <Text style={styles.addressValue}>{shippingAddress.address}</Text>
        </View>
        <View style={styles.addressItem}>
          <Text style={styles.addressLabel}>Phone:</Text>
          <Text style={styles.addressValue}>{shippingAddress.phone}</Text>
        </View>
        <View style={styles.addressItem}>
          <Text style={styles.addressLabel}>Email:</Text>
          <Text style={styles.addressValue}>{shippingAddress.email}</Text>
        </View>
      </View>

      <Animated.View style={[styles.buttonContainer, { transform: [{ scale: animation }] }]}>
        <TouchableOpacity style={styles.button} onPress={handlePlaceOrder}>
          <Text style={styles.buttonText}>Place Order</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  summary: {
    backgroundColor: '#1f1f1f',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  summaryText: {
    color: '#fff',
  },
  item: {
    marginBottom: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  itemQuantity: {
    fontSize: 16,
    color: '#fff',
  },
  itemPrice: {
    fontSize: 16,
    color: '#fff',
  },
  itemTotal: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 4,
  },
  address: {
    backgroundColor: '#1f1f1f',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  addressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  addressItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  addressLabel: {
    fontSize: 16,
    color: '#fff',
  },
  addressValue: {
    fontSize: 16,
    color: '#fff',
  },
  totalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  totalText: {
    fontSize: 18,
    color: '#fff',
  },
  totalValue: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonContainer: {
    backgroundColor: '#28a745', // Green background
    padding: 12,
    borderRadius: 25,
    marginTop: 50,
    alignItems: 'center',
  },
  button: {
    color: '#fff', // White text
    fontSize: 18,
    textAlign: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default CheckoutScreen;
