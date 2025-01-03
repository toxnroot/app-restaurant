// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/app/cartSlice';
import darkModeReducer from '@/app/darkModeSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    darkMode: darkModeReducer,
  },
});

export default store;
