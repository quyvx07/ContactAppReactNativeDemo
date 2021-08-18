import {LOGOUT_USER} from '../../../constants/actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default () => dispatch => {
  dispatch({
    type: LOGOUT_USER,
  });
  AsyncStorage.removeItem('token');
  AsyncStorage.removeItem('user');
};
