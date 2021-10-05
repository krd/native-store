import React from 'react';
import { Platform } from 'react-native';
import Colors from '../../constants/Colors';
import {Ionicons} from '@expo/vector-icons';
import { HeaderButtons, HeaderButton } from 'react-navigation-header-buttons';

const CustomHeaderButton = (props) => (
  <HeaderButton
    IconComponent={Ionicons}
    iconSize={26}
    color={Colors.primary}
    {...props}
  />
);

export const CustomHeaderButtons = (props) => {
  return <HeaderButtons HeaderButtonComponent={CustomHeaderButton} {...props} />;
};
export { Item } from 'react-navigation-header-buttons';