import axiosInstance from '../../../helpers/axiosInterceptor.js';
import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_AUTH_STATE,
} from '../../../constants/actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const clearAuthState = () => dispatch => {
  dispatch({
    type: CLEAR_AUTH_STATE,
  });
};

export default ({password, userName: username}) =>
  dispatch => {
    dispatch({
      type: LOGIN_LOADING,
    });

    axiosInstance
      .post('auth/login', {
        password,
        username,
      })
      .then(response => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: response.data,
        });
        AsyncStorage.setItem('token', response.data.token);
        AsyncStorage.setItem('user', JSON.stringify(response.data.user));
      })
      .catch(error => {
        dispatch({
          type: LOGIN_FAIL,
          payload: error.response
            ? error.response.data
            : {error: 'Something went wrong, try again'},
        });
      });
  };
