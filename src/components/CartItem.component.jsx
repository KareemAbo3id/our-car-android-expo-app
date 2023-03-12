/* eslint-disable no-alert */
/* eslint-disable indent */
/* eslint-disable object-shorthand */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable object-curly-newline */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Stack } from '@react-native-material/core';
import { Image } from 'react-native';
import { Button, Card, Divider, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import KMFont from '../hooks/useFont.hook';
import usePalette from '../hooks/usePalette.hook';
import { firebase } from '../../config';
import useNav from '../hooks/useNav.hook';
// imports ////////////////////////////////

// react function /////////////////////////
export default function CartItem({ title, image, price, prodNo }) {
  // local hooks:
  const Palette = usePalette();
  const go = useNav();
  const VATPer = 0.15;
  const DELPer = 0.1;
  const VatVal = price * VATPer;
  const DelVal = price * DELPer;
  const allSubVal = VatVal + DelVal;
  const netPrice = price - allSubVal;
  const total = netPrice + allSubVal;

  const { currentUser } = firebase.auth();
  const [userAllData, setUserAllData] = React.useState('');

  // local handlers:
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
  return (
    <Card
      mode="elevated"
      elevation={2}
      style={{ backgroundColor: Palette.White, marginBottom: 10 }}
    >
      <Card.Content>
        <Stack direction="row" justify="center" items="center" pt={20}>
          <Image source={image} style={{ width: 150, height: 150 }} resizeMode="center" />
        </Stack>
        <Stack direction="column" justify="center" items="start" spacing={0} pt={15}>
          <Text variant="headlineSmall" style={{ fontFamily: KMFont.Bold, color: Palette.Black }}>
            {title}
          </Text>
          <Text variant="titleMedium" style={{ fontFamily: KMFont.Medium, color: Palette.Black }}>
            رقم المنتج: {prodNo}#
          </Text>
          <Stack direction="row" justify="between" items="center" w="100%" mt={10}>
            <Text variant="titleMedium" style={{ fontFamily: KMFont.Medium, color: Palette.Black }}>
              التوصيل الى:
            </Text>
            <Button
              mode="text"
              compact
              icon="pencil"
              textColor={Palette.Primary}
              onPress={() => {
                go.to('Address');
              }}
            >
              <Text
                variant="titleMedium"
                style={{ fontFamily: KMFont.Medium, color: Palette.Primary }}
              >
                تعديل العنوان
              </Text>
            </Button>
          </Stack>
          <Stack
            style={{ borderRadius: 4, elevation: 2 }}
            borderColor={Palette.SecDark2}
            bg={Palette.White}
            spacing={3}
            border={1}
            ph={5}
            pv={8}
            wrap
            justify="start"
            items="center"
            direction="row"
            w="100%"
          >
            <MaterialCommunityIcons name="map-marker" size={15} />
            <Text variant="titleMedium" style={{ fontFamily: KMFont.Medium, color: Palette.Black }}>
              {userAllData.userAddress?.userReg}
            </Text>
            <Text>-</Text>
            <Text variant="titleMedium" style={{ fontFamily: KMFont.Medium, color: Palette.Black }}>
              {userAllData.userAddress?.userCity}
            </Text>
            <Text>-</Text>
            <Text variant="titleMedium" style={{ fontFamily: KMFont.Medium, color: Palette.Black }}>
              {userAllData.userAddress?.userDis}
            </Text>
          </Stack>
        </Stack>

        <Stack spacing={10} mt={15}>
          <Stack direction="row" justify="between" items="center" spacing={5}>
            <Text variant="titleSmall" style={{ fontFamily: KMFont.Medium, color: Palette.Black }}>
              السعر غير شامل الضريبة
            </Text>
            <Text variant="titleSmall" style={{ fontFamily: KMFont.Bold, color: Palette.Black }}>
              {netPrice.toFixed(2)} ر.س
            </Text>
          </Stack>
          <Stack direction="row" justify="between" items="center" spacing={5}>
            <Text variant="titleSmall" style={{ fontFamily: KMFont.Medium, color: Palette.Black }}>
              قيمة الضريبة المضافة (15%)
            </Text>
            <Text variant="titleSmall" style={{ fontFamily: KMFont.Bold, color: Palette.Black }}>
              {VatVal.toFixed(2)} ر.س
            </Text>
          </Stack>
          <Stack direction="row" justify="between" items="center" spacing={5}>
            <Text variant="titleSmall" style={{ fontFamily: KMFont.Medium, color: Palette.Black }}>
              رسوم الشحن (1%)
            </Text>
            <Text variant="titleSmall" style={{ fontFamily: KMFont.Bold, color: Palette.Black }}>
              {DelVal.toFixed(2)} ر.س
            </Text>
          </Stack>
        </Stack>
        <Divider style={{ marginVertical: 20 }} />
        <Stack direction="row" justify="between" items="center" spacing={5}>
          <Text variant="titleLarge" style={{ fontFamily: KMFont.Bold, color: Palette.Black }}>
            الإجمالي
          </Text>
          <Text variant="titleLarge" style={{ fontFamily: KMFont.Bold, color: Palette.Success }}>
            {total.toFixed(2)} ر.س
          </Text>
        </Stack>
      </Card.Content>
    </Card>
  );
}
