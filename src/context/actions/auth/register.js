import axiosInstance from '../../../helpers/axiosInterceptor.js';
import {
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_AUTH_STATE,
} from '../../../constants/actionTypes';

export const clearAuthState = () => dispatch => {
  dispatch({
    type: CLEAR_AUTH_STATE,
  });
};

export default ({
    email,
    password,
    userName: username,
    firstName: first_name,
    lastName: last_name,
  }) =>
  dispatch =>
  onSuccess => {
    dispatch({
      type: REGISTER_LOADING,
    });

    axiosInstance
      .post('auth/register', {
        email,
        password,
        username,
        first_name,
        last_name,
      })
      .then(response => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: response.data,
        });
        onSuccess(response.data);
      })
      .catch(error => {
        dispatch({
          type: REGISTER_FAIL,
          payload: error.response ? error.response.data : {error: 'Something went wrong, try again'},
        });
      });
  };
