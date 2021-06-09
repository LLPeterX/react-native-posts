import React, { useEffect } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { DATA } from '../data'
import { Post } from '../components/Post'

export const MainScreen = ({ navigation, route }) => {
  const openPostHandler = (post) => {
    navigation.navigate('Post', { postId: post.id, date: post.date, booked: post.booked });
  }

  // route.name берем из Tab.Screen
  const data = route.name === 'All' ? DATA : DATA.filter(d => d.booked);

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