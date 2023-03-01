import React from 'react';
import { SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, Appbar, Text } from 'react-native-paper';
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

const { height, width } = Dimensions.get('window');

const Tab = createBottomTabNavigator();

const screenNames = {
  Entry: 'Entry',
  Maps: 'Map',
  Shop: 'Shop',
};

// react function /////////////////////////
export default function Home() {
  // local hooks =============:
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
  if (!isCurrentUserVerified) {
    return <EmailVer />;
  }

  return (
    <SafeAreaView style={Styles.SAVStyleForAndroid}>
      {/* AppBar ////////////////// */}
      {userAllData ? (
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
            <Text
              variant="titleLarge"
              style={{ fontFamily: KMFont.Medium }}
              onPress={() => {
                go.to('Profile');
              }}
            >
              {userAllData?.userContact?.userFname}
            </Text>
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
      ) : (
        <Stack pv={20}>
          <ActivityIndicator animating color={Palette.Primary} />
        </Stack>
      )}

      {/* NavigationContainer */}
      <NavigationContainer independent>
        <Tab.Navigator
          id={3}
          initialRouteName={screenNames.Entry}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
              let iconName;
              const rn = route.name;

              if (rn === screenNames.Entry) {
                iconName = focused ? 'home' : 'home-outline';
              } else if (rn === screenNames.Maps) {
                iconName = focused ? 'map' : 'map-outline';
              } else if (rn === screenNames.Shop) {
                iconName = focused ? 'shopping' : 'shopping-outline';
              }

              return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={35}
                  color={focused ? Palette.Primary2 : Palette.SecDark}
                />
              );
            },
            tabBarLabel: ({ focused }) => {
              let tabLabel;
              const rn = route.name;

              if (rn === screenNames.Entry) {
                tabLabel = 'الرئيسية';
              } else if (rn === screenNames.Maps) {
                tabLabel = 'الخريطة';
              } else if (rn === screenNames.Shop) {
                tabLabel = 'المتجر';
              }
              return (
                <Text
                  variant="labelMedium"
                  style={{
                    fontFamily: KMFont.Regular,
                    color: focused ? Palette.Primary2 : Palette.SecDark,
                  }}
                >
                  {tabLabel}
                </Text>
              );
            },
            lazy: true,
            tabBarShowLabel: true,
            tabBarItemStyle: { paddingVertical: 8 },
            tabBarStyle: {
              height: 75,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            },
            tabBarHideOnKeyboard: true,
          })}
        >
          <Tab.Screen name="Entry" component={EntryNav} options={{ headerShown: false }} />
          <Tab.Screen name="Map" component={MapNav} options={{ headerShown: false }} />
          <Tab.Screen name="Shop" component={StoreNav} options={{ headerShown: false }} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

// local styles:
const Styles = StyleSheet.create({
  SAVStyleForAndroid: {
    flex: 1,
  },
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
