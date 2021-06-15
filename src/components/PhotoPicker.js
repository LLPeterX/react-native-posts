import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Image, Button, Alert, Platform } from 'react-native'
import * as ImagePicker from 'expo-image-picker'


export const PhotoPicker = ({ onPick }) => {
  const [image, setImage] = useState(null); // for image
  const [media, setMedia] = useState({ library: true, camera: true }); // permissions

  // get permissions for midia library
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Нет прав', 'Нет прав на библиотеку изображений');
          setMedia({ ...media, library: false });
        }
      }
    })();
  }, []);

  // get permissions for camera
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Нет прав', 'нет прав на камеру');
          setMedia({ ...media, camera: false });
        }
      }
    })();
  }, []);

  // берем картинку из библиотки
  const getPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
      onPick(result.uri);
    }
    console.log(result);
  }; // getPhoto

  // берем картинку с камеры смартфона
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
      onPick(result.uri);
    }
  }; // takePhoto


  // если нет каких-то празрешений, каринку скрываем.
  // для отступа оборачиваем в <View></View>
  return (
    <View style={styles.wrapper}>
      {media.library && <View style={styles.btn}><Button title="Выбрать фото" onPress={getPhoto} /></View>}
      {media.camera && <View style={styles.btn}><Button title="Сделать фото" onPress={takePhoto} /></View>}
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
  },
  btn: {
    marginBottom: 15,
    marginHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center'
  }

});