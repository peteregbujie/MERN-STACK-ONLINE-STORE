import {
 CART_ADD_ITEM,
 CART_REMOVE_ITEM,
 CART_SAVE_SHIPPING,
 CLEAR_CART,
} from '../constants';

const cartReducer = (state = { cartItems: [], shipping: {} }, action) => {
 const { type, payload } = action;
 switch (type) {
  case CART_ADD_ITEM:
   const productToAdd = payload;
   const product = state.cartItems.find(
    (item) => item.product === productToAdd.product
   );

   if (product) {
    return {
     cartItems: state.cartItems.map((item) =>
      item.product === product.product ? productToAdd : item
     ), // map will return a new array
    };
   }
   return { ...state, cartItems: [...state.cartItems, productToAdd] };

  case CART_REMOVE_ITEM:
   return {
    cartItems: state.cartItems.filter((item) => item.product !== payload),
   };

  case CLEAR_CART:
   return {
    ...state,
    cartItems: [],
   };

  case CART_SAVE_SHIPPING:
   return { ...state, shipping: { ...payload } };

  default:
   return state;
 }
};

export { cartReducer };
