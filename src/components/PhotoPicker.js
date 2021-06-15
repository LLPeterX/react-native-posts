import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Image, Button, Alert, Platform } from 'react-native'
import * as ImagePicker from 'expo-image-picker'


export const PhotoPicker = ({ }) => {
  // below must be inside PhotoPicker():
  const [image, setImage] = useState(null);
  const [media, setMedia] = useState({library: true, camera: true});

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Нет прав','Нет прав на библиотеку изображений');
          setMedia({...media, library: false});
        }
      }
    })();
  }, []);

  // для камеры
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Нет прав','нет прав на камеру');
          setMedia({...media, camera: false}); 
        }
      }
    })();
  }, []);

  const getPhoto = async () => {
    console.log('call getPhoto()');
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log('getPhoto() presult=', result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  }; // getPhoto

  const takePhoto = async () => {
    console.log('call takePhoto()');
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    console.log('takePhoto() presult=', result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  }; // takePhoto


  return (
    <View style={styles.wrapper}>
      {media.library && <Button title="Выбрать фото" onPress={getPhoto} />}
      {media.camera && <Button title="Сделать фото" onPress={takePhoto} />}
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );

};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10
  }
});