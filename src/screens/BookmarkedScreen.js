import React from 'react'
import {StyleSheet, View, Text} from 'react-native'

export const BookmarkedScreen = ({}) => {
  return (
    <View style={styles.center}>
    <Text>BookmarkedScreen</Text>
    </View>
  );

};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});