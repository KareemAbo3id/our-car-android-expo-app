/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
/* eslint-disable prefer-template */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable object-curly-newline */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React, { useRef } from 'react';
import QRCode from 'react-native-qrcode-svg';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Stack } from '@react-native-material/core';
import { ActivityIndicator, Button, Card, Text } from 'react-native-paper';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';

import { firebase } from '../../config';
import KMFont from '../hooks/useFont.hook';
import usePalette from '../hooks/usePalette.hook';
// imports ////////////////////////////////

const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();

// react function /////////////////////////
export default function ReceiptNav({ route }) {
  // local hooks:
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef();
  const { title, textOfDay, textOfHour } = route.params;
  const Palette = usePalette();
  const { currentUser } = firebase.auth();
  const [userAllData, setUserAllData] = React.useState('');
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

  const capInvoice = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert(`تم حفظ الايصال رقم #${textOfDay.slice(0, 2) * 12341}`);
      }
    } catch (e) {
      alert('خطأ غير معروف ');
    }
  };

  if (status === null) {
    requestPermission();
  }

  if (!userAllData) {
    return (
      <View style={[Styles.SAVStyleForAndroid, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator animating color={Palette.Primary} />
      </View>
    );
  }

  return (
    <ScrollView style={Styles.SAVStyleForAndroid}>
      <View ref={imageRef} collapsable={false}>
        <Card mode="outlined" style={{ backgroundColor: Palette.White, margin: 10 }}>
          <Stack pv={20} direction="column" justify="center" items="center">
            <Text variant="titleLarge" style={{ fontFamily: KMFont.Bold, color: Palette.Black }}>
              ايصال حجز
            </Text>
            <Text variant="titleMedium" style={{ fontFamily: KMFont.Medium, color: Palette.Black }}>
              #{textOfDay.slice(0, 2) * 12341}
            </Text>
            <Text variant="titleMedium" style={{ fontFamily: KMFont.Medium, color: Palette.Black }}>
              التاريخ: {yyyy + '/' + mm + '/' + dd}
            </Text>
            <Stack direction="row" justify="center" items="center" pv={15}>
              <QRCode
                size={160}
                value={`ايصال حجز من: (our car)\n المركز: (${title})\nموعد : ${textOfDay}\nالساعة: ${textOfHour}`}
              />
            </Stack>
            <Text variant="titleMedium" style={{ fontFamily: KMFont.Medium, color: Palette.Black }}>
              اسم المتجر: Our Car
            </Text>
            <Text variant="titleMedium" style={{ fontFamily: KMFont.Medium, color: Palette.Black }}>
              الرقم الضريبي: 123456789900003
            </Text>
            <Text variant="titleMedium" style={{ fontFamily: KMFont.Medium, color: Palette.Black }}>
              اسم العميل: {userAllData?.userContact?.userFname}{' '}
              {userAllData?.userContact?.userLname}
            </Text>
            <Text variant="titleMedium" style={{ fontFamily: KMFont.Medium, color: Palette.Black }}>
              الايميل: {userAllData?.userContact?.userEmail}
            </Text>
          </Stack>
          <Stack
            pv={10}
            mh={30}
            direction="row"
            justify="between"
            items="center"
            borderBottom={1}
            borderStyle="dashed"
          >
            <Text variant="titleSmall" style={{ fontFamily: KMFont.Bold, color: Palette.Black }}>
              المركز
            </Text>
            <Text variant="titleSmall" style={{ fontFamily: KMFont.Bold, color: Palette.Black }}>
              اليوم
            </Text>
            <Text variant="titleSmall" style={{ fontFamily: KMFont.Bold, color: Palette.Black }}>
              الساعة
            </Text>
          </Stack>
          <Stack pv={10} mh={30} direction="row" justify="between" items="center" spacing={5}>
            <Text
              variant="titleMedium"
              style={{ fontFamily: KMFont.Medium, color: Palette.Black, flex: 0.7 }}
            >
              {title}
            </Text>
            <Text variant="titleMedium" style={{ fontFamily: KMFont.Medium, color: Palette.Black }}>
              {textOfDay}
            </Text>
            <Text variant="titleMedium" style={{ fontFamily: KMFont.Medium, color: Palette.Black }}>
              {textOfHour}
            </Text>
          </Stack>

          <Stack pv={10} mh={30} direction="row" justify="center" items="center">
            <Text variant="bodyMedium" style={{ fontFamily: KMFont.Regular, color: Palette.Black }}>
              تم اصدار الايصال الكترونياً من تطبيق our car
            </Text>
          </Stack>
        </Card>
      </View>
      <Stack justify="center" items="stretch" ph={10} mt={5} mb={15}>
        <Button
          mode="elevated"
          icon="content-save"
          buttonColor={Palette.Primary}
          style={{ borderRadius: 12 }}
          textColor={Palette.White}
          labelStyle={{ lineHeight: 25 }}
          onPress={capInvoice}
        >
          <Text variant="titleMedium" style={{ fontFamily: KMFont.Bold, color: Palette.White }}>
            حفظ الايصال
          </Text>
        </Button>
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
