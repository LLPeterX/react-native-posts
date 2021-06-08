import React from 'react'
import { StyleSheet, View, Text, Button, FlatList } from 'react-native'
import { DATA } from '../data'
import { Post } from '../components/Post'

export const MainScreen = ({ navigation }) => {
  const openPostHandler = (post) => {
    navigation.navigate('Post', {postId: post.id, date: post.date});
  }

  return (
    <View style={styles.wrapper}>
      <FlatList
        style={styles.list}
        data={DATA}
        renderItem={({ item }) => <Post post={item} onOpen={openPostHandler}/>}
        keyExtractor={item => item.id.toString()}
      />
      {/* <Button title="go to post" onPress={() => navigation.navigate('Post')} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 10
  }
});