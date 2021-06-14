import React from 'react'
import { HeaderButton } from 'react-navigation-header-buttons'
import { Platform } from 'react-native'
import { THEME } from '../../theme'
import { Ionicons } from '@expo/vector-icons'


export const AppHeaderIcon = (props) => {
  let color = props.color;
  if(!color) {
    color = Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR;
  }
  return (
    <HeaderButton
      {...props}
      iconSize={24}
      color={color}
      IconComponent={Ionicons}
    />
  );
};
