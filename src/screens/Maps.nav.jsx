/* eslint-disable no-alert */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import { Button, Text } from 'react-native-paper';
import usePalette from '../hooks/usePalette.hook';
import KMFont from '../hooks/useFont.hook';
// imports ////////////////////////////////

// react function /////////////////////////
export default function MapNav() {
  // local hooks:
  const Palette = usePalette();
  // local ui:
  return (
    <View style={styles.container}>
      <Button
        icon="map"
        mode="elevated"
        elevation={2}
        buttonColor={Palette.Primary}
        textColor={Palette.PrimLight}
        style={{ borderRadius: 1000 }}
        labelStyle={{
          fontFamily: KMFont.Bold,
          fontSize: 17,
          lineHeight: 29,
        }}
        onPress={() => {
          Linking.openURL('https://www.google.com/maps');
        }}
      >
        الذهاب الى الخريطة
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
