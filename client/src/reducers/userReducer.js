import {
 USER_LOGIN_FAIL,
 USER_LOGIN_REQUEST,
 USER_LOGIN_SUCCESS,
 USER_LOGOUT,
 USER_REGISTER_FAIL,
 USER_REGISTER_REQUEST,
 USER_REGISTER_SUCCESS,
 USER_UPDATE_FAIL,
 USER_UPDATE_REQUEST,
 USER_UPDATE_SUCCESS,
} from '../constants';

function userLoginReducer(state = {}, action) {
 switch (action.type) {
  case USER_LOGIN_REQUEST:
   return { loading: true };
  case USER_LOGIN_SUCCESS:
   return { userInfo: action.payload, loading: false, error: false };
  case USER_LOGIN_FAIL:
   return { loading: false, error: action.payload };
  case USER_LOGOUT:
   return {};
  default:
   return state;
 }
}

function userUpdateReducer(state = {}, action) {
 switch (action.type) {
  case USER_UPDATE_REQUEST:
   return { loading: true };
  case USER_UPDATE_SUCCESS:
   return { userInfo: action.payload, loading: false, error: false };
  case USER_UPDATE_FAIL:
   return { loading: false, error: action.payload };
  default:
   return state;
 }
}

function userRegisterReducer(state = {}, action) {
 switch (action.type) {
  case USER_REGISTER_REQUEST:
   return { loading: true };
  case USER_REGISTER_SUCCESS:
   return {
    userInfo: action.payload,
    loading: false,
    error: false,
   };
  case USER_REGISTER_FAIL:
   return { loading: false, error: action.payload };
  default:
   return state;
 }
}

export { userRegisterReducer, userLoginReducer, userUpdateReducer };
