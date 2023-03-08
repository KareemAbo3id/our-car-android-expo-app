/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-alert */
/* eslint-disable object-shorthand */
/* eslint-disable no-else-return */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable object-curly-newline */
import React from 'react';
import { ScrollView, StyleSheet, RefreshControl, Image } from 'react-native';
import { Stack } from '@react-native-material/core';
import { Button, Card, Divider, RadioButton, Text, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { firebase } from '../../config';
import usePalette from '../hooks/usePalette.hook';
import KMFont from '../hooks/useFont.hook';
// imports ////////////////////////////////

// react function /////////////////////////
export default function BookNav({ route }) {
  // local hooks:
  const navigation = useNavigation();
  const { title, image, services, textOfDay, textOfHour } = route.params;
  const [value, setValue] = React.useState('first');

  // local hooks:
  const Palette = usePalette();
  const [refreshing, setRefreshing] = React.useState(false);

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

  // onRefresh =============:
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getUserAllData();
    setTimeout(() => {
      setRefreshing(false);
    }, 800);
  }, []);

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
              <Text
                variant="headlineSmall"
                style={{ fontFamily: KMFont.Bold, color: Palette.Black }}
              >
                {title}
              </Text>
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
                    border={1}
                    borderColor={Palette.SecDark2}
                  >
                    <Text
                      variant="bodyLarge"
                      style={{ fontFamily: KMFont.Bold, color: Palette.Black }}
                    >
                      {i.serName}
                    </Text>
                    <Text
                      variant="bodyLarge"
                      style={{ fontFamily: KMFont.Bold, color: Palette.Info }}
                    >
                      {i.serPrice} ر.س
                    </Text>
                  </Stack>
                );
              })}
            </Stack>
          </Card.Content>
        </Card>
        <Card mode="elevated" elevation={2} style={{ backgroundColor: Palette.White }}>
          <Card.Content>
            <Stack direction="row" justify="start" items="stretch" w="100%" mb={15}>
              <Text variant="titleLarge" style={{ fontFamily: KMFont.Bold, color: Palette.Black }}>
                طريقة الدفع
              </Text>
            </Stack>

            <RadioButton.Group onValueChange={(newValue) => setValue(newValue)} value={value}>
              <Stack
                bg={Palette.White}
                ph={10}
                pv={10}
                style={{ elevation: 2, borderRadius: 5 }}
                border={1}
                borderColor={Palette.SecDark2}
                direction="row"
                justify="start"
                items="center"
                spacing={5}
                mb={5}
              >
                <RadioButton value="first" color={Palette.Info} />
                <Text
                  variant="titleLarge"
                  style={{ fontFamily: KMFont.Medium, color: Palette.Black }}
                >
                  كاش
                </Text>
                <MaterialCommunityIcons name="cash-multiple" size={20} color={Palette.Black} />
              </Stack>
              <Stack
                bg={Palette.White}
                ph={10}
                pv={10}
                style={{ elevation: 2, borderRadius: 5 }}
                border={1}
                borderColor={Palette.SecDark2}
                direction="column"
                justify="center"
                items="start"
                spacing={5}
              >
                <Stack direction="row" justify="start" items="center" spacing={5}>
                  <RadioButton value="second" color={Palette.Info} />
                  <Text
                    variant="titleLarge"
                    style={{ fontFamily: KMFont.Medium, color: Palette.Black }}
                  >
                    بطاقة إئتمانية
                  </Text>
                  <MaterialCommunityIcons name="credit-card" size={20} color={Palette.Black} />
                </Stack>
                {value === 'second' ? (
                  <Stack
                    spacing={10}
                    direction="column"
                    justify="start"
                    items="stretch"
                    w="100%"
                    mt={15}
                    pb={10}
                  >
                    <Text
                      variant="titleMedium"
                      style={{ fontFamily: KMFont.Bold, color: Palette.Black }}
                    >
                      ادخل بيانات البطاقة
                    </Text>
                    <TextInput
                      mode="outlined"
                      placeholder="رقم البطاقة: xxxx xxxx xxxx xxxx"
                      maxLength={16}
                      keyboardType="numeric"
                      contentStyle={{ fontFamily: KMFont.Regular, fontSize: 17.5 }}
                      style={{
                        backgroundColor: Palette.White,
                        textAlign: 'auto',
                      }}
                      placeholderTextColor={Palette.SecDark}
                      outlineStyle={{
                        borderRadius: 1000,
                        borderWidth: 1,
                        borderColor: Palette.SecDark2,
                      }}
                    />
                    <Stack
                      direction="row"
                      justify="between"
                      items="center"
                      border={1}
                      borderColor={Palette.SecDark2}
                      style={{ borderRadius: 1000 }}
                    >
                      <TextInput
                        mode="outlined"
                        placeholder="yy"
                        maxLength={2}
                        keyboardType="numeric"
                        contentStyle={{ fontFamily: KMFont.Regular, fontSize: 17.5 }}
                        style={{
                          flex: 0.25,
                          backgroundColor: 'transparent',
                          textAlign: 'center',
                        }}
                        placeholderTextColor={Palette.SecDark}
                        outlineStyle={{
                          borderColor: 'transparent',
                        }}
                      />
                      <Text style={{ color: Palette.SecDark2 }}>/</Text>
                      <TextInput
                        mode="outlined"
                        placeholder="mm"
                        maxLength={2}
                        keyboardType="numeric"
                        contentStyle={{ fontFamily: KMFont.Regular, fontSize: 17.5 }}
                        style={{
                          flex: 0.25,
                          backgroundColor: 'transparent',
                          textAlign: 'center',
                        }}
                        placeholderTextColor={Palette.SecDark}
                        outlineStyle={{
                          borderColor: 'transparent',
                        }}
                      />
                      <Text
                        style={{ backgroundColor: Palette.SecDark2, width: 1, height: '100%' }}
                      />
                      <TextInput
                        mode="outlined"
                        maxLength={3}
                        keyboardType="numeric"
                        placeholder="CVV"
                        contentStyle={{ fontFamily: KMFont.Regular, fontSize: 17.5 }}
                        style={{
                          flex: 0.5,
                          backgroundColor: 'transparent',
                          textAlign: 'center',
                        }}
                        placeholderTextColor={Palette.SecDark}
                        outlineStyle={{
                          borderColor: 'transparent',
                        }}
                      />
                    </Stack>
                    <TextInput
                      mode="outlined"
                      placeholder="الاسم على البطاقة"
                      contentStyle={{ fontFamily: KMFont.Regular, fontSize: 17.5 }}
                      style={{
                        backgroundColor: Palette.White,
                        textAlign: 'auto',
                      }}
                      placeholderTextColor={Palette.SecDark}
                      outlineStyle={{
                        borderRadius: 1000,
                        borderWidth: 1,
                        borderColor: Palette.SecDark2,
                      }}
                    />
                  </Stack>
                ) : null}
              </Stack>
            </RadioButton.Group>

            <Divider style={{ backgroundColor: Palette.Black, marginTop: 15 }} />

            <Stack spacing={10} direction="column" justify="start" items="stretch" w="100%" mt={15}>
              <Stack
                direction="column"
                items="start"
                justify="center"
                bg={Palette.White}
                ph={10}
                pv={10}
                style={{ elevation: 2, borderRadius: 5 }}
                border={1}
                borderColor={Palette.SecDark2}
                wrap
              >
                <Stack wrap direction="row" justify="start" items="center" spacing={2}>
                  <MaterialCommunityIcons name="car" size={25} color={Palette.Primary} />
                  <Text
                    variant="bodyLarge"
                    style={{ fontFamily: KMFont.Bold, color: Palette.Black }}
                  >
                    السيارة:
                  </Text>
                </Stack>
                <Stack wrap direction="row" justify="start" items="center" spacing={2}>
                  <Text
                    variant="bodyLarge"
                    style={{ fontFamily: KMFont.Medium, color: Palette.Black }}
                  >
                    {userAllData.userCar?.userMake}
                  </Text>
                  <Text>-</Text>
                  <Text
                    variant="bodyLarge"
                    style={{ fontFamily: KMFont.Medium, color: Palette.Black }}
                  >
                    {userAllData.userCar?.userModel}
                  </Text>
                  <Text>-</Text>
                  <Text
                    variant="bodyLarge"
                    style={{ fontFamily: KMFont.Medium, color: Palette.Black }}
                  >
                    {userAllData.userCar?.userYear}
                  </Text>
                </Stack>
              </Stack>
              <Stack
                direction="column"
                items="start"
                justify="center"
                bg={Palette.White}
                ph={10}
                pv={10}
                style={{ elevation: 2, borderRadius: 5 }}
                border={1}
                borderColor={Palette.SecDark2}
                wrap
              >
                <Stack wrap direction="row" justify="start" items="center" spacing={2}>
                  <MaterialCommunityIcons name="clock" size={25} color={Palette.Primary} />
                  <Text
                    variant="bodyLarge"
                    style={{ fontFamily: KMFont.Bold, color: Palette.Black }}
                  >
                    الموعد:
                  </Text>
                </Stack>
                <Stack wrap direction="row" justify="start" items="center" spacing={2}>
                  <Text
                    variant="bodyLarge"
                    style={{ fontFamily: KMFont.Medium, color: Palette.Black }}
                  >
                    يوم {textOfDay}
                  </Text>
                  <Text>-</Text>
                  <Text
                    variant="bodyLarge"
                    style={{ fontFamily: KMFont.Medium, color: Palette.Black }}
                  >
                    الساعة {textOfHour}
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          </Card.Content>
        </Card>
        <Stack direction="column" justify="center" items="stretch" w="100%" pv={20} spacing={10}>
          <Text
            variant="bodyMedium"
            style={{
              fontFamily: KMFont.Regular,
              color: Palette.SecDark,
              paddingHorizontal: 10,
              paddingBottom: 10,
            }}
          >
            بالضغط على (تأكيد حجز الموعد) فانت توافق على سياسة الاستخدام والخصوصية
          </Text>
          <Button
            mode="elevated"
            icon="calendar-blank"
            elevation={1}
            textColor={Palette.White}
            buttonColor={Palette.Primary}
            style={{ borderRadius: 1200, flex: 1 }}
            labelStyle={{ lineHeight: 29 }}
            onPress={() => {
              alert('تم حجز موعدك بنجاح');
              navigation.navigate('Receipt', {
                title: title,
                textOfDay: textOfDay,
                textOfHour: textOfHour,
              });
            }}
          >
            <Text variant="titleLarge" style={{ fontFamily: KMFont.Medium, color: Palette.White }}>
              تأكيد حجز الموعد
            </Text>
          </Button>
          <Button
            mode="outlined"
            icon="delete"
            textColor={Palette.Red}
            style={{ borderRadius: 1200, flex: 1, borderColor: Palette.Red }}
            labelStyle={{ lineHeight: 29 }}
            onPress={() => {
              alert('تم الغاء عملية الحجز');
              navigation.goBack();
            }}
          >
            <Text variant="titleLarge" style={{ fontFamily: KMFont.Medium, color: Palette.Red }}>
              إلغاء
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
