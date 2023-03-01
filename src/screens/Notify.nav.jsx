/* eslint-disable object-curly-newline */
import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import KMFont from '../hooks/useFont.hook';
// imports ////////////////////////////////

// react function /////////////////////////
export default function NotifyNav() {
  // local hooks:
  // local handlers:

  // local ui:
  return (
    <SafeAreaView style={Styles.SAVStyleForAndroid}>
      <Text style={{ fontFamily: KMFont.Regular }}>الاشعارات</Text>
    </SafeAreaView>
  );
}

// local styles:
const Styles = StyleSheet.create({
  SAVStyleForAndroid: {
    flex: 1,
  },
});
