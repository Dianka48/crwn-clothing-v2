import { CartItem } from "./cart.types";
import { setCartItems, setIsCartOpen } from "./cart.action";
import { AnyAction } from "redux";

export type CartState = {
  readonly isCartOpen: Boolean;
  readonly cartItems: CartItem[];
};

export const CART_INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer = (
  state = CART_INITIAL_STATE,
  action: AnyAction
): CartState => {
  if (setIsCartOpen.match(action)) {
    return { ...state, isCartOpen: !state.isCartOpen };
  }

  if (setCartItems.match(action)) {
    return { ...state, cartItems: action.payload };
  }

  return state;

  // switch (action.type) {
  //   case CART_ACTION_TYPES.SET_CART_ITEMS:
  //     return { ...state, cartItems: action.payload };
  //   case CART_ACTION_TYPES.TOGGLE_IS_CART_OPEN:
  //     return { ...state, isCartOpen: !state.isCartOpen };
  //   default:
  //     return state;
  // }
};
