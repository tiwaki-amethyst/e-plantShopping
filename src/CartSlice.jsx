import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    // Add item to cart or increase quantity if item already exists
    addItem: (state, action) => {
      const { name, image, cost } = action.payload; // Destructure product details from the action payload
      
      // Check if the item already exists in the cart by comparing names
      const existingItem = state.items.find(item => item.name === name);
      
      if (existingItem) {
        // If item already exists in the cart, increase its quantity
        existingItem.quantity++;
      } else {
        // If item does not exist, add it to the cart with quantity 1
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },
    
    // Remove item from cart completely
    removeItem: (state, action) => {
      // Filter out the item with the matching name from the cart
      state.items = state.items.filter(item => item.name !== action.payload);
    },
    
    // Update the quantity of a specific item in the cart
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload; // Destructure the product name and new quantity from the action payload
      
      // Find the item in the cart that matches the given name
      const itemToUpdate = state.items.find(item => item.name === name);
      
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity; // If the item is found, update its quantity to the new value
      }
    },
  },
});

// Export the action creators for use in other components
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export the reducer as default for use in store.js
export default CartSlice.reducer;