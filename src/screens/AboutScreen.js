import React, {useEffect} from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Constants from 'expo-constants'
import { THEME } from '../../theme';

export const AboutScreen = ({navigation }) => {
  useEffect(()=>navigation.setOptions({title: "О программе"}),[]);
  return (
    <View style={styles.wrapper}>
      <Text style={styles.version}>Версия {Constants.manifest.version}</Text>
      <Text style={styles.header}>О программе</Text>
      
      <Text style={styles.text}>Это приложение для ведения собственного блога.</Text>
      <Text style={styles.text}>Слева от заголовка находится кнопка, по нажатию на которую открывается основное меню.
        Также это меню открывается сайпом слева направо основного экрана</Text>
      <Text style={styles.text}>Справа от загооловка - кнопка добавления нового поста с возможностью сделать фото с камеры</Text>
    </View >
  );

};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontFamily: 'open-regular',
    fontSize: 16,
    padding: 10
  },
  header: {
    fontFamily: 'open-bold',
    fontSize: 16,
    marginBottom: 20,
    marginTop: 10
  },
  version: {
    color: THEME.INACTIVE_COLOR
  },
  text: {
    marginBottom: 15
  }
});