import { createSlice } from '@reduxjs/toolkit';

// Get the initial list of items from local storage
const getInitialItem = () => {
  const localItemList = window.localStorage.getItem('itemList');
  // If local storage contains items, parse and return them
  if (localItemList) {
    return JSON.parse(localItemList);
  }
  // If local storage is empty, initialize with an empty array
  window.localStorage.setItem('itemList', JSON.stringify([]));
  return [];
};

// Initial state for the Redux store
const initialValue = {
  filterStatus: 'all', // Default filter status
  itemList: getInitialItem(), // Initial item list obtained from local storage
};

export const itemSlice = createSlice({
  name: 'item',
  initialState: initialValue,
  // List of reducer functions
  reducers: {
    // Add an item to the list
    addItem: (state, action) => {
      state.itemList.push(action.payload);
      const itemList = window.localStorage.getItem('itemList');
      if (itemList) {
        const itemListArr = JSON.parse(itemList);
        itemListArr.push({ ...action.payload });
        window.localStorage.setItem('itemList', JSON.stringify(itemListArr));
      } else {
        window.localStorage.setItem(
          'itemList',
          JSON.stringify([{ ...action.payload }])
        );
      }
    },

    // Delete an item from the list
    deleteItem: (state, action) => {
      const itemList = window.localStorage.getItem('itemList');
      if (itemList) {
        const itemListArr = JSON.parse(itemList);
        itemListArr.forEach((item, index) => {
          if (item.id === action.payload) {
            itemListArr.splice(index, 1);
          }
        });
        // Update local storage and state with the modified item list
        window.localStorage.setItem('itemList', JSON.stringify(itemListArr));
        state.itemList = itemListArr;
      }
    },

    // Edit existing item's details
    editItem: (state, action) => {
      const itemList = window.localStorage.getItem('itemList');
      if (itemList) {
        const itemListArr = JSON.parse(itemList);
        itemListArr.forEach((item) => {
          if (item.id === action.payload.id) {
            item.name = action.payload.name;
            item.quantity = action.payload.quantity;
            item.status = action.payload.status;
            item.time = action.payload.time;
          }
        });
        // Update local storage and state with the modified item list
        window.localStorage.setItem('itemList', JSON.stringify(itemListArr));
        state.itemList = itemListArr;
      }
    },

    // Update the filter status
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },

    // Increment an item's quantity
    incrementItemQuantity: (state, action) => {
      const { payload: itemId } = action;
      const itemToUpdate = state.itemList.find((item) => item.id === itemId);

      if (itemToUpdate) {
        itemToUpdate.quantity += 1;

        // Update the item's quantity in local storage
        const itemList = JSON.parse(window.localStorage.getItem('itemList'));
        const updatedItemList = itemList.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
        window.localStorage.setItem(
          'itemList',
          JSON.stringify(updatedItemList)
        );
      }
    },

    // Decrement an item's quantity
    decrementItemQuantity: (state, action) => {
      const { payload: itemId } = action;
      const itemToUpdate = state.itemList.find((item) => item.id === itemId);

      if (itemToUpdate && itemToUpdate.quantity > 1) {
        itemToUpdate.quantity -= 1;

        // Update the item's quantity in local storage
        const itemList = JSON.parse(window.localStorage.getItem('itemList'));
        const updatedItemList = itemList.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        );
        window.localStorage.setItem(
          'itemList',
          JSON.stringify(updatedItemList)
        );
      }
    },
  },
});

// Export the reducer and action creators
export const {
  addItem,
  deleteItem,
  editItem,
  updateFilterStatus,
  incrementItemQuantity,
  decrementItemQuantity,
} = itemSlice.actions;

// Export the default reducer for use in the Redux store
export default itemSlice.reducer;
