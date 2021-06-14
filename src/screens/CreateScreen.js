import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, TextInput, Image, Button, ScrollView, Keyboard } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { THEME } from '../../theme'

export const CreateScreen = ({ navigation, route }) => {

  // меняем заголовок в useEffect, т.к. сюда попадаем из разных мест из AppMavigation
  useEffect(() => navigation.setOptions({ title: "Создать запись" }), []);

  let [text, setText] = useState("");

  const savePostHandler = () => {
    console.log('Crate post!!!');
  };

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Введите текст нового поста</Text>
          <TextInput style={styles.textArea}
            multiline={true}
            placeholder="Введите текст нового поста..."
            value={text}
            onChangeText={setText}
          />
          {/* temp component for photo */}
          <Image source={{ uri: 'https://static.coindesk.com/wp-content/uploads/2019/01/shutterstock_1012724596-860x430.jpg' }} style={styles.image} />
          <Button title="Создать пост" color={THEME.MAIN_COLOR} onPress={savePostHandler} />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  title: {
    fontFamily: 'open-bold',
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 10
  },
  textArea: {
    padding: 10,
    marginBottom: 10
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20
  }
});