import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';

export const BikeContext = createContext();

export const BikeProvider = ({ children }) => {
  const [bikes, setBikes] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [coupon, setCoupon] = useState('');

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setBikes([
        {
          id: 1,
          type: 'Road',
          name: 'High-Speed Road Bike',
          image: require('../img/moter.png'),
          price: 999.99,
          details: 'A high-speed bike for racing.',
          specifications: ['Speed: 30 mph', 'Weight: 15 lbs'],
        },
        {
          id: 2,
          type: 'Mountain',
          name: 'All-Terrain Mountain Bike',
          image: require('../img/moter.png'),
          price: 899.99,
          details: 'A durable bike for rough terrains.',
          specifications: ['Speed: 20 mph', 'Weight: 20 lbs'],
        },
        {
          id: 3,
          type: 'Hybrid',
          name: 'Versatile Hybrid Bike',
          image: require('../img/bike.jpg'),
          price: 799.99,
          details: 'A versatile bike for both road and off-road riding.',
          specifications: ['Speed: 25 mph', 'Weight: 18 lbs'],
        },
        {
          id: 4,
          type: 'Electric',
          name: 'Eco-Friendly Electric Bike',
          image: require('../img/moter.png'),
          price: 1299.99,
          details: 'An eco-friendly bike with electric assistance.',
          specifications: ['Speed: 28 mph', 'Weight: 40 lbs', 'Battery: 500 Wh'],
        },
        {
          id: 5,
          type: 'BMX',
          name: 'Freestyle BMX Bike',
          image: require('../img/bike.jpg'),
          price: 699.99,
          details: 'A bike designed for freestyle and stunts.',
          specifications: ['Speed: 15 mph', 'Weight: 12 lbs'],
        },
        {
          id: 6,
          type: 'Road',
          name: 'High-Speed Road Bike',
          image: require('../img/bike.jpg'),
          price: 999.99,
          details: 'A high-speed bike for racing.',
          specifications: ['Speed: 30 mph', 'Weight: 15 lbs'],
        },
        {
          id: 7,
          type: 'Mountain',
          name: 'All-Terrain Mountain Bike',
          image: require('../img/bike.jpg'),
          price: 899.99,
          details: 'A durable bike for rough terrains.',
          specifications: ['Speed: 20 mph', 'Weight: 20 lbs'],
        },
        {
          id: 8,
          type: 'Hybrid',
          name: 'Versatile Hybrid Bike',
          image: require('../img/bike.jpg'),
          price: 799.99,
          details: 'A versatile bike for both road and off-road riding.',
          specifications: ['Speed: 25 mph', 'Weight: 18 lbs'],
        },
        {
          id: 9,
          type: 'Electric',
          name: 'Eco-Friendly Electric Bike',
          image: require('../img/bike.jpg'),
          price: 1299.99,
          details: 'An eco-friendly bike with electric assistance.',
          specifications: ['Speed: 28 mph', 'Weight: 40 lbs', 'Battery: 500 Wh'],
        },
        {
          id: 10,
          type: 'BMX',
          name: 'Freestyle BMX Bike',
          image: require('../img/bike.jpg'),
          price: 699.99,
          details: 'A bike designed for freestyle and stunts.',
          specifications: ['Speed: 15 mph', 'Weight: 12 lbs'],
        },
        {
          id: 11,
          type: 'BMX',
          name: 'Freestyle BMX Bike',
          image: require('../img/bike.jpg'),
          price: 699.99,
          details: 'A bike designed for freestyle and stunts.',
          specifications: ['Speed: 15 mph', 'Weight: 12 lbs'],
        },
        {
          id: 12,
          type: 'Road',
          name: 'High-Speed Road Bike',
          image: require('../img/bike.jpg'),
          price: 999.99,
          details: 'A high-speed bike for racing.',
          specifications: ['Speed: 30 mph', 'Weight: 15 lbs'],
        },
        {
          id: 13,
          type: 'Mountain',
          name: 'All-Terrain Mountain Bike',
          image: require('../img/bike.jpg'),
          price: 899.99,
          details: 'A durable bike for rough terrains.',
          specifications: ['Speed: 20 mph', 'Weight: 20 lbs'],
        },
        {
          id: 14,
          type: 'Hybrid',
          name: 'Versatile Hybrid Bike',
          image: require('../img/bike.jpg'),
          price: 799.99,
          details: 'A versatile bike for both road and off-road riding.',
          specifications: ['Speed: 25 mph', 'Weight: 18 lbs'],
        },
        {
          id: 15,
          type: 'Electric',
          name: 'Eco-Friendly Electric Bike',
          image: require('../img/bike.jpg'),
          price: 1299.99,
          details: 'An eco-friendly bike with electric assistance.',
          specifications: ['Speed: 28 mph', 'Weight: 40 lbs', 'Battery: 500 Wh'],
        },
        {
          id: 1,
          type: 'BMX',
          name: 'Freestyle BMX Bike',
          image: require('../img/bike.jpg'),
          price: 699.99,
          details: 'A bike designed for freestyle and stunts.',
          specifications: ['Speed: 15 mph', 'Weight: 12 lbs'],
        },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  const addToCart = (bike, quantity = 1) => {
    setCart((prevCart) => {
      const existingBike = prevCart.find((item) => item.id === bike.id);
      if (existingBike) {
        return prevCart.map((item) =>
          item.id === bike.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...bike, quantity }];
    });
    Alert.alert('Bike added to cart');
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const applyCoupon = (code) => {
    const validCoupons = {
      'DISCOUNT10': 0.10,
      'DISCOUNT20': 0.20,
    };

    if (validCoupons[code]) {
      const discountAmount = validCoupons[code];
      setCoupon(code);
      return { success: true, message: `Coupon ${code} applied!` };
    } else {
      return { success: false, message: 'Invalid coupon code.' };
    }
  };

  const calculateTotals = () => {
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const deliveryFee = 20; // Example delivery fee
    const discount = coupon === 'DISCOUNT10' ? subtotal * 0.10 : coupon === 'DISCOUNT20' ? subtotal * 0.20 : 0;
    const total = subtotal + deliveryFee - discount;
    return { subtotal, deliveryFee, discount, total };
  };

  return (
    <BikeContext.Provider
      value={{
        bikes,
        cart,
        loading,
        addToCart,
        removeFromCart,
        applyCoupon,
        calculateTotals,
      }}
    >
      {children}
    </BikeContext.Provider>
  );
};
