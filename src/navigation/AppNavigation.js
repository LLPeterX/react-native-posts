import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AboutScreen } from '../screens/AboutScreen';
import { MainScreen } from '../screens/MainScreen';
import { PostScreen } from '../screens/PostScreen';
import { THEME } from '../../theme'
import { Platform } from 'react-native'


export const AppNavigation = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main"
      screenOptions={
        {
          headerStyle: {
            backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff'
          },
          headerTintColor: Platform.OS === 'android' ? THEME.HEADER_TEXT_COLOR : THEME.MAIN_COLOR
        }
      }
      >
        {/* <Stack.Screen name="Main" component={MainScreen} options={{title: Constants.manifest.name}}/> */}
        <Stack.Screen name="Main" component={MainScreen} options={{title: "React Native demo: Blog"}}/>
        <Stack.Screen name="About" component={AboutScreen} options={{title: "О программе"}}/>
        {/* <Stack.Screen name="Post" component={PostScreen} options={{title: "Запись"}}/> */}
        <Stack.Screen name="Post" component={PostScreen} options={({route})=>({ title: `Пост #${route.params.postId} - ${new Date(route.params.date).toLocaleDateString()}` })}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

