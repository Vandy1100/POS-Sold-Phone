// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { id, name, price, image, discount,cost } = action.payload;
      let itemIndex = state.cartItems.findIndex((item) => item.id === id);
      if (itemIndex !== -1) {
        // Item already exists in cart, increase quantity
        state.cartItems[itemIndex].quantity++;
      } else {
        // Item does not exist in cart, add it
        state.cartItems.push({ id, name, price, discount, image,cost, quantity: 1 });
        itemIndex = state.cartItems.length - 1; // Update itemIndex to point to the newly added item
      }

      // Calculate total price for the item
      const totalPriceForItem = price * state.cartItems[itemIndex].quantity;
      state.cartItems[itemIndex].totalPrice = totalPriceForItem;

      // Calculate total price for all items in the cart
      state.totalPrice = state.cartItems.reduce((acc, item) => {
        return acc + (item.totalPrice || 0);
      }, 0);

      //set discount
      const discountedPrice = (price * discount) / 100;
      state.cartItems[itemIndex].discountPercentage = discount
      const totalDiscount =
        discountedPrice * state.cartItems[itemIndex].quantity;
      state.cartItems[itemIndex].discount = totalDiscount;
      state.discount = state.cartItems.reduce((acc, item) => {
        return acc + (item.discount || 0);
      }, 0);

//set final price for all items in the
    const finalPrice = totalPriceForItem - totalDiscount
    state.cartItems[itemIndex].itemOfOne = finalPrice
    state.itemOfOne = state.cartItems.map((item,index)=>{
      return item.itemOfOne;
    })
    state.cartItems[itemIndex].finalPrice = finalPrice
    state.finalPrice = state.cartItems.reduce((acc, item) => {
      console.log("acc", finalPrice);
      console.log("discount", item.finalPrice);
      return acc + (item.finalPrice || 0);
    }, 0);
    },

    incrementQuantity(state, action) {
      const { id } = action.payload;
      const itemIndex = state.cartItems.findIndex((item) => item.id === id);
      if (itemIndex !== -1) {
        state.cartItems[itemIndex].quantity++;
        // Recalculate total price for the ite
        state.cartItems[itemIndex].totalPrice = state.cartItems[itemIndex].price * state.cartItems[itemIndex].quantity;
        // Recalculate total discount for the item
        state.cartItems[itemIndex].discount = (state.cartItems[itemIndex].price * state.cartItems[itemIndex].discountPercentage / 100) * state.cartItems[itemIndex].quantity;
        // Recalculate final price for the item
        state.cartItems[itemIndex].finalPrice = state.cartItems[itemIndex].totalPrice - state.cartItems[itemIndex].discount;
      }
      // Recalculate total price for all items in the cart
      state.totalPrice = state.cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
      // Recalculate total discount for all items in the cart
      state.discount = state.cartItems.reduce((acc, item) => {
        return acc + (item.discount || 0);
      }, 0);      // Recalculate final price for all items in the cart
      state.itemOfOne = state.cartItems.map((item,index)=>{
        return item.finalPrice;
      })
      state.finalPrice = state.cartItems.reduce((acc, item) => acc + item.finalPrice, 0);
    },
    decrementQuantity(state, action) {
      const { id } = action.payload;
      const itemIndex = state.cartItems.findIndex((item) => item.id === id);
      if (itemIndex !== -1) {
        if (state.cartItems[itemIndex].quantity > 1) {
          state.cartItems[itemIndex].quantity--;
          // Recalculate total price for the item
          state.cartItems[itemIndex].totalPrice = state.cartItems[itemIndex].price * state.cartItems[itemIndex].quantity;
          // Recalculate total discount for the item
          state.cartItems[itemIndex].discount = (state.cartItems[itemIndex].price * state.cartItems[itemIndex].discountPercentage / 100) * state.cartItems[itemIndex].quantity;
          // Recalculate final price for the item
          state.cartItems[itemIndex].finalPrice = state.cartItems[itemIndex].totalPrice - state.cartItems[itemIndex].discount;
        } else {
          state.cartItems.splice(itemIndex, 1);
        }
        // Recalculate total price for all items in the cart
        state.totalPrice = state.cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
        // Recalculate total discount for all items in the cart
        state.discount = state.cartItems.reduce((acc, item) => acc + item.discount, 0);
        state.itemOfOne = state.cartItems.map((item,index)=>{
          return item.finalPrice;
        })
        // Recalculate final price for all items in the cart
        state.finalPrice = state.cartItems.reduce((acc, item) => acc + item.finalPrice, 0);
      }
    },
    removeFromCart(state, action) {
      const { id } = action.payload;
      const removedItem = state.cartItems.find((item) => item.id === id);
      if (removedItem) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        state.discount -= removedItem.discount || 0; // Subtract the discount of the removed item from the total discount
        state.totalPrice -= removedItem.totalPrice || 0;
        state.finalPrice -= removedItem.finalPrice || 0;
        state.itemOfOne-= removedItem.itemOfOne || 0;
        // state.totalPrice = state.cartItems.reduce((acc, item) => {
        //   return acc - (item.totalPrice || 0);
        // }, 0);
      }
    },
    removeAllCart(state, action) {
      state.cartItems = [];
      state.discount = 0;
      state.totalPrice = 0;
      state.finalPrice = 0;
      state.itemOfOne = 0;
    },
    
    // Add other reducers as needed
  },
});
export const selectCartItems = (state) => state.cart.cartItems;
export const selectTotalPrice = (state) => state.cart.totalPrice;
export const selectTotalDiscount = (state) => state.cart.discount;
export const selectFinalPrice = (state) => state.cart.finalPrice;
export const selectItemOfOne = (state) => state.cart.itemOfOne;


export const { addToCart, removeFromCart,incrementQuantity,decrementQuantity,removeAllCart } = cartSlice.actions;
export default cartSlice.reducer;
