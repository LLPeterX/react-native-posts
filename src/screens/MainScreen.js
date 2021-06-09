import React, { useEffect } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { DATA } from '../data'
import { Post } from '../components/Post'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

export const MainScreen = ({ navigation, route }) => {
  console.log('MainScreen props: ', route);
  const openPostHandler = (post) => {
    navigation.navigate('Post', { postId: post.id, date: post.date, booked: post.booked });
  }

  // поскольку navigation.setOptions() нелзя использовать напрямую (конфликт
  // с рендером MainScreen), используем его в хуке
  // Но не лучше ли юзать options в Stack.Screen в AppNavigation?
  useEffect(() => navigation.setOptions({
    title: route.params.isBooked ? "Избранное" : "Мой блог",
    headerRight: () =>
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item title="Сделать фото" iconName="camera" onPress={() => console.log('Press photo')} />
      </HeaderButtons>,
    headerLeft: () =>
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item title="Меню" iconName="menu" onPress={() => console.log('Press menu')} />
      </HeaderButtons>

  }),
    []);

  const data = route.params.isBooked ? DATA.filter(d => d.booked) : DATA;
  return (
    <View style={styles.wrapper}>
      <FlatList
        style={styles.list}
        data={data}
        renderItem={({ item }) => <Post post={item} onOpen={openPostHandler} />}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 10
  }
});