/* eslint-disable object-curly-newline */
import React from 'react';
import { StatusBar, StyleSheet, I18nManager, SafeAreaView, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import usePalette from '../hooks/usePalette.hook';

// imports ////////////////////////////////

I18nManager.forceRTL(true);
I18nManager.allowRTL(true);

// react function /////////////////////////
export default function TOUAuth() {
  // local hooks:
  const Palette = usePalette();

  // local ui:
  return (
    <SafeAreaView style={[Styles.SAVStyleForAndroid, { backgroundColor: Palette.darkBg }]}>
      <ScrollView>
        <StatusBar backgroundColor="transparent" translucent />
      </ScrollView>
    </SafeAreaView>
  );
}

// local styles:
const Styles = StyleSheet.create({
  SAVStyleForAndroid: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 22,
  },
});
