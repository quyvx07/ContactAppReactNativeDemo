import React from 'react';
import {View, ActivityIndicator, Text} from 'react-native';
import styles from './styles.js';
import colors from '../../../assets/theme/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

const CustomButton = ({
  title,
  secondary,
  primary,
  danger,
  disabled,
  loading,
  onPress,
  style,
}) => {
  const getBgColor = () => {
    if (disabled) {
      return colors.grey;
    }
    if (primary) {
      return colors.primary;
    }
    if (danger) {
      return colors.danger;
    }

    if (secondary) {
      return colors.secondary;
    }
  };
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.wrapper, {backgroundColor: getBgColor()}, style]}>
      <View style={[styles.loaderSection]}>
        {loading && (
          <ActivityIndicator
            color={primary ? colors.secondary : colors.primary}
          />
        )}
        {title && (
          <Text
            style={{
              color: disabled ? colors.black : colors.white,
              paddingLeft: loading ? 6 : 0,
            }}>
            {loading ? 'Please wait...' : title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
