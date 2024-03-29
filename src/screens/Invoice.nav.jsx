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
import { ActivityIndicator, Button, Card, Divider, Text } from 'react-native-paper';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { firebase } from '../../config';
import KMFont from '../hooks/useFont.hook';
import usePalette from '../hooks/usePalette.hook';
// imports ////////////////////////////////

const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();

// react function /////////////////////////
export default function InvoiceNav({ route }) {
  // local hooks:
  const { title, price } = route.params;
  const VATPer = 0.15;
  const DELPer = 0.1;
  const VatVal = price * VATPer;
  const DelVal = price * DELPer;
  const allSubVal = VatVal + DelVal;
  const netPrice = price - allSubVal;
  const total = netPrice + allSubVal;

  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef();
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
        alert(`تم حفظ الفاتورة رقم #${(netPrice * 1234).toFixed(0)}`);
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
          <Stack pt={20} direction="column" justify="center" items="center">
            <Text variant="titleLarge" style={{ fontFamily: KMFont.Bold, color: Palette.Black }}>
              فاتورة ضريبية
            </Text>
            <Text variant="titleMedium" style={{ fontFamily: KMFont.Medium, color: Palette.Black }}>
              #{(netPrice * 1234).toFixed(0)}
            </Text>
            <Text variant="titleMedium" style={{ fontFamily: KMFont.Medium, color: Palette.Black }}>
              التاريخ: {yyyy + '/' + mm + '/' + dd}
            </Text>
            <Stack direction="row" justify="center" items="center" pv={15}>
              <QRCode
                size={160}
                value={`فاتورة من: (our car)\n المنتج: (${title})\nضريبة ق.م: ${VatVal.toFixed(
                  2
                )} ريال سعودي\nاجمالي: ${price.toFixed(2)} ريال سعودي`}
              />
            </Stack>
          </Stack>

          {/* OUR CAR DATA */}
          <Stack
            ph={20}
            mt={20}
            direction="row"
            items="center"
            justify="start"
            w="100%"
            spacing={2}
          >
            <MaterialCommunityIcons name="store" size={18} />
            <Text variant="titleSmall" style={{ fontFamily: KMFont.Bold, color: Palette.Black }}>
              بيانات البائع:
            </Text>
          </Stack>
          <Stack direction="row" items="start" justify="start" spacing={10} w="100%" ph={20}>
            <Stack direction="column" justify="center" items="start" spacing={1}>
              <Text
                variant="titleSmall"
                style={{ fontFamily: KMFont.Medium, color: Palette.Black }}
              >
                الاسم:
              </Text>
              <Text
                variant="titleSmall"
                style={{ fontFamily: KMFont.Medium, color: Palette.Black }}
              >
                الرقم الضريبي:
              </Text>
              <Text
                variant="titleSmall"
                style={{ fontFamily: KMFont.Medium, color: Palette.Black }}
              >
                السجل التجاري:
              </Text>
              <Text
                variant="titleSmall"
                style={{ fontFamily: KMFont.Medium, color: Palette.Black }}
              >
                العنوان:
              </Text>
            </Stack>
            <Stack direction="column" justify="center" items="start" spacing={1}>
              <Text
                variant="titleSmall"
                style={{ fontFamily: KMFont.Medium, color: Palette.Black }}
              >
                OUR CAR
              </Text>
              <Text
                variant="titleSmall"
                style={{ fontFamily: KMFont.Medium, color: Palette.Black }}
              >
                123456789900003
              </Text>
              <Text
                variant="titleSmall"
                style={{ fontFamily: KMFont.Medium, color: Palette.Black }}
              >
                1122334455
              </Text>
              <Text
                variant="titleSmall"
                style={{ fontFamily: KMFont.Medium, color: Palette.Black }}
              >
                جدة-الفيصلية-عبداللطيف جميل
              </Text>
            </Stack>
          </Stack>
          {/* CUSTOMER DATA */}
          <Stack
            ph={20}
            mt={20}
            direction="row"
            items="center"
            justify="start"
            w="100%"
            spacing={2}
          >
            <MaterialCommunityIcons name="account" size={18} />
            <Text variant="titleSmall" style={{ fontFamily: KMFont.Bold, color: Palette.Black }}>
              بيانات العميل:
            </Text>
          </Stack>
          <Stack direction="row" items="start" justify="start" spacing={10} w="100%" ph={20}>
            <Stack direction="column" justify="center" items="start" spacing={1}>
              <Text
                variant="titleSmall"
                style={{ fontFamily: KMFont.Medium, color: Palette.Black }}
              >
                الاسم:
              </Text>
              <Text
                variant="titleSmall"
                style={{ fontFamily: KMFont.Medium, color: Palette.Black }}
              >
                الايميل:
              </Text>
              <Text
                variant="titleSmall"
                style={{ fontFamily: KMFont.Medium, color: Palette.Black }}
              >
                العنوان:
              </Text>
            </Stack>
            <Stack direction="column" justify="center" items="start" spacing={1}>
              <Text
                variant="titleSmall"
                style={{ fontFamily: KMFont.Medium, color: Palette.Black }}
              >
                {userAllData?.userContact?.userFname} {userAllData?.userContact?.userLname}
              </Text>
              <Text
                variant="titleSmall"
                style={{ fontFamily: KMFont.Medium, color: Palette.Black }}
              >
                {userAllData?.userContact?.userEmail}
              </Text>
              <Text
                variant="titleSmall"
                style={{ fontFamily: KMFont.Medium, color: Palette.Black }}
              >
                {userAllData.userAddress?.userReg}-{userAllData.userAddress?.userCity}-
                {userAllData.userAddress?.userDis}
              </Text>
            </Stack>
          </Stack>

          {/* INVOICE DATA */}
          <Stack
            mh={30}
            direction="row"
            justify="between"
            items="center"
            borderBottom={1}
            borderStyle="dashed"
          >
            <Text variant="titleSmall" style={{ fontFamily: KMFont.Bold, color: Palette.Black }}>
              البيان
            </Text>
            <Text variant="titleSmall" style={{ fontFamily: KMFont.Bold, color: Palette.Black }}>
              السعر
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
              {total.toFixed(2)}
            </Text>
          </Stack>
          <Stack
            pv={10}
            mh={30}
            direction="row"
            justify="between"
            items="center"
            borderTop={1}
            borderStyle="dashed"
            spacing={5}
          >
            <Text variant="titleMedium" style={{ fontFamily: KMFont.Medium, color: Palette.Black }}>
              السعر غير شامل الضريبة
            </Text>
            <Text variant="titleMedium" style={{ fontFamily: KMFont.Medium, color: Palette.Black }}>
              {netPrice.toFixed(2)}
            </Text>
          </Stack>
          <Stack
            pv={10}
            mh={30}
            direction="row"
            justify="between"
            items="center"
            borderStyle="dashed"
            spacing={5}
          >
            <Text variant="titleMedium" style={{ fontFamily: KMFont.Medium, color: Palette.Black }}>
              + قيمة الضريبة (15%)
            </Text>
            <Text variant="titleMedium" style={{ fontFamily: KMFont.Medium, color: Palette.Black }}>
              {VatVal.toFixed(2)}
            </Text>
          </Stack>
          <Stack
            pv={10}
            mh={30}
            direction="row"
            justify="between"
            items="center"
            borderStyle="dashed"
            spacing={5}
          >
            <Text variant="titleMedium" style={{ fontFamily: KMFont.Medium, color: Palette.Black }}>
              + رسوم الشحن (1%)
            </Text>
            <Text variant="titleMedium" style={{ fontFamily: KMFont.Medium, color: Palette.Black }}>
              {DelVal.toFixed(2)}
            </Text>
          </Stack>
          <Stack
            pv={10}
            mh={30}
            direction="row"
            justify="between"
            items="center"
            borderTop={1}
            borderStyle="dashed"
          >
            <Text variant="titleLarge" style={{ fontFamily: KMFont.Bold, color: Palette.Black }}>
              الاجمالي
            </Text>
            <Text variant="titleLarge" style={{ fontFamily: KMFont.Bold, color: Palette.Black }}>
              {total.toFixed(2)} ر.س
            </Text>
          </Stack>
          <Stack mv={10} ph={20}>
            <Divider style={{ backgroundColor: Palette.SecDark, height: 1 }} />
          </Stack>
          <Stack mb={10} mh={30} direction="row" justify="center" items="center">
            <Text variant="bodyMedium" style={{ fontFamily: KMFont.Regular, color: Palette.Black }}>
              تم اصدار الفاتورة الكترونياً من تطبيق our car
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
            حفظ الفاتورة
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
