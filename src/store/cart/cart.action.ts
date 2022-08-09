import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import {
  createAction,
  withMatcher,
  Action,
  ActionWithPayload,
} from "../../utils/reducer/reducer.utils";
import { CategoryItem } from "../category/category.types";

const addCartItem = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): CartItem[] => {
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

const removeCartItem = (
  cartItems: CartItem[],
  itemToRemove: CartItem
): CartItem[] => {
  // find the cart item to remove
  const itemFound = cartItems.find((item) => item.id === itemToRemove.id);

  // check if quantity is equal to 1, if it is remove that item from cart
  if (itemFound?.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id);
  }
  // return new array with modified cartItems/ new cart item
  return cartItems.map((cartItem) => {
    return cartItem.id === itemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem;
  });
};

const clearCartItem = (
  cartItems: CartItem[],
  itemToClear: CartItem
): CartItem[] => {
  return cartItems.filter((cartItem) => cartItem.id !== itemToClear.id);
};

export type SetIsCartOpen = Action<CART_ACTION_TYPES.TOGGLE_IS_CART_OPEN>;

export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>;

export const setIsCartOpen = withMatcher(
  (): SetIsCartOpen => createAction(CART_ACTION_TYPES.TOGGLE_IS_CART_OPEN)
);

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const addItemToCart = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return setCartItems(newCartItems);
};

export const removeItemFromCart = (
  cartItems: CartItem[],
  itemToRemove: CartItem
) => {
  const newCartItems = removeCartItem(cartItems, itemToRemove);
  return setCartItems(newCartItems);
};

export const clearItemFromCart = (
  cartItems: CartItem[],
  itemToClear: CartItem
) => {
  const newCartItems = clearCartItem(cartItems, itemToClear);
  return setCartItems(newCartItems);
};
