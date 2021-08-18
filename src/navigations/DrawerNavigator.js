import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeNavigator from './HomeNavigator';
import {HOME_NAVIGATOR} from '../constants/routerName.js';
import SideMenu from './SideMenu/index.js';
import {GlobalContext} from '../context/Provider.js';

const getDrawerContent = (navigation, authDispatch) => {
  return <SideMenu navigation={navigation} authDispatch={authDispatch} />;
};

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();

  const {authDispatch} = React.useContext(GlobalContext);
  return (
    <Drawer.Navigator
      drawerType="slide"
      drawerContent={({navigation}) =>
        getDrawerContent(navigation, authDispatch)
      }>
      <Drawer.Screen name={HOME_NAVIGATOR} component={HomeNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
