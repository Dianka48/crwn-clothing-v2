import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartTotal: 0,
});

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  TOGGLE_IS_CART_OPEN: "TOGGLE_IS_CART_OPEN",
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { ...state, ...payload };
    case CART_ACTION_TYPES.TOGGLE_IS_CART_OPEN:
      return { ...state, isCartOpen: !state.isCartOpen };
    default:
      throw new Error(`Unandled type of ${type} in cartReducer`);
  }
};

const CartProvider = ({ children }) => {
  // const [isCartOpen, setIsCartOpen] = useState(false);
  // const [cartItems, setCartItems] = useState([]);
  // const [cartCount, setCartCount] = useState(0);
  // const [cartTotal, setCartTotal] = useState(0);
  const [{ cartItems, cartCount, cartTotal, isCartOpen }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  // useEffect(() => {
  //   const newCartCount = cartItems.reduce(
  //     (total, cartItem) => total + cartItem.quantity,
  //     0
  //   );
  //   setCartCount(newCartCount);
  // }, [cartItems]);

  // useEffect(() => {
  //   const newCartTotal = cartItems.reduce(
  //     (total, cartItem) => total + cartItem.quantity * cartItem.price,
  //     0
  //   );
  //   setCartTotal(newCartTotal);
  // }, [cartItems]);

  const updateCartItems = (newCartItems) => {
    /*
    generate newCartTotal
    generate newCartCount
    dispatch new action with payload = {
      newCartItems,
      newCartTotal,
      newCartCount
    }
    */
    const newCartCount = newCartItems.reduce((acc, el) => acc + el.quantity, 0);
    const newCartTotal = newCartItems.reduce(
      (acc, el) => acc + el.price * el.quantity,
      0
    );
    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
      })
    );
  };

  const setIsCartOpen = () => {
    dispatch(createAction(CART_ACTION_TYPES.TOGGLE_IS_CART_OPEN));
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItems(newCartItems);
  };

  const removeItemFromCart = (itemToRemove) => {
    const newCartItems = removeCartItem(cartItems, itemToRemove);
    updateCartItems(newCartItems);
  };

  const clearItemFromCart = (itemToClear) => {
    const newCartItems = clearCartItem(cartItems, itemToClear);
    updateCartItems(newCartItems);
  };

  // const cartCount = cartItems.reduce((acc, el) => acc + el.quantity, 0);
  // const cartTotal = cartItems.reduce(
  //   (acc, el) => acc + el.price * el.quantity,
  //   0
  // );

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    removeItemFromCart,
    clearItemFromCart,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
