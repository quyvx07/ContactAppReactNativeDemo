import React from 'react';
import {View, Text, Image, SafeAreaView, Alert} from 'react-native';
import styles from './styles';
import Container from '../../components/common/Container/index.js';
import Icon from '../../components/common/Icon/index.js';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SETTINGS} from '../../constants/routerName.js';
import logoutUser from '../../context/actions/auth/logoutUser.js';

const SideMenu = ({navigation, authDispatch}) => {
  const handleLogout = () => {
    navigation.toggleDrawer();
    Alert.alert('Logout!', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        onPress: () => {},
      },

      {
        text: 'OK',
        onPress: () => {
          logoutUser()(authDispatch);
        },
      },
    ]);
  };
  const menuItems = [
    {
      icon: <Icon type="fontisto" size={17} name="player-settings" />,
      name: 'Settings',
      onPress: () => {
        navigation.navigate(SETTINGS);
      },
    },
    {
      icon: <Icon type="material" size={17} name="logout" />,
      name: 'Logout',
      onPress: handleLogout,
    },
  ];
  return (
    <SafeAreaView>
      <Container style={styles.container}>
        <Image
          height={70}
          width={70}
          source={require('../../assets/images/logo.png')}
          style={styles.logoImage}
        />

        {menuItems.map(({name, icon, onPress}) => (
          <TouchableOpacity onPress={onPress} key={name} style={styles.item}>
            <View style={styles.icon}>{icon}</View>
            <Text style={styles.itemText}>{name}</Text>
          </TouchableOpacity>
        ))}
      </Container>
    </SafeAreaView>
  );
};

export default SideMenu;
