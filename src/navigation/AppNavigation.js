import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AboutScreen } from '../screens/AboutScreen';
import { MainScreen } from '../screens/MainScreen';
import { PostScreen } from '../screens/PostScreen';
import { THEME } from '../../theme'
import { Platform } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const AppNavigation = () => {

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
        <Stack.Screen name="Main" component={BottomNavigator} options={{ title: "React Native demo: Blog" }} />
        <Stack.Screen name="About" component={AboutScreen} options={{ title: "О программе" }} />
        <Stack.Screen name="Post" component={PostScreen} options={({ route }) => ({ title: `Пост #${route.params.postId} - ${new Date(route.params.date).toLocaleDateString()}` })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const BottomNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="All">
      <Tab.Screen
        name="All"
        component={MainScreen}
        options={
          {
            tabBarLabel: "Все",
            tabBarIcon: () => (<Ionicons name="albums" size={24} color={THEME.MAIN_COLOR} />)
          }}
      />
      <Tab.Screen
        name="Booked"
        component={MainScreen}
        options={{
          tabBarLabel: "Избранное",
          tabBarIcon: () => <Ionicons name="heart-outline" size={24} color={THEME.MAIN_COLOR} />
        }} />
    </Tab.Navigator>
  );
}
