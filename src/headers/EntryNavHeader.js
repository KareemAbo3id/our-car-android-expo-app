import React from 'react';
import { SafeAreaView, StyleSheet, Dimensions, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, Appbar, Card, Text } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack } from '@react-native-material/core';
import { firebase } from '../../config';
import EmailVer from '../auth/EmailVer.auth';
// screens =============:
import EntryNav from '../screens/Entry.nav';
import MapNav from '../screens/Maps.nav';
import StoreNav from '../screens/Store.nav';
// hooks:
import usePalette from '../hooks/usePalette.hook';
import KMFont from '../hooks/useFont.hook';
import useNav from '../hooks/useNav.hook';

// imports ////////////////////////////////

// react function /////////////////////////
export default function EntryNavHeader() {
  // local hooks:
  const isCurrentUserVerified = firebase.auth().currentUser.emailVerified;
  const Palette = usePalette();
  const go = useNav();
  const { currentUser } = firebase.auth();
  const [userAllData, setUserAllData] = React.useState('');

  // local handlers:
  // get user data =============:
  const getUserAllData = () => {
    firebase
      .firestore()
      .collection('users')
      .doc(currentUser?.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          if (setUserAllData(snapshot?.data())) {
            setUserAllData(snapshot?.data());
          }
        } else {
          // eslint-disable-next-line no-console
          console.log('user does not exist');
        }
      });
  };
  React.useEffect(() => getUserAllData(), []);

  // local ui:
  return (
    <Stack>
      <Appbar style={Styles.AppbarStyle}>
        <Stack spacing={5} direction="row" justify="center" items="center">
          <MaterialCommunityIcons
            onPress={() => {
              go.to('Profile');
            }}
            name="account"
            size={25}
            color={Palette.Primary}
            style={{
              backgroundColor: Palette.White,
              borderRadius: 1000,
              padding: 5,
              elevation: 2,
            }}
          />

          <Text
            variant="titleLarge"
            style={{ fontFamily: KMFont.Regular }}
            onPress={() => {
              go.to('Profile');
            }}
          >
            هلا،
          </Text>
          {userAllData?.userContact?.userFname ? (
            <Text
              variant="titleLarge"
              style={{ fontFamily: KMFont.Medium }}
              onPress={() => {
                go.to('Profile');
              }}
            >
              {userAllData?.userContact?.userFname}
            </Text>
          ) : (
            <ActivityIndicator animating color={Palette.Primary} />
          )}
        </Stack>
        <Stack spacing={10} direction="row" justify="center" items="center">
          <MaterialCommunityIcons
            onPress={() => {
              go.to('Setting');
            }}
            name="cog"
            size={25}
            color={Palette.Primary}
            style={{
              backgroundColor: Palette.White,
              borderRadius: 1000,
              padding: 5,
              elevation: 2,
            }}
          />
          <MaterialCommunityIcons
            onPress={() => {
              go.to('Notify');
            }}
            name="bell"
            size={25}
            color={Palette.Primary}
            style={{
              backgroundColor: Palette.White,
              borderRadius: 1000,
              padding: 5,
              elevation: 2,
            }}
          />
        </Stack>
      </Appbar>
      <Stack w="100%" ph={25} pb={10} direction="row" items="center" justify="between" spacing={10}>
        {/* booking date */}
        <Card style={{ backgroundColor: Palette.Info, flex: 0.6 }}>
          <Card.Content
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <MaterialCommunityIcons name="calendar" color={Palette.White} size={20} />
            <Text variant="bodyLarge" style={{ color: Palette.White, fontFamily: KMFont.Medium }}>
              الاربعاء 09:00
            </Text>
          </Card.Content>
        </Card>
        {/* user car */}
        <Card
          onPress={() => {
            go.to('Car');
          }}
          style={{ backgroundColor: Palette.White, flex: 0.4 }}
        >
          <Card.Content
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <MaterialCommunityIcons name="car" color={Palette.PrimDark} size={20} />
            {userAllData?.userCar?.userMake ? (
              <Text
                variant="bodyLarge"
                style={{ color: Palette.PrimDark, fontFamily: KMFont.Medium }}
              >
                {userAllData?.userCar?.userMake}
              </Text>
            ) : (
              <ActivityIndicator animating color={Palette.Primary} />
            )}
          </Card.Content>
        </Card>
      </Stack>
    </Stack>
  );
}
