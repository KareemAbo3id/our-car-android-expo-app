/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable object-curly-newline */
import React from 'react';
import { SafeAreaView, StyleSheet, Dimensions, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { firebase } from '../../config';
import EmailVer from '../auth/EmailVer.auth';
// screens =============:
import EntryNav from '../screens/Entry.nav';
import StoreNav from '../screens/Store.nav';
import ProfileNav from '../screens/Profile.nav';
// hooks:
import usePalette from '../hooks/usePalette.hook';
import KMFont from '../hooks/useFont.hook';
import useNav from '../hooks/useNav.hook';
import EntryNavHeader from '../headers/EntryNavHeader';
// imports ////////////////////////////////

// eslint-disable-next-line no-unused-vars
const { height, width } = Dimensions.get('window');

const Tab = createBottomTabNavigator();

const screenNames = {
  Entry: 'Entry',
  Shop: 'Shop',
  Profile: 'Profile',
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

  if (!userAllData) {
    return (
      <View style={[Styles.SAVStyleForAndroid, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator animating color={Palette.Primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={Styles.SAVStyleForAndroid}>
      {/* AppBar ////////////////// */}

      {/* NavigationContainer */}

      <Tab.Navigator
        initialRouteName={screenNames.Entry}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName;
            const rn = route.name;

            if (rn === screenNames.Entry) {
              iconName = focused ? 'car-clock' : 'car-clock';
            } else if (rn === screenNames.Shop) {
              iconName = focused ? 'shopping' : 'shopping-outline';
            } else if (rn === screenNames.Profile) {
              iconName = focused ? 'account' : 'account-outline';
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
              tabLabel = 'احجز موعدك';
            } else if (rn === screenNames.Shop) {
              tabLabel = 'المتجر';
            } else if (rn === screenNames.Profile) {
              tabLabel = 'الحساب';
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
          tabBarShowLabel: true,
          tabBarItemStyle: { paddingVertical: 8 },
          tabBarStyle: {
            height: height * 0.1,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          tabBarHideOnKeyboard: true,
        })}
      >
        <Tab.Screen
          name="Entry"
          component={EntryNav}
          options={{
            header: () => (
              <EntryNavHeader
                ProfilePath={() => go.to('Profile')}
                SettingPath={() => go.to('Setting')}
                BookingPath={() => go.to('Booking')}
                CarPath={() => go.to('Car')}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Shop"
          component={StoreNav}
          options={{
            header: () => (
              <EntryNavHeader
                ProfilePath={() => go.to('Profile')}
                SettingPath={() => go.to('Setting')}
                BookingPath={() => go.to('Booking')}
                CarPath={() => go.to('Car')}
              />
            ),
          }}
        />
        <Tab.Screen name="Profile" component={ProfileNav} options={{ headerShown: false }} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

// local styles:
const Styles = StyleSheet.create({
  SAVStyleForAndroid: {
    flex: 1,
  },
});
