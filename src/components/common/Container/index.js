import React from 'react';
import {ScrollView, View} from 'react-native';
import styles from './styles.js';
import {SafeAreaView} from 'react-native-safe-area-context';

const Container = ({style, children}) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={[styles.wapper, style]}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Container;
