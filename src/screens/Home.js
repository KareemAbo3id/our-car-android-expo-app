import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { firebase } from '../../config';
import EmailVer from '../auth/EmailVer.auth';
// imports ////////////////////////////////

// react function /////////////////////////
export default function Home() {
  // local hooks:
  const isCurrentUserVerified = firebase.auth().currentUser.emailVerified;

  // local handlers:

  // local ui:
  if (!isCurrentUserVerified) {
    return <EmailVer />;
  }

  return (
    <SafeAreaView style={Styles.SAVStyleForAndroid}>
      <Text>Home</Text>
    </SafeAreaView>
  );
}

// local styles:
const Styles = StyleSheet.create({
  SAVStyleForAndroid: {
    flex: 1,
  },
});
