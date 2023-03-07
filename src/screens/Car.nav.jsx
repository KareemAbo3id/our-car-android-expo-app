import React from 'react';
import { StyleSheet, RefreshControl, View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Stack } from '@react-native-material/core';
import { ActivityIndicator, Button, Card, Text, TextInput } from 'react-native-paper';
import { firebase } from '../../config';
import KMFont from '../hooks/useFont.hook';
import usePalette from '../hooks/usePalette.hook';
import { SelectList } from 'react-native-dropdown-select-list';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import carMake from '../../data/carMake';
import carModel from '../../data/carModel';
import carYear from '../../data/carYear';
import { nextCarValid } from '../hooks/CheckerSignup.hook';
// imports ////////////////////////////////

// react function /////////////////////////
export default function CarNav() {
  // local hooks:
  const { currentUser } = firebase.auth();
  const [userAllData, setUserAllData] = React.useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const [updateUI, setUpdateUI] = React.useState(false);
  const Palette = usePalette();

  const [localMake, setLocalMake] = React.useState('');
  const [loaclModel, setLocalModel] = React.useState('');
  const [localYear, setLocalYear] = React.useState('');

  const [note, setNote] = React.useState('تم تحديث بيانات السيارة');

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

  const userUpdateCar = async (userMake, userModel, userYear) => {
    await firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .update({
        userCar: {
          userMake,
          userModel,
          userYear,
        },
      })
      .then(() => {
        alert('تم تحديث بيانات السيارة بنجاح');
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
              بيانات السيارة
            </Text>
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
                    الشركة
                  </Text>
                  <Text
                    variant="titleLarge"
                    style={{ fontFamily: KMFont.Medium, color: Palette.PrimDark }}
                  >
                    {userAllData?.userCar?.userMake}
                  </Text>
                </Stack>
                <Stack mt={10}>
                  <Text
                    variant="bodySmall"
                    style={{ fontFamily: KMFont.Regular, color: Palette.SecDark }}
                  >
                    الموديل
                  </Text>
                  <Text
                    variant="titleLarge"
                    style={{ fontFamily: KMFont.Medium, color: Palette.PrimDark }}
                  >
                    {userAllData?.userCar?.userModel}
                  </Text>
                </Stack>
                <Stack mt={10}>
                  <Text
                    variant="bodySmall"
                    style={{ fontFamily: KMFont.Regular, color: Palette.SecDark }}
                  >
                    السنة
                  </Text>
                  <Text
                    variant="titleLarge"
                    style={{ fontFamily: KMFont.Medium, color: Palette.PrimDark }}
                  >
                    {userAllData?.userCar?.userYear}
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
              تحديث بيانات السيارة
            </Button>
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
            تعديل بيانات السيارة
          </Text>
          <SelectList
            setSelected={setLocalMake}
            data={carMake}
            fontFamily={KMFont.Regular}
            search={false}
            dropdownStyles={[{ backgroundColor: Palette.White }, Styles.dropdownStyles]}
            boxStyles={[{ backgroundColor: Palette.White }, Styles.boxStyles]}
            inputStyles={{ color: Palette.Black, fontSize: 17.5 }}
            dropdownTextStyles={{ color: Palette.Black, fontSize: 17.5 }}
            placeholder="الشركة"
            arrowicon={
              <MaterialCommunityIcons name="menu-down" color={Palette.Primary} size={30} />
            }
          />
          {localMake && (
            <SelectList
              setSelected={setLocalModel}
              data={carModel[localMake]}
              fontFamily={KMFont.Regular}
              search={false}
              dropdownStyles={[{ backgroundColor: Palette.White }, Styles.dropdownStyles]}
              boxStyles={[{ backgroundColor: Palette.White }, Styles.boxStyles]}
              inputStyles={{ color: Palette.Black, fontSize: 17.5 }}
              dropdownTextStyles={{ color: Palette.Black, fontSize: 17.5 }}
              placeholder="الموديل"
              arrowicon={
                <MaterialCommunityIcons name="menu-down" color={Palette.Primary} size={30} />
              }
            />
          )}
          {loaclModel && (
            <SelectList
              setSelected={setLocalYear}
              data={carYear}
              fontFamily={KMFont.Regular}
              search={false}
              dropdownStyles={[{ backgroundColor: Palette.White }, Styles.dropdownStyles]}
              boxStyles={[{ backgroundColor: Palette.White }, Styles.boxStyles]}
              inputStyles={{ color: Palette.Black, fontSize: 17.5 }}
              dropdownTextStyles={{ color: Palette.Black, fontSize: 17.5 }}
              placeholder="السنة"
              arrowicon={
                <MaterialCommunityIcons name="menu-down" color={Palette.Primary} size={30} />
              }
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
            disabled={nextCarValid(localMake, loaclModel, localYear)}
            onPress={() => {
              userUpdateCar(localMake, loaclModel, localYear);
              setUpdateUI(!updateUI);
              onRefresh();
              setTimeout(() => {
                setLocalMake('');
                setLocalModel('');
                setLocalYear('');
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
              setLocalMake('');
              setLocalModel('');
              setLocalYear('');
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
