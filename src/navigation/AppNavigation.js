import React from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AboutScreen } from '../screens/AboutScreen';
import { MainScreen } from '../screens/MainScreen';
import { PostScreen } from '../screens/PostScreen';
import { CreateScreen } from '../screens/CreateScreen'
import { THEME } from '../../theme'
import { Platform } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { DrawerActions } from '@react-navigation/native'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

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
        {/* Перечень экранов */}
        <Stack.Screen
          name="Main"
          component={DrawerNavigator}
          options={{
            title: "Мой блог",
            headerRight: () =>
              <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item title="Сделать фото" iconName="camera" onPress={() => console.log('Press photo')} />
              </HeaderButtons>,
            headerLeft: () => {
              const navigation = useNavigation();
              return (
                <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                  <Item title="Меню" iconName="menu" onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />
                </HeaderButtons>
              );
            }
          }}
        />
        {/* <Stack.Screen name="About"
          component={AboutScreen}
          options={{ title: "О программе" }}
        /> */}
        <Stack.Screen name="Post"
          component={PostScreen}
          options={({ route }) => ({ title: `Пост #${route.params.postId} - ${new Date(route.params.date).toLocaleDateString()}` })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// этот навигатор - оболочка над MainScreen с табами.
// использовать будем в Stack, так что без <NavigationContainer>
const BottomNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="All"
      tabBarOptions={{ activeTintColor: THEME.MAIN_COLOR, inactiveTintColor: THEME.INACTIVE_COLOR }}
    >
      {/* левая кнопка - "Все". Отображает все данные. По Tab.Screen.name в MainScreen фильтруются компоненты */}
      <Tab.Screen
        name="All"
        component={MainScreen}
        options={
          {
            title: "Мой блог",
            tabBarLabel: "Все",
            tabBarIcon: ({ focused, color }) => (<Ionicons name={"albums" + (focused ? "" : "-outline")} size={24} color={color} />)
          }}
      />
      {/* Правая кнопка - отображаем отфильтрованные данные с booked=true */}
      <Tab.Screen
        name="Booked"
        initialParams={{ isBooked: true }}
        component={MainScreen}
        options={{
          title: "Избранное",
          tabBarLabel: "Избранное",
          tabBarIcon: ({ focused, color }) => <Ionicons name={focused ? 'heart' : 'heart-outline'} size={24} color={color} />
        }} />
    </Tab.Navigator>
  );
}


const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="DrawMain">
      <Drawer.Screen name="DrawMain" component={BottomNavigator} options={{ title: "Главная страница" }} />
      <Drawer.Screen name="DrawCreate" component={CreateScreen} options={{ title: "Создать пост" }} />
      <Drawer.Screen name="DrawAbout" component={AboutScreen} options={{ title: "О программе" }} />
    </Drawer.Navigator>
  );
};