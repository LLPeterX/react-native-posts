import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { StyleSheet, View, Text, TextInput, Image, Button, ScrollView, Keyboard } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { THEME } from '../../theme'
import { createPost } from '../store/actions/post_actions'

export const CreateScreen = ({ navigation, route }) => {

  // меняем заголовок в useEffect, т.к. сюда попадаем из разных мест из AppMavigation
  useEffect(() => navigation.setOptions({ title: "Создать запись" }), []);

  let [text, setText] = useState("");

  const dispatch = useDispatch();

  // temp var for simplify code
  const img = 'https://cdn.londonandpartners.com/visit/general-london/areas/river/76709-640x360-houses-of-parliament-and-london-eye-on-thames-from-above-640.jpg';

  const savePostHandler = () => {
    const post = {
      id: Date.now().toString(),
      img,
      text,
      date: new Date().toJSON(),
      booked: false
    }
    console.log('Crate post!!!');
    dispatch(createPost(post));
    navigation.goBack();
  };

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Введите текст нового поста</Text>
          <TextInput style={styles.textArea}
            multiline={true}
            placeholder="Введите текст нового поста..."
            value={text}
            onChangeText={setText}
          />
          {/* temp component for photo */}
          <Image source={{ uri: img }} style={styles.image} />
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