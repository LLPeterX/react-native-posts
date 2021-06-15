import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Image, Button, Alert, Platform } from 'react-native'
import * as ImagePicker from 'expo-image-picker'


export const PhotoPicker = ({ onPick }) => {
  const [image, setImage] = useState(null); // for image
  const [permissions, setPermissions] = useState({ library: true, camera: true }); // permissions

  // get permissions for midia library
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Нет прав', 'Нет прав на библиотеку изображений');
          setPermissions({ ...permissions, library: false });
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
          setPermissions({ ...permissions, camera: false });
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
  }; // getPhoto

  // берем картинку с камеры смартфона
  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
      onPick(result.uri);
    }
  }; // takePhoto


  // если нет каких-то празрешений, скрываем кнопки.
  // для отступа между кнопками оборачиваем их в <View> со стилями
  return (
    <View style={styles.wrapper}>
      {permissions.library && <View style={styles.btn}><Button title="Выбрать фото" onPress={getPhoto} /></View>}
      {permissions.camera && <View style={styles.btn}><Button title="Сделать фото" onPress={takePhoto} /></View>}
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