import React from 'react';
import {
  StyleSheet,
  RefreshControl,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Stack } from '@react-native-material/core';
import { ActivityIndicator, Avatar, Button, Card, Text, TextInput } from 'react-native-paper';
import { firebase } from '../../config';
import KMFont from '../hooks/useFont.hook';
import usePalette from '../hooks/usePalette.hook';
import { SelectList } from 'react-native-dropdown-select-list';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import cit from '../../data/cit';
import reg from '../../data/reg';
import { nextCarValid } from '../hooks/CheckerSignup.hook';
import { validateNameColor } from '../hooks/useValidation.hook';
import { LinearGradient } from 'expo-linear-gradient';
// imports ////////////////////////////////

const { height, width } = Dimensions.get('window');

// react function /////////////////////////
export default function AddressNav() {
  // local hooks:
  const { currentUser } = firebase.auth();
  const [userAllData, setUserAllData] = React.useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const [updateUI, setUpdateUI] = React.useState(false);
  const Palette = usePalette();

  const [localReg, setLocalReg] = React.useState('');
  const [loaclCity, setLocalCity] = React.useState('');
  const [localDis, setLocalDis] = React.useState('');

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

  // local handlers:

  const userUpdateAddress = async (userReg, userCity, userDis) => {
    await firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .update({
        userAddress: {
          userReg,
          userCity,
          userDis,
        },
      })
      .then(() => {
        alert('تم تحديث العنوان بنجاح');
      })
      .catch(() => alert('حدث خطأ. حاول مرة اخرة'));
  };

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

  if (!updateUI) {
    return (
      <ScrollView
        style={Styles.SAVStyleForAndroid}
        refreshControl={
          <RefreshControl
            colors={[Palette.Primary]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <KeyboardAvoidingView behavior="height">
          <Stack justify="center" items="stretch" direction="column" spacing={10} mt={20}>
            <LinearGradient
              colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.2)']}
              style={{
                height: height * 0.15,
                top: 0,
              }}
            />
            <Avatar.Icon
              icon="map-marker"
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

            <Stack items="center" justify="center" direction="row" spacing={5} mt={30} wrap>
              <Text
                variant="headlineSmall"
                style={{ fontFamily: KMFont.Bold, color: Palette.PrimDark }}
              >
                {userAllData?.userAddress?.userReg}
              </Text>
              <Text style={{ fontFamily: KMFont.Bold, color: Palette.PrimDark }}>-</Text>
              <Text
                variant="headlineSmall"
                style={{ fontFamily: KMFont.Bold, color: Palette.PrimDark }}
              >
                {userAllData?.userAddress?.userCity}
              </Text>
              <Text style={{ fontFamily: KMFont.Bold, color: Palette.PrimDark }}>-</Text>
              <Text
                variant="headlineSmall"
                style={{ fontFamily: KMFont.Bold, color: Palette.PrimDark }}
              >
                {userAllData?.userAddress?.userDis}
              </Text>
            </Stack>
            <Stack ph={20} mt={20} spacing={15}>
              <Card style={{ backgroundColor: Palette.White }} mode="elevated">
                <Card.Content
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    gap: 5,
                  }}
                >
                  <Stack>
                    <Text
                      variant="bodySmall"
                      style={{ fontFamily: KMFont.Regular, color: Palette.SecDark }}
                    >
                      المنطفة
                    </Text>
                    <Text
                      variant="titleLarge"
                      style={{ fontFamily: KMFont.Medium, color: Palette.PrimDark }}
                    >
                      {userAllData?.userAddress?.userReg}
                    </Text>
                  </Stack>
                  <Stack mt={10}>
                    <Text
                      variant="bodySmall"
                      style={{ fontFamily: KMFont.Regular, color: Palette.SecDark }}
                    >
                      المدينة
                    </Text>
                    <Text
                      variant="titleLarge"
                      style={{ fontFamily: KMFont.Medium, color: Palette.PrimDark }}
                    >
                      {userAllData?.userAddress?.userCity}
                    </Text>
                  </Stack>
                  <Stack mt={10}>
                    <Text
                      variant="bodySmall"
                      style={{ fontFamily: KMFont.Regular, color: Palette.SecDark }}
                    >
                      الحي
                    </Text>
                    <Text
                      variant="titleLarge"
                      style={{ fontFamily: KMFont.Medium, color: Palette.PrimDark }}
                    >
                      {userAllData?.userAddress?.userDis}
                    </Text>
                  </Stack>
                </Card.Content>
              </Card>
              <Button
                mode="contained"
                elevation={5}
                icon="pencil"
                buttonColor={Palette.Primary}
                textColor={Palette.White}
                style={{ borderRadius: 1000, marginTop: 10 }}
                labelStyle={{
                  fontFamily: KMFont.Bold,
                  fontSize: 17,
                  lineHeight: 29,
                }}
                onPress={() => {
                  setUpdateUI(true);
                }}
              >
                تحديث العنوان
              </Button>
            </Stack>
          </Stack>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={Styles.SAVStyleForAndroid}
      refreshControl={
        <RefreshControl colors={[Palette.Primary]} refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <KeyboardAvoidingView behavior="height">
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
            تعديل العنوان
          </Text>
          <SelectList
            setSelected={setLocalReg}
            data={reg}
            fontFamily={KMFont.Regular}
            search={false}
            dropdownStyles={[{ backgroundColor: Palette.White }, Styles.dropdownStyles]}
            boxStyles={[{ backgroundColor: Palette.White }, Styles.boxStyles]}
            inputStyles={{ color: Palette.Black, fontSize: 17.5 }}
            dropdownTextStyles={{ color: Palette.Black, fontSize: 17.5 }}
            placeholder="المنطقة"
            arrowicon={
              <MaterialCommunityIcons name="menu-down" color={Palette.Primary} size={30} />
            }
          />
          {localReg && (
            <SelectList
              setSelected={setLocalCity}
              data={cit[localReg]}
              fontFamily={KMFont.Regular}
              search={false}
              dropdownStyles={[{ backgroundColor: Palette.White }, Styles.dropdownStyles]}
              boxStyles={[{ backgroundColor: Palette.White }, Styles.boxStyles]}
              inputStyles={{ color: Palette.Black, fontSize: 17.5 }}
              dropdownTextStyles={{ color: Palette.Black, fontSize: 17.5 }}
              placeholder="المدينة"
              arrowicon={
                <MaterialCommunityIcons name="menu-down" color={Palette.Primary} size={30} />
              }
            />
          )}
          {loaclCity && (
            <TextInput
              keyboardType="default"
              mode="outlined"
              textContentType="none"
              placeholder="الحي"
              value={localDis}
              onChangeText={(name) => setLocalDis(name)}
              contextMenuHidden
              cursorColor={validateNameColor(localDis)}
              activeOutlineColor={validateNameColor(localDis)}
              contentStyle={{ fontFamily: KMFont.Regular, fontSize: 17.5 }}
              style={{
                backgroundColor: Palette.White,
                textAlign: 'auto',
                marginTop: 5,
              }}
              placeholderTextColor={Palette.SecDark}
              outlineStyle={{ borderRadius: 1000, borderWidth: 1, borderColor: Palette.SecDark2 }}
            />
          )}
          <Button
            mode="contained"
            elevation={5}
            icon="content-save-outline"
            buttonColor={Palette.Primary}
            textColor={Palette.White}
            style={{ borderRadius: 1000, marginTop: 10 }}
            labelStyle={{
              fontFamily: KMFont.Bold,
              fontSize: 17,
              lineHeight: 29,
            }}
            disabled={nextCarValid(localReg, loaclCity, localDis)}
            onPress={() => {
              userUpdateAddress(localReg, loaclCity, localDis);
              setUpdateUI(!updateUI);
              onRefresh();
              setTimeout(() => {
                setLocalReg('');
                setLocalCity('');
                setLocalDis('');
              }, 500);
            }}
          >
            حفظ
          </Button>
          <Button
            mode="text"
            textColor={Palette.Primary}
            style={{ borderRadius: 1000, marginTop: 10 }}
            labelStyle={{
              fontFamily: KMFont.Bold,
              fontSize: 17,
              lineHeight: 29,
            }}
            onPress={() => {
              setUpdateUI(!updateUI);
              setLocalReg('');
              setLocalCity('');
              setLocalDis('');
            }}
          >
            الغاء
          </Button>
        </Stack>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

// local styles:
const Styles = StyleSheet.create({
  SAVStyleForAndroid: {
    flex: 1,
  },
  dropdownStyles: {
    borderWidth: 0,
    width: '100%',
    elevation: 2,
    borderRadius: 15,
  },
  boxStyles: {
    borderWidth: 0,
    borderRadius: 1000,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    elevation: 2,
  },
});
