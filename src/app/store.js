import { configureStore } from '@reduxjs/toolkit';
import itemReducer from '../slices/itemSlice';

// Create the Redux store with the configured reducers
export const store = configureStore({
  reducer: {
    // Define the 'item' slice reducer, which manages the state related to items.
    item: itemReducer,
  },
});
