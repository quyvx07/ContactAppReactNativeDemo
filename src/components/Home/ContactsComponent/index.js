/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import AppModal from '../../common/AppModal';
import Message from '../../common/Message';
import colors from '../../../assets/theme/colors.js';
import styles from './styles.js';
import Icon from '../../common/Icon/index.js';
import {useNavigation} from '@react-navigation/native';
import {CONTACT_DETAIL, CREATE_CONTACT} from '../../../constants/routerName';

const ContactsComponent = ({
  modalVisible,
  setModalVisible,
  isLoading,
  data,
  error,
  sortBy,
}) => {
  const {navigate} = useNavigation();
  const ListEmptyComponent = () => {
    return (
      <View style={{paddingVertical: 100, paddingHorizontal: 100}}>
        <Message info message="No contacts to show" />
      </View>
    );
  };

  const renderItem = ({item}) => {
    const {contact_picture, first_name, country_code, phone_number, last_name} =
      item;

    const renderLeftActions = (progress, dragX) => {
      return (
        <View style={[{flexDirection: 'row', paddingRight: 5}]}>
          <TouchableOpacity style={styles.actionButton} onPress={() => {}}>
            <Icon
              name="chat"
              type="material"
              size={s(22)}
              color={colors.white}
            />
            <Text style={styles.actionText} numberOfLines={1}>
              Chat
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => {}}>
            <Icon
              name={'heart-outline'}
              type="materialCommunity"
              size={22}
              color={colors.white}
            />
            <Text numberOfLines={1} style={styles.actionText}>
              Favorite
            </Text>
          </TouchableOpacity>
        </View>
      );
    };
    const {id} = item;
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          navigate(CONTACT_DETAIL, {item});
        }}>
        <View style={styles.item}>
          {contact_picture ? (
            <Image
              style={{width: 45, height: 45, borderRadius: 100}}
              source={{uri: contact_picture}}
            />
          ) : (
            <View
              style={{
                width: 45,
                height: 45,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.grey,
                borderRadius: 100,
              }}>
              <Text style={[styles.name, {color: colors.white}]}>
                {first_name[0]}
              </Text>
              <Text style={[styles.name, {color: colors.white}]}>
                {last_name[0]}
              </Text>
            </View>
          )}

          <View style={{paddingLeft: 20}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.name}>{first_name}</Text>

              <Text style={styles.name}> {last_name}</Text>
            </View>
            <Text
              style={
                styles.phoneNumber
              }>{`${country_code} ${phone_number}`}</Text>
          </View>
        </View>
        <Icon name="right" type="ant" size={18} color={colors.grey} />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={{backgroundColor: colors.white, flex: 1}}>
        <AppModal
          modalFooter={<></>}
          modalBody={<></>}
          title="My profile!"
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />

        {isLoading && (
          <View style={{paddingVertical: 100, paddingHorizontal: 100}}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        )}

        {!isLoading && (
          <FlatList
            renderItem={renderItem}
            data={
              sortBy
                ? data.sort((a, b) => {
                    if (sortBy === 'First Name') {
                      if (b.first_name > a.first_name) {
                        return -1;
                      } else {
                        return 1;
                      }
                    }
                    if (sortBy === 'Last Name') {
                      if (b.last_name > a.last_name) {
                        return -1;
                      } else {
                        return 1;
                      }
                    }
                  })
                : data
            }
            ItemSeparatorComponent={() => (
              <View style={{height: 0.5, backgroundColor: colors.grey}} />
            )}
            keyExtractor={item => String(item.id)}
            ListEmptyComponent={ListEmptyComponent}
            ListHeaderComponent={<></>}
            ListFooterComponent={<View style={{height: 150}} />}
          />
        )}
      </View>

      <TouchableOpacity
        style={styles.floatingActionButton}
        onPress={() => {
          navigate(CREATE_CONTACT);
        }}>
        <Icon name="plus" size={21} color={colors.white} />
      </TouchableOpacity>
    </>
  );
};

export default ContactsComponent;
