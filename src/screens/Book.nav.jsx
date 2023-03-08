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
import { ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { Stack } from '@react-native-material/core';
import { Button, Card, Divider, RadioButton, Switch, Text, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { firebase } from '../../config';
import usePalette from '../hooks/usePalette.hook';
import CartItem from '../components/CartItem.component';
import KMFont from '../hooks/useFont.hook';
// imports ////////////////////////////////

// react function /////////////////////////
export default function BookNav({ route }) {
  // local hooks:
  const navigation = useNavigation();
  const { title, price, prodNo, image } = route.params;
  const VAT = 0.15;
  const vatValue = price * VAT;
  const netPrice = price - vatValue;
  const deliver = price * 0.1;

  const [value, setValue] = React.useState('first');
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

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
        <CartItem title={title} price={price} image={image} prodNo={prodNo} />
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
                  كاش عند التوصيل
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
                  <MaterialCommunityIcons name="map-marker" size={25} color={Palette.Primary} />
                  <Text
                    variant="bodyLarge"
                    style={{ fontFamily: KMFont.Bold, color: Palette.Black }}
                  >
                    التوصيل الى:
                  </Text>
                </Stack>
                <Stack wrap direction="row" justify="start" items="center" spacing={2}>
                  <Text
                    variant="bodyLarge"
                    style={{ fontFamily: KMFont.Medium, color: Palette.Black }}
                  >
                    {userAllData.userAddress?.userReg}
                  </Text>
                  <Text>-</Text>
                  <Text
                    variant="bodyLarge"
                    style={{ fontFamily: KMFont.Medium, color: Palette.Black }}
                  >
                    {userAllData.userAddress?.userCity}
                  </Text>
                  <Text>-</Text>
                  <Text
                    variant="bodyLarge"
                    style={{ fontFamily: KMFont.Medium, color: Palette.Black }}
                  >
                    {userAllData.userAddress?.userDis}
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
                  <MaterialCommunityIcons name="truck-fast" size={25} color={Palette.Primary} />
                  <Text
                    variant="bodyLarge"
                    style={{ fontFamily: KMFont.Bold, color: Palette.Black }}
                  >
                    معلومات الشحن:
                  </Text>
                </Stack>

                <Text
                  variant="bodyLarge"
                  style={{ fontFamily: KMFont.Medium, color: Palette.Black }}
                >
                  توصيل سريع خلال 48 ساعة عند الدفع بالبطاقة الائتمانية
                </Text>
              </Stack>
              <Stack
                direction="row"
                justify="start"
                items="center"
                spacing={7}
                bg={Palette.White}
                ph={10}
                style={{ elevation: 2, borderRadius: 5 }}
                border={1}
                borderColor={Palette.SecDark2}
              >
                <Switch color={Palette.Primary} value={isSwitchOn} onValueChange={onToggleSwitch} />
                <Text variant="bodyLarge" style={{ fontFamily: KMFont.Bold, color: Palette.Black }}>
                  شخص آخر سيستلم الطلب
                </Text>
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
            بالضغط على (اتمام عملية الشراء) فانت توافق على سياسة الاستخدام والخصوصية
          </Text>
          <Button
            mode="elevated"
            icon="cart"
            elevation={1}
            textColor={Palette.White}
            buttonColor={Palette.Primary}
            style={{ borderRadius: 1200, flex: 1 }}
            labelStyle={{ lineHeight: 29 }}
            onPress={() => {
              alert('تمت عملية الشراء بنجاح');
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
          <Button
            mode="outlined"
            icon="delete"
            textColor={Palette.Red}
            style={{ borderRadius: 1200, flex: 1, borderColor: Palette.Red }}
            labelStyle={{ lineHeight: 29 }}
            onPress={() => {
              alert('تم الغاء عملية الشراء');
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
