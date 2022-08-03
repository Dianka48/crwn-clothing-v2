import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
  // find if cartItems containes productToAdd
  const itemFound = cartItems.find((item) => item.id === productToAdd.id);

  // if found, increment quantity
  if (itemFound) {
    return cartItems.map((cartItem) => {
      return cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem;
    });
  }
  // return new array with modified cartItems/ new cart item
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, itemToRemove) => {
  // find the cart item to remove
  const itemFound = cartItems.find((item) => item.id === itemToRemove.id);

  // check if quantity is equal to 1, if it is remove that item from cart
  if (itemFound.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id);
  }
  // return new array with modified cartItems/ new cart item
  return cartItems.map((cartItem) => {
    return cartItem.id === itemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem;
  });
};

const clearCartItem = (cartItems, itemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== itemToClear.id);
};

export const setIsCartOpen = () =>
  createAction(CART_ACTION_TYPES.TOGGLE_IS_CART_OPEN);

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, itemToRemove) => {
  const newCartItems = removeCartItem(cartItems, itemToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, itemToClear) => {
  const newCartItems = clearCartItem(cartItems, itemToClear);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
