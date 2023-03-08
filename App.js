/* eslint-disable object-curly-newline */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable global-require */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { firebase } from './config';
import usePalette from './src/hooks/usePalette.hook';
import useNav from './src/hooks/useNav.hook';

import Login from './src/auth/Login.auth';
import Signup from './src/auth/Signup.auth';
import Home from './src/start/Home.start';
import Onboard from './src/start/Onboard.start';
import ResetPassword from './src/auth/ResetPassword.auth';
import ProfileNav from './src/screens/Profile.nav';
import PayNav from './src/screens/Pay.nav';
import SettingNav from './src/screens/Setting.nav';
import AddressNav from './src/screens/Address.nav';
import CarNav from './src/screens/Car.nav';
import RouteAppBar from './src/components/RouteAppBar.component';
import EntryNav from './src/screens/Entry.nav';
import BookingNav from './src/screens/Booking.nav';
import StoreNav from './src/screens/Store.nav';
import ItemDetails from './src/screens/ItemDetails.nav';
import InvoiceNav from './src/screens/Invoice.nav';
// imports ////////////////////////////////

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

// SCREENS DATA
const AUTH_SCREENS = [
  { id: 1, component: Login, name: 'login' },
  { id: 2, component: Signup, name: 'signup' },
  { id: 3, component: ResetPassword, name: 'resetPassword' },
];

const APP_SCREENS = [
  { id: 1, component: PayNav, title: 'تفاصيل المنتج', name: 'Pay' },
  { id: 2, component: ProfileNav, title: 'الحساب', name: 'Profile' },
  { id: 3, component: AddressNav, title: 'العنوان', name: 'Address' },
  { id: 4, component: CarNav, title: 'السيارة', name: 'Car' },
  { id: 5, component: SettingNav, title: 'الاعدادات', name: 'Setting' },
  { id: 6, component: EntryNav, title: '', name: 'Entry' },
  { id: 7, component: StoreNav, title: '', name: 'Shop' },
  { id: 8, component: BookingNav, title: 'احجز موعدك', name: 'Booking' },
  { id: 9, component: ItemDetails, title: 'تفاصيل المنتج', name: 'Details' },
  { id: 10, component: InvoiceNav, title: 'فاتورة ضريبية', name: 'Invoice' },
];

// react function /////////////////////////
function AppNav() {
  const Palette = usePalette();
  const go = useNav();

  // local hooks:
  const [INIT, SET_INIT] = React.useState(true);
  const [U, SET_U] = React.useState();

  const onAuthStateChanged = (user) => {
    SET_U(user);
    if (INIT) SET_INIT(false);
  };

  React.useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  // local ui:

  if (INIT) return null;

  if (!U) {
    return (
      <Stack.Navigator initialRouteName="onboard">
        <Stack.Screen
          name="onboard"
          component={Onboard}
          options={{
            statusBarColor: 'transparent',
            statusBarTranslucent: true,
            headerShown: false,
            animation: 'simple_push',
          }}
        />
        {AUTH_SCREENS.map((screen) => {
          return (
            <Stack.Screen
              key={screen.id}
              name={screen.name}
              component={screen.component}
              options={{
                statusBarColor: 'transparent',
                statusBarTranslucent: true,
                headerShown: false,
                animation: 'slide_from_left',
              }}
            />
          );
        })}
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen
        name="home"
        component={Home}
        options={{ statusBarColor: Palette.Primary, headerShown: false, animation: 'simple_push' }}
      />
      {APP_SCREENS.map((screen) => {
        return (
          <Stack.Screen
            key={screen.id}
            name={screen.name}
            component={screen.component}
            options={{
              statusBarColor: Palette.Primary,
              header: () => <RouteAppBar title={screen.title} onPress={() => go.to('home')} />,
              animation: 'fade_from_bottom',
            }}
          />
        );
      })}
    </Stack.Navigator>
  );
}

function RootNav() {
  const Palette = usePalette();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="root"
        component={AppNav}
        options={{
          statusBarColor: Palette.Primary,
          headerShown: false,
          animation: 'simple_push',
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  // font hook:
  const [fontsLoaded] = useFonts({
    'Tajawal-Regular': require('./assets/fonts/Tajawal-Regular.ttf'),
    'Tajawal-Bold': require('./assets/fonts/Tajawal-Bold.ttf'),
    'Tajawal-Medium': require('./assets/fonts/Tajawal-Medium.ttf'),
    'Tajawal-Black': require('./assets/fonts/Tajawal-Black.ttf'),
  });

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <RootNav />
      </View>
    </NavigationContainer>
  );
}
