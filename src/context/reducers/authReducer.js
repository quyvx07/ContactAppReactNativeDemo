import {
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_AUTH_STATE,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_USER,
} from '../../constants/actionTypes';

const authReducer = (state, {type, payload}) => {
  switch (type) {
    case REGISTER_LOADING:
    case LOGIN_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        data: payload,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: null,
        data: null,
      };
    case CLEAR_AUTH_STATE:
      return {
        ...state,
        isLoading: false,
        data: null,
        error: null,
      };
    default:
      return state;
  }
};
export default authReducer;
