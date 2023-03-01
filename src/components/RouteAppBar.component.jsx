import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Box } from '@react-native-material/core';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import KMFont from '../hooks/useFont.hook';
import usePalette from '../hooks/usePalette.hook';
// imports ////////////////////////////////

// react function /////////////////////////
export default function RouteAppBar({ title, onPress }) {
  // local hooks:

  const Palette = usePalette();

  // local handlers:

  // local ui:
  return (
    <Appbar style={[Styles.AppbarStyle, { backgroundColor: Palette.Primary }]}>
      <MaterialCommunityIcons
        onPress={onPress}
        style={[Styles.AppIconStyle, { backgroundColor: Palette.Primary2 }]}
        name="chevron-right"
        size={30}
        color={Palette.PrimLight}
      />
      <Box mh={5} />
      <Text variant="headlineSmall" style={{ fontFamily: KMFont.Bold, color: Palette.White }}>
        {title}
      </Text>
    </Appbar>
  );
}

// local styles:
const Styles = StyleSheet.create({
  AppbarStyle: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  AppIconStyle: {
    borderRadius: 1000,
  },
});
