import {
 ORDER_CREATE_FAIL,
 ORDER_CREATE_REQUEST,
 ORDER_CREATE_SUCCESS,
 ORDER_DELETE_FAIL,
 ORDER_DELETE_REQUEST,
 ORDER_DELETE_SUCCESS,
 ORDER_DETAILS_FAIL,
 ORDER_DETAILS_REQUEST,
 ORDER_DETAILS_SUCCESS,
 ORDER_LIST_FAIL,
 ORDER_LIST_REQUEST,
 ORDER_LIST_SUCCESS,
 ORDER_PAY_FAIL,
 ORDER_PAY_REQUEST,
 ORDER_PAY_SUCCESS,
 USER_ORDER_LIST_FAIL,
 USER_ORDER_LIST_REQUEST,
 USER_ORDER_LIST_SUCCESS,
} from '../constants';

const orderCreateReducer = (state = {}, action) => {
 switch (action.type) {
  case ORDER_CREATE_REQUEST:
   return { loading: true };
  case ORDER_CREATE_SUCCESS:
   return {
    loading: false,
    order: action.payload,
    success: true,
   };
  case ORDER_CREATE_FAIL:
   return { loading: false, error: action.payload };
  default:
   return state;
 }
};

const orderDetailsReducer = (
 state = { order: { orderItems: [], payment: {}, shipping: {} } },
 action
) => {
 switch (action.type) {
  case ORDER_DETAILS_REQUEST:
   return { loading: true };
  case ORDER_DETAILS_SUCCESS:
   return { order: action.payload, loading: false, error: false };
  case ORDER_DETAILS_FAIL:
   return { loading: false, error: action.payload };
  default:
   return state;
 }
};

const userOrderListReducer = (state = { orders: [] }, action) => {
 switch (action.type) {
  case USER_ORDER_LIST_REQUEST:
   return { loading: true };
  case USER_ORDER_LIST_SUCCESS:
   return {
    orders: action.payload,
    loading: false,
    error: false,
   };
  case USER_ORDER_LIST_FAIL:
   return { loading: false, error: action.payload };
  default:
   return state;
 }
};

const orderListReducer = (state = { orders: [] }, action) => {
 switch (action.type) {
  case ORDER_LIST_REQUEST:
   return { loading: true };
  case ORDER_LIST_SUCCESS:
   return {
    orders: action.payload,
    loading: false,
    error: false,
   };
  case ORDER_LIST_FAIL:
   return { loading: false, error: action.payload };
  default:
   return state;
 }
};

const orderPayReducer = (
 state = { order: { orderItems: [], shipping: {}, payment: {} } },
 action
) => {
 switch (action.type) {
  case ORDER_PAY_REQUEST:
   return { loading: true };
  case ORDER_PAY_SUCCESS:
   return { order: action.payload, loading: false, error: false };
  case ORDER_PAY_FAIL:
   return { loading: false, error: action.payload };
  default:
   return state;
 }
};

const orderDeleteReducer = (
 state = { order: { orderItems: [], shipping: {}, payment: {} } },
 action
) => {
 switch (action.type) {
  case ORDER_DELETE_REQUEST:
   return { loading: true };
  case ORDER_DELETE_SUCCESS:
   return { order: action.payload, loading: false, error: false };
  case ORDER_DELETE_FAIL:
   return { loading: false, error: action.payload };
  default:
   return state;
 }
};

export {
 orderCreateReducer,
 orderListReducer,
 orderDetailsReducer,
 userOrderListReducer,
 orderDeleteReducer,
 orderPayReducer,
};
