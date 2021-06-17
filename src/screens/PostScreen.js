import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  ScrollView,
  Alert,
} from "react-native";
import { THEME } from "../../theme";
import { AppHeaderIcon } from "../components/AppHeaderIcon";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { deletePost, toggleBooked } from "../store/actions/post_actions";

export const PostScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const postId = route.params.postId;
  //const post = DATA.find(d => d.id === postId);
  const post = useSelector((state) =>
    state.post.allPosts.find((p) => p.id === postId)
  );

  // локальный стейт для иконки избранного (booked)
  // тут засада - post.booked может быть не определен
  let [isBooked, setIsBooked] = useState(!!post?.booked);

  // const toggleBookedHandler = () => {
  //   dispatch(toggleBooked(post));
  //   setIsBooked(!isBooked);
  // };
  const toggleBookedHandler = useCallback(() => {
    dispatch(toggleBooked(post));
    setIsBooked(!isBooked);
  }, [dispatch, post]);

  // заголовок с кнопкой "Избранное". По клику на кнопку вызываем переключение сердечка
  const updateHeader = (isBooked) => {
    const iconName = isBooked ? "heart" : "heart-outline";
    const iconColor = isBooked ? "#bd4695" : THEME.MAIN_COLOR;
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item
            title="Favorite"
            iconName={iconName}
            onPress={toggleBookedHandler}
            iconColor={iconColor}
            color={iconColor}
          />
        </HeaderButtons>
      ),
    });
  };

  // обновить шапку с иконкой при изменении isBooked
  useEffect(() => updateHeader(isBooked), [isBooked]);

  const removeHandler = () => {
    Alert.alert(
      "Удаление",
      "Вы хотите удалить пост?",
      [
        {
          text: "Да",
          style: "destructive",
          onPress: () => {
            navigation.navigate("Main");
            dispatch(deletePost(postId));
          },
        },
        { text: "Нет", style: "cancel" },
      ],
      { cancelable: false }
    );
  }; // removeHandler

  // const removeHandler = () => {
  //   console.log('removeHandler!');
  //   navigation.navigate('Main');
  //   dispatch(deletePost(postId));

  // }

  // тут нужна проверка post на null. Именно перед return
  // т.к. при удалении поста вызывается снова PostScreen
  if (!post) {
    return null;
  }

  return (
    <ScrollView>
      <Image source={{ uri: post.img }} style={styles.image} />
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{post.text}</Text>
      </View>
      <Button
        title="Удалить"
        color={THEME.DANGER_COLOR}
        onPress={removeHandler}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
  },
  textWrapper: {
    padding: 10,
  },
  title: {
    fontFamily: "open-regular",
  },
});
