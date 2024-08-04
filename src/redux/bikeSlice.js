// src/redux/bikeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bikes: [
    {
      id: 1,
      name: 'Electric Bike',
      description: 'A fast electric bike',
      price: 1200,
      image: 'https://via.placeholder.com/100',
      category: 'Electric',
    },
    {
      id: 2,
      name: 'Road Bike',
      description: 'A sleek road bike',
      price: 800,
      image: 'https://via.placeholder.com/100',
      category: 'Road',
    },
    {
      id: 3,
      name: 'Mountain Bike',
      description: 'A rugged mountain bike',
      price: 950,
      image: 'https://via.placeholder.com/100',
      category: 'Mountain',
    },
    {
      id: 4,
      name: 'Helmet',
      description: 'A protective helmet',
      price: 50,
      image: 'https://via.placeholder.com/100',
      category: 'Helmet',
    },
  ],
  status: 'idle',
  error: null,
};

const bikeSlice = createSlice({
  name: 'bikes',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const bikeId = action.payload;
      const bike = state.bikes.find((bike) => bike.id === bikeId);
      if (bike) {
        bike.inCart = true;
      }
    },
  },
});

export const { addToCart } = bikeSlice.actions;

export default bikeSlice.reducer;
