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

import Login from './src/auth/Login.auth';
import Signup from './src/auth/Signup.auth';
import Home from './src/screens/Home';
import Onboard from './src/auth/Onboard.start';
// imports ////////////////////////////////

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

// SCREENS DATA
const AUTH_SCREENS = [
  { id: 1, component: Onboard, name: 'onboard' },
  { id: 2, component: Login, name: 'login' },
  { id: 3, component: Signup, name: 'signup' },
];

const APP_SCREENS = [{ id: 1, component: Home, name: 'home' }];

// react function /////////////////////////
function AppNav() {
  // local hooks:
  const [INIT, SET_INIT] = React.useState(true);
  const [U, SET_U] = React.useState();

  // local handlers:
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
        {AUTH_SCREENS.map((screen) => {
          return (
            <Stack.Screen
              key={screen.id}
              name={screen.name}
              component={screen.component}
              options={{ headerShown: false, animation: 'slide_from_left' }}
            />
          );
        })}
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator initialRouteName="home">
      {APP_SCREENS.map((screen) => {
        return (
          <Stack.Screen
            key={screen.id}
            name={screen.name}
            component={screen.component}
            options={{ headerShown: false, animation: 'slide_from_left' }}
          />
        );
      })}
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
        <AppNav />
      </View>
    </NavigationContainer>
  );
}
