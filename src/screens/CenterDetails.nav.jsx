/* eslint-disable prefer-template */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable quotes */
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
import { Button, IconButton, Text } from 'react-native-paper';
import {
  StyleSheet,
  ScrollView,
  RefreshControl,
  Image,
  Dimensions,
  Linking,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack } from '@react-native-material/core';
import { LinearGradient } from 'expo-linear-gradient';
import KMFont from '../hooks/useFont.hook';
import usePalette from '../hooks/usePalette.hook';
// imports ////////////////////////////////

// eslint-disable-next-line no-unused-vars
const { height, width } = Dimensions.get('window');

// react function /////////////////////////
export default function CenterDetails({ route, navigation }) {
  // local hooks:
  const { id, location, title, rates, stars, image, services } = route.params;
  const Palette = usePalette();
  const [refreshing, setRefreshing] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const [mode, setMode] = React.useState('date');
  const [show, setShow] = React.useState(false);
  const [textOfDay, setTextOfDay] = React.useState('');
  const [textOfHour, setTextOfHour] = React.useState('');

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    const tempDate = new Date(currentDate);
    const fDate =
      tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();

    const fTime = tempDate.getHours() + ':' + tempDate.getMinutes();

    setTextOfDay(fDate);
    setTextOfHour(fTime);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

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
        resizeMode="contain"
      />
      <Stack direction="column" justify="center" items="start" mt={20} ph={30} spacing={10}>
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
        </Stack>
        <Text variant="headlineMedium" style={{ fontFamily: KMFont.Bold, color: Palette.Black }}>
          {title}
        </Text>
        <Stack direction="row" w="100%" justify="start" items="center" spacing={5}>
          <IconButton
            icon="phone"
            containerColor={Palette.Black}
            iconColor={Palette.White}
            size={25}
            onPress={() => {
              Linking.openURL(`tel:0510101010`);
            }}
          />
          <IconButton
            icon="whatsapp"
            containerColor={Palette.Black}
            iconColor={Palette.White}
            size={25}
            onPress={() => {
              Linking.openURL('whatsapp://send?text=hello&phone=966504686716');
            }}
          />
          <IconButton
            icon="web"
            containerColor={Palette.Black}
            iconColor={Palette.White}
            size={25}
            onPress={() => {
              Linking.openURL(`https://www.professionalcenter.net/`);
            }}
          />
          <IconButton
            icon="map-marker"
            containerColor={Palette.Black}
            iconColor={Palette.White}
            size={25}
            onPress={() => {
              Linking.openURL(location);
            }}
          />
        </Stack>

        <Stack mt={5} direction="column" w="100%" justify="start" items="stretch" spacing={5}>
          <Text variant="bodyLarge" style={{ fontFamily: KMFont.Bold, color: Palette.SecDark }}>
            الخدمات
          </Text>
          {services.map((i, o) => {
            return (
              <Stack
                key={o}
                direction="row"
                justify="between"
                items="center"
                p={10}
                bg={Palette.White}
                style={{ elevation: 2, borderRadius: 6 }}
              >
                <Text variant="bodyLarge" style={{ fontFamily: KMFont.Bold, color: Palette.Black }}>
                  {i.serName}
                </Text>
                <Text variant="bodyLarge" style={{ fontFamily: KMFont.Bold, color: Palette.Info }}>
                  {i.serPrice} ر.س
                </Text>
              </Stack>
            );
          })}
        </Stack>

        <Stack mt={5} direction="column" w="100%" justify="start" items="stretch" spacing={5}>
          <Text variant="bodyLarge" style={{ fontFamily: KMFont.Bold, color: Palette.SecDark }}>
            قم باختيار موعدك
          </Text>
          <Stack
            direction="row"
            justify="between"
            items="center"
            spacing={10}
            p={10}
            bg={Palette.White}
            style={{ elevation: 2, borderRadius: 6 }}
          >
            <Button
              mode="text"
              compact
              icon="calendar-blank"
              textColor={Palette.Primary}
              style={{ borderRadius: 1200 }}
              labelStyle={{ lineHeight: 29, fontFamily: KMFont.Bold, fontSize: 17 }}
              onPress={() => {
                showMode('date');
              }}
            >
              اختيار اليوم
            </Button>
            <Text
              variant="bodyLarge"
              style={{
                fontFamily: KMFont.Medium,
                color: Palette.Black,
                borderRadius: 6,
                borderColor: Palette.SecDark2,
                borderWidth: 1,
                paddingHorizontal: 5,
              }}
            >
              {textOfDay ? textOfDay : 'تاريخ غير محدد'}
            </Text>
          </Stack>
          {textOfDay && (
            <Stack
              direction="row"
              justify="between"
              items="center"
              spacing={10}
              p={10}
              bg={Palette.White}
              style={{ elevation: 2, borderRadius: 6 }}
            >
              <Button
                mode="text"
                compact
                icon="clock"
                textColor={Palette.Primary}
                style={{ borderRadius: 1200 }}
                labelStyle={{ lineHeight: 29, fontFamily: KMFont.Bold, fontSize: 17 }}
                onPress={() => {
                  showMode('time');
                }}
              >
                اختيار الساعة
              </Button>
              <Text
                variant="bodyLarge"
                style={{
                  fontFamily: KMFont.Medium,
                  color: Palette.Black,
                  borderRadius: 6,
                  borderColor: Palette.SecDark2,
                  borderWidth: 1,
                  paddingHorizontal: 5,
                }}
              >
                {textOfHour ? textOfHour : 'تاريخ غير محدد'}
              </Text>
            </Stack>
          )}
        </Stack>

        <Stack mt={5} direction="column" w="100%" justify="start" items="stretch" spacing={5}>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={false}
              display="default"
              onChange={onDateChange}
            />
          )}
        </Stack>
        {textOfHour && (
          <Stack direction="column" justify="center" items="stretch" w="100%" pv={10} spacing={10}>
            <Button
              mode="elevated"
              icon="clipboard-text-clock"
              elevation={1}
              textColor={Palette.White}
              buttonColor={Palette.Primary}
              style={{ borderRadius: 1200 }}
              labelStyle={{ lineHeight: 29 }}
              onPress={() => {
                navigation.navigate('Booking', {
                  textOfDay: textOfDay,
                  textOfHour: textOfHour,
                  services: services,
                  image: image,
                  title: title,
                });
              }}
            >
              <Text
                variant="titleLarge"
                style={{ fontFamily: KMFont.Medium, color: Palette.White }}
              >
                حجز موعد
              </Text>
            </Button>
          </Stack>
        )}
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
