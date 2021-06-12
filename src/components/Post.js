import React from 'react'
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'

export const Post = ({ post, onOpen }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => onOpen(post)}
    >
      <View style={styles.post}>
        <ImageBackground source={{ uri: post.img }} style={styles.image}>
          <View style={styles.textWrapper}>
            <Text style={styles.title}>#{post.id} {new Date(post.date).toLocaleDateString()}</Text>
          </View>

        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  post: {
    marginBottom: 15,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: 200
  },
  textWrapper: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 5,
    alignItems: 'center',
    width: '100%'
  },
  title: {
    color: '#fff',
    fontFamily: 'open-regular'
  }
});