import React from 'react'
import { StyleSheet, View, Text, Image, Button, ScrollView, Alert } from 'react-native'
import { THEME } from '../../theme';
import { DATA } from '../data';

export const PostScreen = ({ navigation, route }) => {
  const postId = route.params.postId;
  const post = DATA.find(d => d.id === postId);

  const removeHandler = () => {
    Alert.alert("Удаление", "Вы хотите удалить пост?",
      [
        {
          text: "Да", style: 'destructive',
          onPress: () => console.log('Yes, delete it!')
        },
        { text: "Нет", style: 'cancel' }
      ],
      { cancelable: false }
    );
  }

  return (
    <ScrollView>
      <Image source={{ uri: post.img }} style={styles.image} />
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{post.text}</Text>
      </View>
      <Button title="Удалить" color={THEME.DANGER_COLOR} onPress={removeHandler} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: 200
  },
  textWrapper: {
    padding: 10
  },
  title: {
    fontFamily: 'open-regular'
  }
});