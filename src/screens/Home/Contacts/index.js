import React, {useEffect, useState, useContext, useRef} from 'react';
import {Text, TouchableOpacity, YellowBox} from 'react-native';
import Icon from '../../../components/common/Icon/index.js';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import ContactsComponent from '../../../components/Home/ContactsComponent/index.js';
import {GlobalContext} from '../../../context/Provider';
import getContacts from '../../../context/actions/contacts/getContacts.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CONTACT_DETAIL} from '../../../constants/routerName.js';
import {navigate} from '../../../navigations/RootNavigator.js';

const Contacts = () => {
  const [sortBy, setSortBy] = React.useState(null);
  const {setOptions, toggleDrawer} = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const contactsRef = useRef([]);

  const {
    contactsDispatch,
    contactsState: {
      getContacts: {data, isLoading, error},
    },
  } = useContext(GlobalContext);

  const getSettings = async () => {
    const sortPref = await AsyncStorage.getItem('sortBy');
    if (sortPref) {
      setSortBy(sortPref);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getSettings();
      return () => {};
    }, []),
  );
  useEffect(() => {
    getContacts()(contactsDispatch);
  }, []);
  useEffect(() => {
    const prev = contactsRef.current;

    contactsRef.current = data;

    const newList = contactsRef.current;
    if (newList.length - prev.length === 1) {
      const newContact = newList.find(
        item => !prev.map(i => i.id).includes(item.id),
      );
      navigate(CONTACT_DETAIL, {item: newContact});
    }
  }, [data.length]);

  useEffect(() => {
    setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            toggleDrawer();
          }}>
          <Icon type="material" style={{padding: 10}} size={25} name="menu" />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <ContactsComponent
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      data={data}
      isLoading={isLoading}
      error={error}
      sortBy={sortBy}
    />
  );
};
export default Contacts;
