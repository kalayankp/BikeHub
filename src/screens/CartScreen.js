import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, TextInput, Alert } from 'react-native';
import { BikeContext } from '../Context/BikeContext'; // Ensure the path is correct

const CartScreen = ({ navigation }) => {
  const { cart, addToCart, removeFromCart, calculateTotals, applyCoupon } = useContext(BikeContext);
  const [coupon, setCoupon] = useState('');
  const { subtotal, deliveryFee, discount, total } = calculateTotals();

  // Function to handle the removal of an item
  const handleRemoveItem = (id) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from the cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          onPress: () => removeFromCart(id),
        },
      ]
    );
  };

  // Function to handle increasing the quantity of an item
  const handleQuantityIncrease = (id) => {
    const item = cart.find(item => item.id === id);
    if (item) {
      const newQuantity = item.quantity + 1;
      addToCart({ ...item, quantity: newQuantity });
    }
  };

  // Function to handle decreasing the quantity of an item
  const handleQuantityDecrease = (id) => {
    const item = cart.find(item => item.id === id);
    if (item) {
      const newQuantity = item.quantity - 1;
      if (newQuantity <= 0) {
        handleRemoveItem(id);
      } else {
        addToCart({ ...item, quantity: newQuantity }, -1);
      }
    }
  };

  // Function to apply a coupon code
  const handleApplyCoupon = () => {
    const result = applyCoupon(coupon);
    if (result.success) {
      Alert.alert('Coupon Applied', `Coupon ${coupon} applied!`);
    } else {
      Alert.alert('Invalid Coupon', result.message);
    }
  };



  // Function to navigate to CheckoutScreen
  const handleProceedToCheckout = () => {
    navigation.navigate('Checkout', {
      cart: cart,
      subtotal: subtotal,
      deliveryFee: deliveryFee,
      discount: discount,
      total: total,
    });
  };
  // Render each cart item
  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.cartItemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <View style={styles.quantityControls}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleQuantityDecrease(item.id)}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleQuantityIncrease(item.id)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveItem(item.id)}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.cartTitle}>Your Cart</Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCartItem}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Your cart is empty</Text>
          </View>
        }
        contentContainerStyle={styles.cartList}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.couponContainer}>
        <TextInput
          style={styles.couponInput}
          placeholder="Enter coupon code"
          value={coupon}
          onChangeText={setCoupon}
        />
        <TouchableOpacity style={styles.applyCouponButton} onPress={handleApplyCoupon}>
          <Text style={styles.applyCouponButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.totalContainer}>
        <View style={styles.totalItem}>
          <Text style={styles.totalText}>Subtotal:</Text>
          <Text style={styles.totalValue}>${subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.totalItem}>
          <Text style={styles.totalText}>Delivery Fee:</Text>
          <Text style={styles.totalValue}>${deliveryFee.toFixed(2)}</Text>
        </View>
        <View style={styles.totalItem}>
          <Text style={styles.totalText}>Discount:</Text>
          <Text style={styles.totalValue}>-${discount.toFixed(2)}</Text>
        </View>
        <View style={styles.totalItem}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.checkoutButton} onPress={handleProceedToCheckout}>
        <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background
    padding: 16,
  },
  cartTitle: {
    color: '#fff', // White text
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cartList: {
    paddingBottom: 16,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1f1f1f', // Darker shade for cart items
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cartItemImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
  },
  itemName: {
    color: '#fff', // White text
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  quantityButton: {
    backgroundColor: '#007bff', // Blue background for buttons
    padding: 8,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  quantityButtonText: {
    color: '#fff', // White text
    fontSize: 16,
  },
  quantityText: {
    fontSize: 16,
    color: '#fff', // White text
    marginHorizontal: 8,
  },
  itemPrice: {
    color: '#fff', // White text
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: '#dc3545', // Red background for remove button
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff', // White text
    fontSize: 16,
  },
  couponContainer: {
    marginVertical: 16,
  },
  couponInput: {
    backgroundColor: 'grey', // Dark background
    color: '#fff', // White text
    padding: 10,
    borderRadius: 5,
    marginBottom: 8,
  },
  applyCouponButton: {
    backgroundColor: '#007bff', // Blue background
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  applyCouponButtonText: {
    color: '#fff', // White text
    fontSize: 16,
  },
  totalContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#1f1f1f', // Dark background
    borderRadius: 10,
  },
  totalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  totalText: {
    color: '#fff', // White text
    fontSize: 18,
  },
  totalValue: {
    color: '#fff', // White text
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#28a745', // Green background
    padding: 12,
    borderRadius: 5,
    marginTop: 16,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff', // White text
    fontSize: 18,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#fff', // White text
    fontSize: 18,
  },
});

export default CartScreen;
