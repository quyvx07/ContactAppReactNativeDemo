/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useContext, useRef, useState} from 'react';
import ContactDetailComponent from '../../../components/Home/ContactDetailComponent/index.js';
import {useRoute, useNavigation} from '@react-navigation/native';
import colors from '../../../assets/theme/colors.js';
import {ActivityIndicator, View, TouchableOpacity, Alert} from 'react-native';
import Icon from '../../../components/common/Icon/index.js';
import {GlobalContext} from '../../../context/Provider.js';
import deleteContact from '../../../context/actions/contacts/deleteContact.js';
import {CONTACT_LIST} from '../../../constants/routerName.js';
import editContact from '../../../context/actions/contacts/editContact.js';
import uploadImage from '../../../helpers/uploadImage.js';

const ContactDetail = () => {
  const {params: {item = {}} = {}} = useRoute();
  const {
    contactsDispatch,
    contactsState: {
      deleteContact: {isLoading},
    },
  } = useContext(GlobalContext);
  const {setOptions, navigate} = useNavigation();
  const sheetRef = useRef(null);
  const [localFile, setLocalFile] = useState(null);
  const [updatingImage, setUpdatingImage] = useState(false);
  const [uploadSucceeded, setUploadSucceeded] = useState(false);

  useEffect(() => {
    if (item) {
      setOptions({
        title: item.first_name + ' ' + item.last_name,
        headerRight: () => {
          return (
            <View style={{flexDirection: 'row', paddingRight: 10}}>
              <TouchableOpacity>
                <Icon
                  size={21}
                  color={colors.grey}
                  name={item.is_favorite ? 'star' : 'star-border'}
                  type="material"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    'Delete!',
                    'Are you sure you want to remove ' + item.first_name,
                    [
                      {
                        text: 'Cancel',
                        onPress: () => {},
                      },

                      {
                        text: 'OK',
                        onPress: () => {
                          deleteContact(item.id)(contactsDispatch)(() => {
                            navigate(CONTACT_LIST);
                          });
                        },
                      },
                    ],
                  );
                }}
                style={{paddingLeft: 10}}>
                {isLoading ? (
                  <ActivityIndicator size="small" color={colors.primary} />
                ) : (
                  <Icon
                    color={colors.grey}
                    size={21}
                    name="delete"
                    type="material"
                  />
                )}
              </TouchableOpacity>
            </View>
          );
        },
      });
    }
  }, [item, isLoading]);

  const closeSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.close();
    }
  };
  const openSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.open();
    }
  };

  const onFileSelected = image => {
    closeSheet();
    setLocalFile(image);
    setUpdatingImage(true);
    uploadImage(image)(url => {
      const {
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        country_code: phoneCode,
        is_favorite: isFavorite,
      } = item;
      editContact(
        {
          firstName,
          lastName,
          phoneNumber,
          isFavorite,
          phoneCode,
          contactPicture: url,
        },
        item.id,
      )(contactsDispatch)(item => {
        setUpdatingImage(false);
        setUploadSucceeded(true);
        // navigate(CONTACT_DETAIL, {item});
      });
    })(err => {
      console.log('err :>> ', err);
      setUpdatingImage(false);
    });
  };

  return (
    <ContactDetailComponent
      sheetRef={sheetRef}
      onFileSelected={onFileSelected}
      openSheet={openSheet}
      contact={item}
      localFile={localFile}
      uploadSucceeded={uploadSucceeded}
      updatingImage={updatingImage}
    />
  );
};

export default ContactDetail;
