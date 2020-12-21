import Axios from "axios";
import Cookie from "js-cookie";
import {
    USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS
} from "../constants";

const update = ({ userId, name, email, password }) => async (
 dispatch,
 getState
) => {
 const {
  userLogin: { userInfo },
 } = getState();
 dispatch({
  type: USER_UPDATE_REQUEST,
  payload: { userId, name, email, password },
 });
 try {
  const { data } = await Axios.put(
   "/api/users/" + userId,
   { name, email, password },
   {
    headers: {
     Authorization: "Bearer " + userInfo.token,
    },
   }
  );
  dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
  Cookie.set("userInfo", JSON.stringify(data));
 } catch (error) {
  dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
 }
};

const login = (email, password) => async (dispatch) => {
 dispatch({ type: USER_LOGIN_REQUEST, payload: { email, password } });
 try {
  const { data } = await Axios.post("/api/users/login", { email, password });
  dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  Cookie.set("userInfo", JSON.stringify(data));
 } catch (error) {
  dispatch({ type: USER_LOGIN_FAIL, payload: error.message });
 }
};

const register = (name, email, password) => async (dispatch) => {
 dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
 try {
  const { data } = await Axios.post("/api/users/register", {
   name,
   email,
   password,
  });
  dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
  Cookie.set("userInfo", JSON.stringify(data));
 } catch (error) {
  dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
 }
};

const logout = () => (dispatch) => {
 Cookie.remove("userInfo");
 dispatch({ type: USER_LOGOUT });
};
export { login, register, logout, update };

