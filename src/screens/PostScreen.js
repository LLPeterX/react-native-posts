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

  const getIconName = (isBooked) =>  isBooked ? "heart-outline" : "heart";
  
  const [iconName, setIconName] = useState(getIconName(post.booked));

  const bookedHandler = () => {
    console.log('handler before: ', post.id, post.booked);
    dispatch(toggleBooked(postId));
    post.booked = !post.booked;
    setIconName(getIconName(post.booked));
    updateHeader(getIconName(post.booked));
    console.log('handler after: ', post.id, post.booked);
    
  };

  const updateHeader = (iconName) => {
    console.log('call updateHeader with',iconName);
    navigation.setOptions({
      headerRight: () =>
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item title="Favorite"
            iconName={iconName}
            onPress={bookedHandler}
            />
        </HeaderButtons>
  
    })
  };

  useEffect(() => updateHeader(iconName),
    [route]);

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