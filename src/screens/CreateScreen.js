import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { StyleSheet, View, Text, TextInput, Button, ScrollView, Keyboard } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { THEME } from '../../theme'
import { createPost } from '../store/actions/post_actions'
import { PhotoPicker } from '../components/PhotoPicker';

export const CreateScreen = ({ navigation /*, route */ }) => {

  // меняем заголовок в useEffect, т.к. сюда попадаем из разных мест из AppMavigation
  //useEffect(() => navigation.setOptions({ title: "Создать запись" }), []);

  let [text, setText] = useState("");
  const imgRef = useRef();

  const dispatch = useDispatch();

  const savePostHandler = () => {
    // create new post object then call dispatch to save
    const post = {
      //id: Date.now().toString(),
      img: imgRef.current,
      text,
      date: new Date().toJSON(),
      booked: false
    }
    dispatch(createPost(post));
    navigation.navigate('Main');
  };

  const imagePickHandler = (uri) => {
    imgRef.current = uri
  };
  return (
    <ScrollView>
      {/* Скрыть клавиатуру при нажатии за пределами поля ввода */}
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Введите текст нового поста</Text>
          <TextInput style={styles.textArea}
            multiline={true}
            placeholder="Введите текст нового поста..."
            value={text}
            onChangeText={setText}
          />
          <PhotoPicker onPick={imagePickHandler} />
          <View style={styles.btn}>
            <Button
              title="Создать пост"
              color={THEME.MAIN_COLOR}
              onPress={savePostHandler}
              disabled={!text?.length && !imgRef.current}
            />
          </View>
          <View style={styles.btn}>
            <Button title="Отмена" color={THEME.INACTIVE_COLOR} onPress={() => navigation.goBack()} />
          </View>
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
  },
  btn: {
    marginBottom: 20
  }
});