/* eslint-disable no-else-return */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable object-curly-newline */
import React from 'react';
import { ScrollView, StyleSheet, RefreshControl, View } from 'react-native';
import { Stack } from '@react-native-material/core';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ActivityIndicator, Text } from 'react-native-paper';
import { firebase } from '../../config';
import KMFont from '../hooks/useFont.hook';
import usePalette from '../hooks/usePalette.hook';
import CartItem from '../components/CartItem.component';
// imports ////////////////////////////////

// react function /////////////////////////
export default function CartNav() {
  // local hooks:
  const Palette = usePalette();
  const [refreshing, setRefreshing] = React.useState(false);

  const { currentUser } = firebase.auth();
  const [userAllData, setUserAllData] = React.useState([]);

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
          if (setUserAllData(snapshot?.data().userCart)) {
            setUserAllData(snapshot?.data().userCart);
          }
        } else {
          // eslint-disable-next-line no-console
          console.log('user does not exist');
        }
      });
  };
  React.useEffect(() => getUserAllData(), []);

  // onRefresh =============:
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getUserAllData();
    setTimeout(() => {
      setRefreshing(false);
    }, 800);
  }, []);

  if (!userAllData) {
    return (
      <View style={[Styles.SAVStyleForAndroid, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator animating color={Palette.Primary} />
      </View>
    );
  }

  // local ui:
  return (
    <ScrollView
      style={Styles.SAVStyleForAndroid}
      refreshControl={
        <RefreshControl colors={[Palette.Primary]} refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {userAllData.length < 1 ? (
        <Stack justify="center" items="center" mt={50} spacing={10} pv={5}>
          <MaterialCommunityIcons name="cancel" size={50} color={Palette.SecDark} />
          <Text
            variant="headlineSmall"
            style={{ fontFamily: KMFont.Regular, color: Palette.SecDark }}
          >
            {userAllData.length < 1 ? 'لا يوجد طلبات' : 'السلة'}
          </Text>
        </Stack>
      ) : (
        <Stack
          justify="center"
          items="stretch"
          direction="column"
          spacing={10}
          ph={10}
          mt={20}
          pv={5}
        >
          {userAllData.map((item, id) => {
            return <CartItem key={id} note={item} />;
          })}
        </Stack>
      )}
    </ScrollView>
  );
}

// local styles:
const Styles = StyleSheet.create({
  SAVStyleForAndroid: {
    flex: 1,
  },
});
