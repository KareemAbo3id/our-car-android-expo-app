/* eslint-disable object-shorthand */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable object-curly-newline */
/* eslint-disable react-native/no-inline-styles */
import { Stack } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image } from 'react-native';
import { Button, Card, Divider, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import KMFont from '../hooks/useFont.hook';
import usePalette from '../hooks/usePalette.hook';
import { firebase } from '../../config';
// imports ////////////////////////////////

// react function /////////////////////////
export default function CartItem({ title, image, price, prodNo }) {
  const navigation = useNavigation();
  // local hooks:
  const Palette = usePalette();
  const VAT = 0.15;
  const vatValue = price * VAT;
  const netPrice = price - vatValue;
  const deliver = price * 0.1;

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
        <Stack direction="column" justify="center" items="start" spacing={5} pt={15}>
          <Text variant="headlineSmall" style={{ fontFamily: KMFont.Bold, color: Palette.Black }}>
            {title}
          </Text>
          <Text variant="titleMedium" style={{ fontFamily: KMFont.Medium, color: Palette.Black }}>
            رقم المنتج: {prodNo}
          </Text>
          <Text variant="titleSmall" style={{ fontFamily: KMFont.Medium, color: Palette.SecDark }}>
            التوصيل الى
          </Text>
          <Stack
            direction="row"
            justify="start"
            items="center"
            spacing={3}
            border={1}
            ph={5}
            pv={8}
            w="100%"
            borderColor={Palette.SecDark2}
            bg={Palette.White}
            style={{ borderRadius: 12, elevation: 2 }}
          >
            <MaterialCommunityIcons name="map-marker" />
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
        <Divider style={{ marginVertical: 20 }} />
        <Stack spacing={10}>
          <Stack direction="row" justify="between" items="center" spacing={5}>
            <Text variant="titleMedium" style={{ fontFamily: KMFont.Medium, color: Palette.Black }}>
              السعر غير شامل الضريبة
            </Text>
            <Text variant="titleMedium" style={{ fontFamily: KMFont.Medium, color: Palette.Black }}>
              {netPrice.toFixed(2)} ر.س
            </Text>
          </Stack>
          <Stack direction="row" justify="between" items="center" spacing={5}>
            <Text variant="titleMedium" style={{ fontFamily: KMFont.Medium, color: Palette.Black }}>
              قيمة الضريبة المضافة (15%)
            </Text>
            <Text variant="titleMedium" style={{ fontFamily: KMFont.Medium, color: Palette.Black }}>
              {vatValue.toFixed(2)} ر.س
            </Text>
          </Stack>
          <Stack direction="row" justify="between" items="center" spacing={5}>
            <Text variant="titleMedium" style={{ fontFamily: KMFont.Medium, color: Palette.Black }}>
              رسوم الشحن (1%)
            </Text>
            <Text variant="titleMedium" style={{ fontFamily: KMFont.Medium, color: Palette.Black }}>
              {deliver.toFixed(2)} ر.س
            </Text>
          </Stack>
        </Stack>
        <Divider style={{ marginVertical: 20 }} />
        <Stack direction="row" justify="between" items="center" spacing={5}>
          <Text variant="titleLarge" style={{ fontFamily: KMFont.Bold, color: Palette.Black }}>
            الإجمالي
          </Text>
          <Text variant="titleLarge" style={{ fontFamily: KMFont.Bold, color: Palette.Success }}>
            {price} ر.س
          </Text>
        </Stack>
      </Card.Content>
      <Card.Content>
        <Stack direction="row" justify="center" items="stretch" w="100%" pt={20}>
          <Button
            mode="elevated"
            icon="cash-multiple"
            elevation={1}
            textColor={Palette.White}
            buttonColor={Palette.Primary}
            style={{ borderRadius: 1200, flex: 1 }}
            labelStyle={{ lineHeight: 29 }}
            onPress={() => {
              navigation.navigate('Invoice', {
                title: title,
                price: price,
                vatValue: vatValue,
                netPrice: netPrice,
                deliver: deliver,
              });
            }}
          >
            <Text variant="titleLarge" style={{ fontFamily: KMFont.Medium, color: Palette.White }}>
              اتمام عملية الشراء
            </Text>
          </Button>
        </Stack>
      </Card.Content>
    </Card>
  );
}
