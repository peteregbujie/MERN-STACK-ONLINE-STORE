import {
 CATEGORY_DELETE_FAIL,
 CATEGORY_DELETE_REQUEST,
 CATEGORY_DELETE_SUCCESS,
 CATEGORY_LIST_FAIL,
 CATEGORY_LIST_REQUEST,
 CATEGORY_LIST_SUCCESS,
 CATEGORY_SAVE_FAIL,
 CATEGORY_SAVE_REQUEST,
 CATEGORY_SAVE_SUCCESS,
 GET_CATEGORY_FAIL,
 GET_CATEGORY_REQUEST,
 GET_CATEGORY_SUCCESS,
} from '../constants';

function categoryGetReducer(state = { category: {} }, action) {
 switch (action.type) {
  case GET_CATEGORY_REQUEST:
   return { loading: true };
  case GET_CATEGORY_SUCCESS:
   return { category: action.payload, loading: false };
  case GET_CATEGORY_FAIL:
   return { loading: false, error: action.payload };
  default:
   return state;
 }
}

function categorySaveReducer(state = { category: {} }, action) {
 switch (action.type) {
  case CATEGORY_SAVE_REQUEST:
   return { loading: true };
  case CATEGORY_SAVE_SUCCESS:
   return {
    category: action.payload,
    loading: false,
    success: true,
    error: false,
   };
  case CATEGORY_SAVE_FAIL:
   return { loading: false, error: action.payload };
  default:
   return state;
 }
}

function categoryDeleteReducer(state = { category: {} }, action) {
 switch (action.type) {
  case CATEGORY_DELETE_REQUEST:
   return { loading: true };
  case CATEGORY_DELETE_SUCCESS:
   return {
    product: action.payload,
    loading: false,
    success: true,
    error: false,
   };
  case CATEGORY_DELETE_FAIL:
   return { loading: false, error: action.payload };
  default:
   return state;
 }
}

const categoryListReducer = (state = { categories: [] }, action) => {
 switch (action.type) {
  case CATEGORY_LIST_REQUEST:
   return { loading: true };
  case CATEGORY_LIST_SUCCESS:
   return {
    categories: action.payload,
    loading: false,
    error: false,
   };
  case CATEGORY_LIST_FAIL:
   return { loading: false, error: action.payload };
  default:
   return state;
 }
};

export {
 categoryDeleteReducer,
 categoryListReducer,
 categorySaveReducer,
 categoryGetReducer,
};
