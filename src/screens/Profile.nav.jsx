/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { View, ScrollView, RefreshControl, Dimensions, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, Card, Avatar, ActivityIndicator, Button, Divider } from 'react-native-paper';
import { Stack } from '@react-native-material/core';
import { LinearGradient } from 'expo-linear-gradient';
import { firebase } from '../../config';
import KMFont from '../hooks/useFont.hook';
import useNav from '../hooks/useNav.hook';
import usePalette from '../hooks/usePalette.hook';
import Version from '../components/Version.component';
// imports ////////////////////////////////

const { height, width } = Dimensions.get('window');

// react function /////////////////////////
export default function ProfileNav() {
  // local hooks:
  const { currentUser } = firebase.auth();
  const [userAllData, setUserAllData] = React.useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const Palette = usePalette();
  const go = useNav();

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
      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.2)']}
        style={{
          height: height * 0.15,
          top: 0,
        }}
      />
      <Avatar.Icon
        icon="account"
        color={Palette.PrimDark}
        style={{
          elevation: 10,
          backgroundColor: Palette.White,
          height: 70,
          width: 70,
          borderRadius: 1000,
          position: 'absolute',
          top: height * 0.09,
          right: width / 2 - 35,
        }}
      />

      <Stack items="center" justify="center" direction="row" spacing={5} mt={30}>
        <Text variant="headlineSmall" style={{ fontFamily: KMFont.Bold, color: Palette.PrimDark }}>
          {userAllData?.userContact?.userFname}
        </Text>
        <Text variant="headlineSmall" style={{ fontFamily: KMFont.Bold, color: Palette.PrimDark }}>
          {userAllData?.userContact?.userLname}
        </Text>
      </Stack>

      <Stack items="center" justify="center" direction="row" spacing={5}>
        <Text variant="labelLarge" style={{ fontFamily: KMFont.Medium, color: Palette.SecDark }}>
          {userAllData?.userContact?.userEmail}
        </Text>
      </Stack>
      <Stack
        justify="center"
        items="stretch"
        direction="column"
        ph={20}
        pv={5}
        mt={20}
        spacing={10}
      >
        <Text variant="titleSmall" style={{ fontFamily: KMFont.Bold, color: Palette.SecDark }}>
          العنوان
        </Text>

        <Card
          mode="elevated"
          onPress={() => {
            go.to('Address');
          }}
          style={{ backgroundColor: Palette.White }}
        >
          <Card.Content
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexWrap: 'wrap',
              gap: 5,
            }}
          >
            <MaterialCommunityIcons name="map-marker" size={18} color={Palette.Primary2} />
            <Text
              variant="bodyLarge"
              style={{
                fontFamily: KMFont.Medium,
                color: Palette.Primary2,
              }}
            >
              {userAllData?.userAddress?.userReg}
            </Text>
            <Text>-</Text>
            <Text
              variant="bodyLarge"
              style={{
                fontFamily: KMFont.Medium,
                color: Palette.Primary2,
              }}
            >
              {userAllData?.userAddress?.userCity}
            </Text>
            <Text>-</Text>
            <Text
              variant="bodyLarge"
              style={{
                fontFamily: KMFont.Medium,
                color: Palette.Primary2,
              }}
            >
              {userAllData?.userAddress?.userDis}
            </Text>
          </Card.Content>
        </Card>
      </Stack>
      <Stack
        justify="center"
        items="stretch"
        direction="column"
        ph={20}
        mt={20}
        pv={5}
        spacing={10}
      >
        <Text variant="titleSmall" style={{ fontFamily: KMFont.Bold, color: Palette.SecDark }}>
          السيارة
        </Text>

        <Card
          mode="elevated"
          onPress={() => {
            go.to('Car');
          }}
          style={{ backgroundColor: Palette.White }}
        >
          <Card.Content
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexWrap: 'wrap',
              gap: 5,
            }}
          >
            <MaterialCommunityIcons name="car" size={18} color={Palette.Primary2} />
            <Text
              variant="bodyLarge"
              style={{
                fontFamily: KMFont.Medium,
                color: Palette.Primary2,
              }}
            >
              {userAllData?.userCar?.userMake}
            </Text>
            <Text
              variant="bodyLarge"
              style={{
                fontFamily: KMFont.Medium,
                color: Palette.Primary2,
              }}
            >
              موديل
            </Text>
            <Text
              variant="bodyLarge"
              style={{
                fontFamily: KMFont.Medium,
                color: Palette.Primary2,
              }}
            >
              {userAllData?.userCar?.userModel}
            </Text>
            <Text
              variant="bodyLarge"
              style={{
                fontFamily: KMFont.Medium,
                color: Palette.Primary2,
              }}
            >
              {`(${userAllData?.userCar?.userYear})`}
            </Text>
          </Card.Content>
        </Card>
      </Stack>
      <Divider
        style={{ backgroundColor: Palette.Black, marginVertical: 15, marginHorizontal: 20 }}
      />
      <Stack justify="center" items="stretch" direction="column" ph={20} pv={5} spacing={10}>
        <Card
          mode="elevated"
          onPress={() => {
            go.to('Setting');
          }}
          style={{ backgroundColor: Palette.White }}
        >
          <Card.Content
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexWrap: 'wrap',
              gap: 5,
            }}
          >
            <MaterialCommunityIcons name="cog" size={18} color={Palette.Primary2} />
            <Text
              variant="bodyLarge"
              style={{
                fontFamily: KMFont.Medium,
                color: Palette.Primary2,
              }}
            >
              الاعدادات
            </Text>
          </Card.Content>
        </Card>
      </Stack>

      <Stack justify="center" items="stretch" direction="column" ph={20} mt={15} spacing={10}>
        <Card
          onPress={() => {
            firebase.auth().signOut();
          }}
          mode="elevated"
          style={{ backgroundColor: Palette.White }}
        >
          <Card.Content
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexWrap: 'wrap',
              gap: 5,
            }}
          >
            <MaterialCommunityIcons name="logout" size={18} color={Palette.Red} />
            <Text
              variant="bodyLarge"
              style={{
                fontFamily: KMFont.Medium,
                color: Palette.Red,
              }}
            >
              تسجيل خروج
            </Text>
          </Card.Content>
        </Card>
      </Stack>
      <Stack
        justify="center"
        items="stretch"
        direction="column"
        ph={20}
        mv={20}
        pv={5}
        spacing={10}
      >
        <Version />
      </Stack>
    </ScrollView>
  );
}

// local styles:
const Styles = StyleSheet.create({
  SAVStyleForAndroid: {
    flex: 1,
  },
});
