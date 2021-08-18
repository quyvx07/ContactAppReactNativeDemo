import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Contacts from '../screens/Home/Contacts';
import ContactDetail from '../screens/Home/ContactDetail';
import CreateContact from '../screens/Home/CreateContact';
import Settings from '../screens/Home/Settings';
import {
  CONTACT_LIST,
  CONTACT_DETAIL,
  SETTINGS,
  CREATE_CONTACT,
  LOGOUT,
} from '../constants/routerName.js';
import Logout from '../screens/Auth/Logout/index.js';

const HomeNavigator = () => {
  const HomeStack = createStackNavigator();
  return (
    <HomeStack.Navigator initialRouteName={CONTACT_LIST}>
      <HomeStack.Screen name={CONTACT_LIST} component={Contacts} />
      <HomeStack.Screen name={CONTACT_DETAIL} component={ContactDetail} />
      <HomeStack.Screen name={CREATE_CONTACT} component={CreateContact} />
      <HomeStack.Screen name={SETTINGS} component={Settings} />
      <HomeStack.Screen name={LOGOUT} component={Logout} />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
