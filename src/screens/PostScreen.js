import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Image, Button, ScrollView, Alert } from 'react-native'
import { THEME } from '../../theme';
import { DATA } from '../data';
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useDispatch, useSelector } from 'react-redux'
import { toggleBooked } from '../store/actions/post_actions'

export const PostScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const postId = route.params.postId;
  const post = DATA.find(d => d.id === postId);

  // local state for heart color (booked)
  let [isBooked, setIsBooked] = useState(post.booked)

  const toggleBookedHandler = () => {
    dispatch(toggleBooked(postId));
    setIsBooked(!isBooked);
  };

  // заголовок с кнопкой "Избранное". По клику на кнопку вызываем переключение сердечка
  const updateHeader = (isBooked) => {
    const iconName = isBooked ? "heart" : "heart-outline";
    const iconColor = isBooked ? '#bd4695' : THEME.MAIN_COLOR;
    navigation.setOptions({
      headerRight: () =>
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item title="Favorite"
            iconName={iconName}
            onPress={toggleBookedHandler}
            iconColor = {iconColor}
            color = {iconColor}
            />
        </HeaderButtons>
  
    })
  };

  
  useEffect(() => updateHeader(isBooked),  [isBooked]);
  
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