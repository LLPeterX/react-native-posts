import React, {useEffect} from 'react'
import {StyleSheet, View, Text} from 'react-native'

export const CreateScreen = ({ navigation, route }) => {
  
  useEffect(()=>navigation.setOptions({title: "Создать запись"}),[]);

  return (
    <View style={styles.center}>
    <Text>Create Screen</Text>
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