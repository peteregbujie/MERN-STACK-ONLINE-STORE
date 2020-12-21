import Axios from 'axios';
import Cookie from 'js-cookie';
import {
 CART_ADD_ITEM,
 CART_REMOVE_ITEM,
 CART_SAVE_SHIPPING,
 CLEAR_CART,
} from '../constants';

const inOneHour = 1 / 24;

const addToCart = (productId, quantity) => async (dispatch, getState) => {
 try {
  const { data } = await Axios.get('/api/products/' + productId);
  dispatch({
   type: CART_ADD_ITEM,
   payload: {
    product: data._id,
    name: data.name,
    image: data.image,
    price: data.price,
    quantity,
   },
  });
  const {
   cart: { cartItems },
  } = getState();
  Cookie.set('cartItems', JSON.stringify(cartItems));
 } catch (error) {}
};
const removeFromCart = (productId) => (dispatch, getState) => {
 dispatch({ type: CART_REMOVE_ITEM, payload: productId });

 const {
  cart: { cartItems },
 } = getState();
 Cookie.set('cartItems', JSON.stringify(cartItems), { expires: inOneHour });
};

const clearCart = () => (dispatch, getState) => {
 dispatch({ type: CLEAR_CART });

 const {
  cart: { cartItems },
 } = getState();
 Cookie.set('cartItems', JSON.stringify(cartItems));
};

const saveShippingDetails = (data) => (dispatch, getState) => {
 dispatch({ type: CART_SAVE_SHIPPING, payload: data });
 const {
  cart: { shipping },
 } = getState();
 Cookie.set('shipping', JSON.stringify(shipping), { expires: inOneHour });
};

export { addToCart, removeFromCart, clearCart, saveShippingDetails };
