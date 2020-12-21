import Cookie from 'js-cookie';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducer';
import {
 categoryDeleteReducer,
 categoryGetReducer,
 categoryListReducer,
 categorySaveReducer,
} from './reducers/categoryReducer';
import {
 orderCreateReducer,
 orderDeleteReducer,
 orderDetailsReducer,
 orderListReducer,
 orderPayReducer,
 userOrderListReducer,
} from './reducers/orderReducer';
import {
 productDeleteReducer,
 productDetailsReducer,
 productListReducer,
 productSaveReducer,
} from './reducers/productReducer';
import {
 userLoginReducer,
 userRegisterReducer,
 userUpdateReducer,
} from './reducers/userReducer';

const cartItems = Cookie.getJSON('cartItems') || [];
const shipping = Cookie.getJSON('shipping') || {};
const userInfo = Cookie.getJSON('userInfo') || null;

const initialState = {
 cart: { cartItems, shipping },
 userLogin: { userInfo },
};
const reducer = combineReducers({
 productList: productListReducer,
 productDetails: productDetailsReducer,
 cart: cartReducer,
 userLogin: userLoginReducer,
 userRegister: userRegisterReducer,
 productSave: productSaveReducer,
 productDelete: productDeleteReducer,
 orderCreate: orderCreateReducer,
 orderDetails: orderDetailsReducer,
 orderPay: orderPayReducer,
 userUpdate: userUpdateReducer,
 userOrderList: userOrderListReducer,
 orderList: orderListReducer,
 orderDelete: orderDeleteReducer,
 categoryGet: categoryGetReducer,
 categorySave: categorySaveReducer,
 categoryDelete: categoryDeleteReducer,
 categoryList: categoryListReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
 reducer,
 initialState,
 composeEnhancer(applyMiddleware(thunk))
);
export default store;
