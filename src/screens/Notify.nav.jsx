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
import { ActivityIndicator, Text } from 'react-native-paper';
import { firebase } from '../../config';
import KMFont from '../hooks/useFont.hook';
import usePalette from '../hooks/usePalette.hook';
import NotifyItem from '../components/NotifyItem.component';
// imports ////////////////////////////////

// const notificationsList = [
//   { id: 1, message: 'تم تفعيل الحساب' },
//   { id: 2, message: 'تم اضافة بيانات السيارة' },
//   { id: 3, message: 'تم ادخال العنوان' },
// ];

// react function /////////////////////////
export default function NotifyNav() {
  // local hooks:
  const Palette = usePalette();
  const [refreshing, setRefreshing] = React.useState(false);
  const [userAllData, setUserAllData] = React.useState([]);

  // local handlers:

  // get user data =============:
  const getUserNofifys = () => {
    firebase
      .firestore()
      .collection('notifys')
      .onSnapshot((snapshot) => {
        const newNotes = [];
        snapshot.forEach((doc) => {
          const { note } = doc.data();

          newNotes.push({ note, id: doc.id });
        });
        setUserAllData(newNotes);
      });
  };
  React.useEffect(() => getUserNofifys(), []);

  // onRefresh =============:
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getUserNofifys();
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
      <Stack
        justify="center"
        items="stretch"
        direction="column"
        spacing={10}
        ph={10}
        mt={20}
        pv={5}
      >
        <Text variant="titleSmall" style={{ fontFamily: KMFont.Bold, color: Palette.SecDark }}>
          الاشعارات
        </Text>

        {userAllData.map((item, id) => {
          if (typeof item.note === 'string') {
            return <NotifyItem key={id} date={item.date} note={item.note} />;
          }
        })}
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
