/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable object-curly-newline */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { ActivityIndicator, Appbar, Card, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack } from '@react-native-material/core';
import { firebase } from '../../config';
// hooks:
import usePalette from '../hooks/usePalette.hook';
import KMFont from '../hooks/useFont.hook';
// imports ////////////////////////////////

// eslint-disable-next-line no-unused-vars
const { height, width } = Dimensions.get('window');

// react function /////////////////////////
export default function MapsNavHeader({ ProfilePath, SettingPath, NotifyPath, AddressPath }) {
  // local hooks:
  const Palette = usePalette();
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

  React.useEffect(() => {
    setInterval(() => {
      getUserAllData();
    }, 1000);
  }, []);

  // local ui:
  return (
    <Stack>
      <Appbar style={Styles.AppbarStyle}>
        <Stack spacing={5} direction="row" justify="center" items="center">
          <MaterialCommunityIcons
            onPress={ProfilePath}
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
          <Text variant="titleLarge" style={{ fontFamily: KMFont.Regular }}>
            هلا،
          </Text>
          {userAllData?.userContact?.userFname ? (
            <Text variant="titleLarge" style={{ fontFamily: KMFont.Medium }}>
              {userAllData?.userContact?.userFname}
            </Text>
          ) : (
            <ActivityIndicator animating color={Palette.Primary} />
          )}
        </Stack>
        <Stack spacing={10} direction="row" justify="center" items="center">
          <MaterialCommunityIcons
            onPress={SettingPath}
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
            onPress={NotifyPath}
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
      <Stack w="100%" ph={5} pb={10} direction="row" items="start" justify="between" spacing={10}>
        {/* user Address */}
        <Card onPress={AddressPath} style={{ backgroundColor: Palette.White, flex: 1 }}>
          <Card.Content
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              gap: 5,
            }}
          >
            <MaterialCommunityIcons name="map-marker" color={Palette.PrimDark} size={20} />

            <Text
              variant="bodyLarge"
              style={{ color: Palette.PrimDark, fontFamily: KMFont.Medium }}
            >
              {userAllData?.userAddress?.userReg}
            </Text>
            <Text
              variant="bodyLarge"
              style={{ color: Palette.PrimDark, fontFamily: KMFont.Medium }}
            >
              -
            </Text>
            <Text
              variant="bodyLarge"
              style={{ color: Palette.PrimDark, fontFamily: KMFont.Medium }}
            >
              {userAllData?.userAddress?.userCity}
            </Text>
            <Text
              variant="bodyLarge"
              style={{ color: Palette.PrimDark, fontFamily: KMFont.Medium }}
            >
              -
            </Text>
            <Text
              variant="bodyLarge"
              style={{ color: Palette.PrimDark, fontFamily: KMFont.Medium }}
            >
              {userAllData?.userAddress?.userDis}
            </Text>
          </Card.Content>
        </Card>
      </Stack>
    </Stack>
  );
}

// local styles:
const Styles = StyleSheet.create({
  AppbarStyle: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    paddingHorizontal: 20,
    height: height * 0.1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
