import React, {useContext, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {GlobalContext} from '../context/Provider.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigationRef} from './RootNavigator.js';
import SplashScreen from 'react-native-splash-screen';

const AppNavContainer = () => {
  const {
    authState: {isLoggedIn},
  } = useContext(GlobalContext);

  const [isAuthenticated, setIsAuthenticated] = React.useState(isLoggedIn);
  const [authLoaded, setAuthLoaded] = React.useState(false);

  const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem('user');

      if (user) {
        setAuthLoaded(true);

        setIsAuthenticated(true);
      } else {
        setAuthLoaded(true);

        setIsAuthenticated(false);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getUser();
  }, [isLoggedIn]);
  useEffect(() => {
    if (authLoaded) {
      SplashScreen.hide();
    }
  }, [authLoaded]);
  return (
    <>
      {authLoaded ? (
        <NavigationContainer ref={navigationRef}>
          {isAuthenticated ? <DrawerNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      ) : (
        <ActivityIndicator />
      )}
    </>
  );
};

export default AppNavContainer;
