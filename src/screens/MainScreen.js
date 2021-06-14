import React, { useEffect } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { Post } from '../components/Post'
import { useDispatch, useSelector } from 'react-redux'
import { loadPosts } from '../store/actions/post_actions';

export const MainScreen = ({ navigation, route }) => {
  const openPostHandler = (post) => {
    navigation.navigate('Post', { postId: post.id, date: post.date, booked: post.booked });
  }


  //const data = route.name === 'All' ? DATA : DATA.filter(d => d.booked);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPosts());
   }, [route.name]);

  const posts = useSelector((state)=>route.name === 'All' ? state.post.allPosts : state.post.bookedPosts);

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
  }
});