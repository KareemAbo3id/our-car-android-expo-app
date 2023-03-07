/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-alert */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable object-curly-newline */
import React from 'react';
import { StyleSheet, RefreshControl, View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Flex, Stack } from '@react-native-material/core';
import { ActivityIndicator, Button, Card, Text, TextInput } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { firebase } from '../../config';
import Version from '../components/Version.component';
import KMFont from '../hooks/useFont.hook';
import usePalette from '../hooks/usePalette.hook';
import { validateNameColor, validatePasswordColor } from '../hooks/useValidation.hook';
import { nextNameValid, nextPassValid } from '../hooks/CheckerSignup.hook';
// imports ////////////////////////////////

// react function /////////////////////////
export default function SettingNav() {
  // local hooks:
  const { currentUser } = firebase.auth();
  const { credential } = firebase.auth.EmailAuthProvider;
  const [userAllData, setUserAllData] = React.useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const [updatePassUI, setUpdatePassUI] = React.useState(false);
  const [updateNameUI, setUpdateNameUI] = React.useState(false);
  const Palette = usePalette();

  const [localFName, setLocalFName] = React.useState('');
  const [localLName, setLocalLName] = React.useState('');

  const [localPassword, setLocalPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');

  const [showPassword, setShowPassword] = React.useState(false);

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

  const userUpdateName = async (userFname, userLname) => {
    await firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .update({
        userContact: {
          userFname,
          userLname,
          userEmail: userAllData.userContact.userEmail,
        },
      })
      .then(() => {
        alert('تم تحديث الاسم بنجاح');
      })
      .catch(() => alert('حدث خطأ. حاول مرة اخرة'));
  };

  const userReAuthenticate = (newPass) => {
    const userCredential = credential(currentUser.email, newPass);
    return currentUser.reauthenticateWithCredential(userCredential);
  };
  const userUpdatePassword = () => {
    userReAuthenticate(localPassword)
      .then(() => {
        currentUser.updatePassword(newPassword).then(() => {
          alert('تم تحديث رمز المرور بنجاح');
        });
      })
      .catch(() => alert('تأكد من صحة رمز المرور'));
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

  // local ui:
  if (!updateNameUI && !updatePassUI) {
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
        <Stack
          justify="center"
          items="stretch"
          direction="column"
          ph={20}
          pv={5}
          mt={20}
          spacing={10}
        >
          <Text variant="titleSmall" style={{ fontFamily: KMFont.Bold, color: Palette.SecDark }}>
            الاعدادات
          </Text>
          <Card
            onPress={() => {
              setUpdatePassUI(true);
            }}
            mode="elevated"
            style={{ backgroundColor: Palette.White }}
          >
            <Card.Content
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                flexWrap: 'wrap',
                gap: 5,
              }}
            >
              <MaterialCommunityIcons name="key" size={18} color={Palette.Primary2} />
              <Text
                variant="bodyLarge"
                style={{
                  fontFamily: KMFont.Medium,
                  color: Palette.Primary2,
                }}
              >
                تحديث رمز المرور
              </Text>
            </Card.Content>
          </Card>
          <Card
            onPress={() => {
              setUpdateNameUI(true);
            }}
            mode="elevated"
            style={{ backgroundColor: Palette.White }}
          >
            <Card.Content
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                flexWrap: 'wrap',
                gap: 5,
              }}
            >
              <MaterialCommunityIcons name="rename-box" size={18} color={Palette.Primary2} />
              <Text
                variant="bodyLarge"
                style={{
                  fontFamily: KMFont.Medium,
                  color: Palette.Primary2,
                }}
              >
                تحديث الاسم
              </Text>
            </Card.Content>
          </Card>
        </Stack>
        <Stack
          justify="center"
          items="stretch"
          direction="column"
          ph={20}
          mt={20}
          pv={5}
          spacing={10}
        >
          <Version />
        </Stack>
      </ScrollView>
    );
  }

  if (updateNameUI) {
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
              تعديل الاسم
            </Text>
            <TextInput
              keyboardType="default"
              textContentType="none"
              placeholder="First Name"
              value={localFName}
              onChangeText={(name) => setLocalFName(name)}
              mode="outlined"
              contextMenuHidden
              cursorColor={validateNameColor(localFName)}
              activeOutlineColor={validateNameColor(localFName)}
              contentStyle={{ fontFamily: KMFont.Regular, fontSize: 17.5 }}
              style={{
                backgroundColor: Palette.White,
                textAlign: 'auto',
              }}
              placeholderTextColor={Palette.SecDark}
              outlineStyle={{ borderRadius: 1000, borderWidth: 1, borderColor: Palette.SecDark2 }}
            />

            <TextInput
              keyboardType="default"
              textContentType="none"
              placeholder="Last Name"
              value={localLName}
              onChangeText={(name) => setLocalLName(name)}
              mode="outlined"
              contextMenuHidden
              cursorColor={validateNameColor(localLName)}
              activeOutlineColor={validateNameColor(localLName)}
              contentStyle={{ fontFamily: KMFont.Regular, fontSize: 17.5 }}
              style={{
                backgroundColor: Palette.White,
                textAlign: 'auto',
              }}
              placeholderTextColor={Palette.SecDark}
              outlineStyle={{ borderRadius: 1000, borderWidth: 1, borderColor: Palette.SecDark2 }}
            />

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
              disabled={nextNameValid(localFName, localLName)}
              onPress={() => {
                userUpdateName(localFName, localLName);
                setUpdateNameUI(!updateNameUI);
                onRefresh();
                setTimeout(() => {
                  setLocalFName('');
                  setLocalLName('');
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
                setUpdateNameUI(!updateNameUI);
                setLocalFName('');
                setLocalLName('');
              }}
            >
              الغاء
            </Button>
          </Stack>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }

  if (updatePassUI) {
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
              تعديل رمز المرور
            </Text>
            <TextInput
              textContentType="password"
              placeholder="رمز المرور الحالي"
              secureTextEntry={!showPassword}
              value={localPassword}
              onChangeText={(text) => setLocalPassword(text)}
              mode="outlined"
              autoCapitalize="none"
              contextMenuHidden
              cursorColor={validatePasswordColor(localPassword)}
              activeOutlineColor={validatePasswordColor(localPassword)}
              contentStyle={{ fontFamily: KMFont.Regular, fontSize: 17.5 }}
              style={{
                backgroundColor: Palette.White,
                textAlign: 'auto',
              }}
              placeholderTextColor={Palette.SecDark}
              outlineStyle={{ borderRadius: 1000, borderWidth: 1, borderColor: Palette.SecDark2 }}
            />
            {/* Re Password */}
            <TextInput
              textContentType="password"
              placeholder="رمز المرور الجديد"
              secureTextEntry={!showPassword}
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
              mode="outlined"
              autoCapitalize="none"
              contextMenuHidden
              cursorColor={validatePasswordColor(newPassword)}
              activeOutlineColor={validatePasswordColor(newPassword)}
              contentStyle={{ fontFamily: KMFont.Regular, fontSize: 17.5 }}
              style={{
                backgroundColor: Palette.White,
                textAlign: 'auto',
              }}
              placeholderTextColor={Palette.SecDark}
              outlineStyle={{ borderRadius: 1000, borderWidth: 1, borderColor: Palette.SecDark2 }}
            />
            <Flex direction="row" justify="between" items="center">
              {/* Show / Hide Pass */}
              <Button
                icon={!showPassword ? 'eye' : 'eye-off'}
                mode="text"
                compact
                labelStyle={{
                  fontFamily: KMFont.Regular,
                  color: Palette.Primary,
                }}
                onPress={() => setShowPassword(!showPassword)}
              >
                {!showPassword ? 'اظهار رمز المرور' : 'اخفاء رمز المرور'}
              </Button>
            </Flex>
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
              disabled={nextPassValid(newPassword, localPassword)}
              onPress={() => {
                userUpdatePassword();
                setUpdatePassUI(!updatePassUI);
                onRefresh();
                setTimeout(() => {
                  setLocalPassword('');
                  setNewPassword('');
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
                setUpdatePassUI(!updatePassUI);
                setLocalPassword('');
                setNewPassword('');
              }}
            >
              الغاء
            </Button>
          </Stack>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

// local styles:
const Styles = StyleSheet.create({
  SAVStyleForAndroid: {
    flex: 1,
  },
});
