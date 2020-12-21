import Axios from 'axios';
import {
    CATEGORY_DELETE_FAIL,
    CATEGORY_DELETE_REQUEST, CATEGORY_DELETE_SUCCESS,

    CATEGORY_SAVE_FAIL, CATEGORY_SAVE_REQUEST,
    CATEGORY_SAVE_SUCCESS, GET_CATEGORY_FAIL, GET_CATEGORY_REQUEST,
    GET_CATEGORY_SUCCESS
} from '../constants';

const getCategory = (categoryId) => async (dispatch) => {
    try {
     dispatch({ type: GET_CATEGORY_REQUEST, payload: categoryId});
     const { data } = await axios.get("/api/categories/" + categoryId);
     dispatch({ type: GET_CATEGORY_SUCCESS, payload: data });
    } catch (error) {
     dispatch({ type: GET_CATEGORY_FAIL, payload: error.message });
    }
   };

const deleteCategory = (categoryId) => async (dispatch, getState) => {
    try {
     const {
      userLogin: { userInfo },
     } = getState();
     dispatch({ type: CATEGORY_DELETE_REQUEST, payload: categoryId });
     const { data } = await axios.delete("/api/CATEGORYs/" + categoryId, {
      headers: {
       Authorization: "Bearer " + userInfo.token,
      },
     });
     dispatch({ type: CATEGORY_DELETE_SUCCESS, payload: data, success: true });
    } catch (error) {
     dispatch({ type: CATEGORY_DELETE_FAIL, payload: error.message });
    }
};
   

const saveCategory = (category) => async (dispatch, getState) => {
    try {
     dispatch({ type: CATEGORY_SAVE_REQUEST, payload: category});
     const {
      userLogin: { userInfo },
     } = getState();
     if (!category._id) {
      const { data } = await Axios.post("/api/categories", category, {
       headers: {
        Authorization: "Bearer " + userInfo.token,
       },
      });
      dispatch({ type: CATEGORY_SAVE_SUCCESS, payload: data });
     } else {
      const { data } = await Axios.put("/api/categories/" + category._id, category, {
       headers: {
        Authorization: "Bearer " + userInfo.token,
       },
      });
      dispatch({ type: CATEGORY_SAVE_SUCCESS, payload: data });
     }
    } catch (error) {
     dispatch({ type: CATEGORY_SAVE_FAIL, payload: error.message });
    }
};


const listCategories = () => async (dispatch) => {
    try {
     dispatch({ type: CATEGORY_LIST_REQUEST });
     const { data } = await Axios.get('/api/categories');
     dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
    } catch (error) {
     dispatch({ type: CATEGORY_LIST_FAIL, payload: error.message });
    }
   };
   
export { getCategory, saveCategory, deleteCategory, listCategories };

