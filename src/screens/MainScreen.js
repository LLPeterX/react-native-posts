import React, {useEffect} from 'react'
import { StyleSheet, View, Text, Button, FlatList } from 'react-native'
import { DATA } from '../data'
import { Post } from '../components/Post'
import {AppHeaderIcon} from '../components/AppHeaderIcon'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'

export const MainScreen = ({ navigation }) => {
  const openPostHandler = (post) => {
    navigation.navigate('Post', {postId: post.id, date: post.date});
  }
  
  useEffect(()=>navigation.setOptions({
    headerTtile: "Мой блог", 
    headerRight: ()=><HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item title="Сделать фото" iconName="camera" onPress={()=>console.log('Press photo')}/>
    </HeaderButtons>
  }),
  []);
  //navigation.setOptions({headerTtile: "Мой блог", headerRight: ()=><Text>ОГО!</Text>});

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