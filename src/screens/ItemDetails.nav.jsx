/* eslint-disable global-require */
/* eslint-disable operator-linebreak */
/* eslint-disable react-native/no-raw-text */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-else-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable object-curly-newline */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Button, Text } from 'react-native-paper';
import { StyleSheet, ScrollView, RefreshControl, Image, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack } from '@react-native-material/core';
import { LinearGradient } from 'expo-linear-gradient';
import KMFont from '../hooks/useFont.hook';
import usePalette from '../hooks/usePalette.hook';
// imports ////////////////////////////////

// eslint-disable-next-line no-unused-vars
const { height, width } = Dimensions.get('window');

// react function /////////////////////////
export default function ItemDetails({ route, navigation }) {
  // local hooks:
  const { id, title, price, image, stars, rates, prodNo, altPrice, packageNo } = route.params;
  const Palette = usePalette();
  const [refreshing, setRefreshing] = React.useState(false);

  // local handlers:

  // onRefresh =============:
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 800);
  }, []);

  // local ui:
  return (
    <ScrollView
      key={JSON.stringify(id)}
      style={Styles.SAVStyleForAndroid}
      refreshControl={
        <RefreshControl colors={[Palette.Primary]} refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <LinearGradient
        colors={['rgba(255, 255, 255, 0)', 'rgba(0,0,0,0.1)']}
        style={{
          height: height * 0.3,
          top: 0,
          zIndex: 2,
        }}
      />
      <Image
        source={image}
        style={{ width: width * 1, height: height * 0.3, position: 'absolute', top: 0, zIndex: 1 }}
        resizeMethod="scale"
        resizeMode="contain"
      />
      <Stack direction="column" justify="center" items="start" mt={30} ph={30} spacing={10}>
        <Stack direction="row" justify="between" w="100%" items="center" spacing={5}>
          <Stack direction="row" justify="between" items="center" spacing={5}>
            {stars.map((i, j) => {
              if (i === 1) {
                return <MaterialCommunityIcons key={j} name="star" color={Palette.Warning2} />;
              } else {
                return <MaterialCommunityIcons key={j} name="star" color={Palette.SecPrimary} />;
              }
            })}
            <Text
              variant="bodyMedium"
              style={{ fontFamily: KMFont.Regular, color: Palette.SecDark }}
            >
              {`(${rates})`}
            </Text>
          </Stack>
          <Stack direction="row" justify="end" items="center" spacing={5}>
            <Text
              variant="bodyMedium"
              style={{ fontFamily: KMFont.Regular, color: Palette.SecDark }}
            >
              رقم المنتج:
            </Text>
            <Text variant="bodyMedium" style={{ fontFamily: KMFont.Bold, color: Palette.SecDark }}>
              {prodNo}
            </Text>
          </Stack>
        </Stack>

        <Text variant="headlineMedium" style={{ fontFamily: KMFont.Bold, color: Palette.Black }}>
          {title}
        </Text>
        <Stack direction="row" justify="end" items="center" spacing={5}>
          <MaterialCommunityIcons
            name="package-variant-closed"
            color={packageNo < 10 ? Palette.Red : Palette.Success}
            size={15}
          />
          <Text
            variant="bodyLarge"
            style={[
              { fontFamily: KMFont.Medium },
              { color: packageNo < 10 ? Palette.Red : Palette.Success },
            ]}
          >
            {packageNo < 10 ? 'قارب على الانتهاء' : 'متوفر'}
          </Text>
          <Text
            variant="bodyLarge"
            style={[
              { fontFamily: KMFont.Medium },
              { color: packageNo < 10 ? Palette.Red : Palette.Success },
            ]}
          >
            : {packageNo} قطعة
          </Text>
        </Stack>
        <Stack direction="column" justify="center" items="start" spacing={1} mt={10}>
          <Text variant="headlineSmall" style={{ fontFamily: KMFont.Bold, color: Palette.Info }}>
            {price} ر.س
          </Text>
          <Text
            variant="bodyLarge"
            style={{
              fontFamily: KMFont.Medium,
              color: Palette.SecDark,
              textDecorationLine: 'line-through',
            }}
          >
            {altPrice} ر.س
          </Text>
          <Text variant="bodyMedium" style={{ fontFamily: KMFont.Medium, color: Palette.SecDark }}>
            السعر شامل ضريبة القيمة المضافة
          </Text>
        </Stack>
        <Stack direction="row" justify="center" items="start" spacing={5} mt={10}>
          <MaterialCommunityIcons name="shield" size={20} color={Palette.SecDark} />
          <Text variant="bodyLarge" style={{ fontFamily: KMFont.Bold, color: Palette.SecDark }}>
            12 شهر ضمان من الوكيل
          </Text>
        </Stack>
        <Stack direction="row" justify="center" items="stretch" w="100%" spacing={18}>
          <Image
            source={require('../../assets/pays/applepay.png')}
            resizeMode="contain"
            style={{ width: 40, height: 40 }}
          />
          <Image
            source={require('../../assets/pays/mastercard.png')}
            resizeMode="contain"
            style={{ width: 40, height: 40 }}
          />
          <Image
            source={require('../../assets/pays/visa.png')}
            resizeMode="contain"
            style={{ width: 40, height: 40 }}
          />
          <Image
            source={require('../../assets/pays/mada.png')}
            resizeMode="contain"
            style={{ width: 40, height: 40 }}
          />
        </Stack>
        <Stack direction="row" justify="center" items="stretch" w="100%" pv={10}>
          <Button
            mode="elevated"
            icon="cart"
            elevation={1}
            textColor={Palette.White}
            buttonColor={Palette.Primary}
            style={{ borderRadius: 1200, flex: 1 }}
            labelStyle={{ lineHeight: 29 }}
            onPress={() => {
              navigation.navigate('Pay', {
                image,
                title,
                price,
                prodNo,
              });
            }}
          >
            <Text variant="titleLarge" style={{ fontFamily: KMFont.Medium, color: Palette.White }}>
              شراء المنتج
            </Text>
          </Button>
        </Stack>
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
