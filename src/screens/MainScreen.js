import React, { useEffect } from 'react'
import { StyleSheet, View, FlatList, Text } from 'react-native'
import { Post } from '../components/Post'
import { useDispatch, useSelector } from 'react-redux'
import { loadPosts } from '../store/actions/post_actions'
import { THEME } from '../../theme'

export const MainScreen = ({ navigation, route }) => {
  const openPostHandler = (post) => {
    navigation.navigate('Post', { postId: post.id, date: post.date, booked: post.booked });
  }


  //const data = route.name === 'All' ? DATA : DATA.filter(d => d.booked);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPosts());
  }, [route.name]);

  const posts = useSelector((state) => route.name === 'All' ? state.post.allPosts : state.post.bookedPosts);
  if (posts.length === 0) {
    return <View style={styles.textWrapper}>
      <Text style={styles.text}>Список пуст</Text>
    </View>;
  }

  return (
    <View style={styles.wrapper}>
      <FlatList
        style={styles.list}
        data={posts}
        renderItem={({ item }) => <Post post={item} onOpen={openPostHandler} />}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 10
  },
  textWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  text: {
    fontFamily: 'open-bold',
    color: THEME.INACTIVE_COLOR
  }
});