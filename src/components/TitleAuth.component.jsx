/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text } from 'react-native-paper';
import { Box, Stack } from '@react-native-material/core';
import { Image, Dimensions, StyleSheet } from 'react-native';
import usePalette from '../hooks/usePalette.hook';
import KMFont from '../hooks/useFont.hook';
// imports ////////////////////////////////

const { height, width } = Dimensions.get('window');

// react function /////////////////////////
export default function TitleAuth({ source, title, describe }) {
  // local hooks:
  const Palette = usePalette();

  // local handlers:

  // local ui:
  return (
    <Stack direction="column" items="center" justify="center" pb={10}>
      <Box pb={15}>
        <Image source={source} style={Styles.image} />
      </Box>
      <Text
        variant="headlineSmall"
        style={{
          fontFamily: KMFont.Bold,
          color: Palette.PrimLight,
          textAlign: 'center',
        }}
      >
        {title}
      </Text>
      <Text
        variant="bodyLarge"
        style={{
          fontFamily: KMFont.Medium,
          color: Palette.PrimLight,
          textAlign: 'center',
        }}
      >
        {describe}
      </Text>
    </Stack>
  );
}

const Styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
    height: height * 0.1,
    width: width * 1,
  },
});
