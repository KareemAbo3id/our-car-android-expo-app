/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Appbar } from 'react-native-paper';
import usePalette from '../hooks/usePalette.hook';
// imports ////////////////////////////////

// react function /////////////////////////
export default function RouteAuthAppBar({ onPress }) {
  // local hooks:

  const Palette = usePalette();

  // local handlers:

  // local ui:
  return (
    <Appbar.Header style={[Styles.AppbarStyle, { backgroundColor: Palette.darkBg }]}>
      <MaterialCommunityIcons
        onPress={onPress}
        style={[Styles.AppIconStyle, { backgroundColor: Palette.darkerBg }]}
        name="chevron-right"
        size={35}
        color={Palette.White}
      />
    </Appbar.Header>
  );
}

// local styles:
const Styles = StyleSheet.create({
  AppbarStyle: {
    position: 'absolute',
    width: '100%',
    marginTop: StatusBar.currentHeight,
    top: 0,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  AppIconStyle: {
    borderRadius: 1000,
  },
});
