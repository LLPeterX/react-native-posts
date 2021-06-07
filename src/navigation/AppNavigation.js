import React from 'react'
import Constants from 'expo-constants'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AboutScreen } from '../screens/AboutScreen';
import { MainScreen } from '../screens/MainScreen';
import { PostScreen } from '../screens/PostScreen';


export const AppNavigation = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        {/* <Stack.Screen name="Main" component={MainScreen} options={{title: Constants.manifest.name}}/> */}
        <Stack.Screen name="Main" component={MainScreen} options={{title: "React Native demo: Blog"}}/>
        <Stack.Screen name="About" component={AboutScreen} options={{title: "О программе"}}/>
        <Stack.Screen name="Post" component={PostScreen} options={{title: "Запись"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

