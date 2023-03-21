import React from 'react';
import {
  StatusBar,
  StyleSheet,
  I18nManager,
  SafeAreaView,
  KeyboardAvoidingView,
  View,
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { firebase } from '../../config';
import { Box, Divider, Flex, Stack } from '@react-native-material/core';
import { Button, Card, IconButton, Switch, Text, TextInput } from 'react-native-paper';
import carMake from '../../data/carMake';
import carModel from '../../data/carModel';
import carYear from '../../data/carYear';
import cit from '../../data/cit';
import reg from '../../data/reg';
import {
  validateNameColor,
  validateEmailColor,
  validatePasswordColor,
} from '../hooks/useValidation.hook';
// hooks:
import useNav from '../hooks/useNav.hook';
import KMFont from '../hooks/useFont.hook';
import usePalette from '../hooks/usePalette.hook';
import useLink from '../hooks/useLink.hook';
import TitleAuth from '../components/TitleAuth.component';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  nextCarValid,
  nextEmailValid,
  nextNameValid,
  nextPassValid,
} from '../hooks/CheckerSignup.hook';
import { BackPattern1, BackPattern2, BackPattern3 } from '../components/BackPattern.component';
// imports ////////////////////////////////

I18nManager.forceRTL(true);
I18nManager.allowRTL(true);

// react function /////////////////////////
export default function Signup() {
  // local hooks =============:
  const go = useNav();
  const openLink = useLink();
  const Palette = usePalette();

  // local hooks =============:
  const [localFName, setLocalFName] = React.useState('');
  const [localLName, setLocalLName] = React.useState('');

  const [localEmail, setLocalEmail] = React.useState('');
  const [localPassword, setLocalPassword] = React.useState('');
  const [conPassword, setConPassword] = React.useState('');

  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);

  const [TOUchecked, setTOUChecked] = React.useState(false);

  const [localMake, setLocalMake] = React.useState('');
  const [loaclModel, setLocalModel] = React.useState('');
  const [localYear, setLocalYear] = React.useState('');

  const [localReg, setLocalReg] = React.useState('');
  const [loaclCity, setLocalCity] = React.useState('');
  const [localDis, setLocalDis] = React.useState('');

  // signup steps =============:
  const [nameStep, setNameStep] = React.useState(true);
  const [emailStep, setEmailStep] = React.useState(false);
  const [passStep, setpassStep] = React.useState(false);
  const [TOUStep, setTOUStep] = React.useState(false);
  const [carStep, setCarStep] = React.useState(false);
  const [addressStep, setAddressStep] = React.useState(false);

  const [nameStepIcon, setNameStepIcon] = React.useState('account');
  const [emailStepIcon, setEmailStepIcon] = React.useState('email');
  const [passStepIcon, setpassStepIcon] = React.useState('lock');
  const [TOUStepIcon, setTOUStepIcon] = React.useState('checkbox-marked');
  const [carStepIcon, setCarStepIcon] = React.useState('car');
  const [addressStepIcon, setAddressStepIcon] = React.useState('map-marker');

  const [finishAll, setFinishAll] = React.useState(false);

  // reset sign up info handler =============:
  const resetSignUpForm = () => {
    setLocalFName('');
    setLocalLName('');
    setLocalEmail('');
    setNote('');
    setLocalPassword('');
    setConPassword('');
    setTOUChecked(false);
    setLocalMake('');
    setLocalModel('');
    setLocalYear('');
    setLocalReg('');
    setLocalCity('');
    setLocalDis('');
    setNameStep(true);
    setEmailStep(false);
    setpassStep(false);
    setTOUStep(false);
    setCarStep(false);
    setAddressStep(false);
    setNameStepIcon('account');
    setEmailStepIcon('email');
    setpassStepIcon('lock');
    setTOUStepIcon('checkbox-marked');
    setCarStepIcon('car');
    setAddressStepIcon('map-marker');
    setFinishAll(false);
  };

  // Creact Account handler =============:

  const userCreactAccount = async (
    userFname,
    userLname,
    userEmail,
    userPassword,
    userMake,
    userModel,
    userYear,
    userReg,
    userCity,
    userDis
  ) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(userEmail, userPassword)
      .then(() => {
        firebase
          .auth()
          .currentUser.sendEmailVerification({
            handleCodeInApp: true,
            url: 'https://ourcar-ec74b.firebaseapp.com/',
          })
          .then(() => {
            alert('تم ارسال رابط تفعيل الحساب الى بريدك الالكتروني');
          })
          .catch(() => {
            alert('خطأ غير معروف، حاول مرة اخرى');
          })
          .then(() => {
            firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
              userContact: {
                userFname,
                userLname,
                userEmail,
              },
              userCar: {
                userMake,
                userModel,
                userYear,
              },
              userAddress: {
                userReg,
                userCity,
                userDis,
              },
            });
          })
          .catch(() => {
            alert('خطأ غير معروف، حاول مرة اخرى');
          });
      })
      .catch(() => {
        alert('البريد الالكتروني المدخل مسجل بالفعل');
      });
  };

  // local ui:
  return (
    <SafeAreaView style={[Styles.SAVStyleForAndroid, { backgroundColor: Palette.darkBg }]}>
      <StatusBar backgroundColor="transparent" translucent />
      <KeyboardAvoidingView role="form" behavior="height">
        {/* WELCOME ========================== */}
        <Stack direction="row" justify="center" items="center" ph={10} pb={8}>
          {nameStep && (
            <TitleAuth
              title="نورتنا!"
              describe="ادخل اسمك"
              source={require('../../assets/images/sign-up.png')}
            />
          )}
          {emailStep && (
            <TitleAuth
              title="نورتنا!"
              describe="ادخل بريدك الالكتروني"
              source={require('../../assets/images/sign-up.png')}
            />
          )}
          {passStep && (
            <TitleAuth
              title="نورتنا!"
              describe="ادخل رمز المرور"
              source={require('../../assets/images/sign-up.png')}
            />
          )}
          {TOUStep && (
            <TitleAuth
              title="نورتنا!"
              describe="الموافقة على شروط الاستخدام"
              source={require('../../assets/images/sign-up.png')}
            />
          )}

          {carStep && (
            <TitleAuth
              title="نورتنا!"
              describe="ادخل بيانات سيارتك"
              source={require('../../assets/images/sign-up.png')}
            />
          )}
          {addressStep && (
            <TitleAuth
              title="نورتنا!"
              describe="ادخل عنوانك"
              source={require('../../assets/images/sign-up.png')}
            />
          )}
        </Stack>

        {/* STEPS ========================== */}
        <Stack direction="row" justify="between" items="center" ph={10} pb={15}>
          <MaterialCommunityIcons
            name={nameStepIcon}
            color={nameStepIcon === 'account' ? Palette.SecDark : Palette.Info}
            size={17}
          />
          <MaterialCommunityIcons
            name={emailStepIcon}
            color={emailStepIcon === 'email' ? Palette.SecDark : Palette.Info}
            size={18}
          />
          <MaterialCommunityIcons
            name={passStepIcon}
            color={passStepIcon === 'lock' ? Palette.SecDark : Palette.Info}
            size={18}
          />
          <MaterialCommunityIcons
            name={TOUStepIcon}
            color={TOUStepIcon === 'checkbox-marked' ? Palette.SecDark : Palette.Info}
            size={18}
          />
          <MaterialCommunityIcons
            name={carStepIcon}
            color={carStepIcon === 'car' ? Palette.SecDark : Palette.Info}
            size={18}
          />
          <MaterialCommunityIcons
            name={addressStepIcon}
            color={addressStepIcon === 'map-marker' ? Palette.SecDark : Palette.Info}
            size={18}
          />
        </Stack>

        {/* STEP TITLE ========================== */}

        {/* FORM ========================== */}
        <Stack direction="column" justify="center" items="stretch">
          {nameStep && (
            <View>
              {/* First Name */}
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
                  backgroundColor: Palette.PrimLight,
                  textAlign: 'auto',
                }}
                placeholderTextColor={Palette.SecDark}
                outlineStyle={{ borderRadius: 1000, borderWidth: 1 }}
              />
              {/* Last Name */}
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
                  backgroundColor: Palette.PrimLight,
                  textAlign: 'auto',
                }}
                placeholderTextColor={Palette.SecDark}
                outlineStyle={{ borderRadius: 1000, borderWidth: 1 }}
              />
              {/* NEXT NAME */}
              <Button
                mode="contained"
                icon="arrow-left-bold"
                elevation={5}
                buttonColor={Palette.Info}
                textColor={Palette.PrimLight}
                style={{ borderRadius: 1000, marginTop: 10 }}
                labelStyle={{
                  fontFamily: KMFont.Bold,
                  fontSize: 17,
                  lineHeight: 29,
                }}
                disabled={nextNameValid(localFName, localLName)}
                onPress={() => {
                  setNameStep(false);
                  setEmailStep(true);
                  setNameStepIcon('check-decagram');
                }}
              >
                التالي
              </Button>
            </View>
          )}
          {/* Email */}
          {emailStep && (
            <View>
              <TextInput
                keyboardType="email-address"
                textContentType="none"
                placeholder="New E-mail Address"
                value={localEmail}
                onChangeText={(text) => setLocalEmail(text)}
                mode="outlined"
                autoCapitalize="none"
                contextMenuHidden
                cursorColor={validateEmailColor(localEmail)}
                activeOutlineColor={validateEmailColor(localEmail)}
                contentStyle={{ fontFamily: KMFont.Regular, fontSize: 17.5 }}
                style={{
                  backgroundColor: Palette.PrimLight,
                  textAlign: 'auto',
                }}
                placeholderTextColor={Palette.SecDark}
                outlineStyle={{ borderRadius: 1000, borderWidth: 1 }}
              />
              {/* NEXT EMAIL */}
              <Button
                mode="contained"
                elevation={5}
                icon="arrow-left-bold"
                buttonColor={Palette.Info}
                textColor={Palette.PrimLight}
                style={{ borderRadius: 1000, marginTop: 10 }}
                labelStyle={{
                  fontFamily: KMFont.Bold,
                  fontSize: 17,
                  lineHeight: 29,
                }}
                disabled={nextEmailValid(localEmail)}
                onPress={() => {
                  setEmailStep(false);
                  setpassStep(true);
                  setEmailStepIcon('check-decagram');
                }}
              >
                التالي
              </Button>
            </View>
          )}
          {passStep && (
            <View>
              {/* Password */}
              <TextInput
                textContentType="password"
                placeholder="New Password"
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
                  backgroundColor: Palette.PrimLight,
                  textAlign: 'auto',
                }}
                placeholderTextColor={Palette.SecDark}
                outlineStyle={{ borderRadius: 1000, borderWidth: 1 }}
                left={
                  <TextInput.Icon
                    icon={!showPassword ? 'eye' : 'eye-off'}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
              />
              {/* Re Password */}
              <TextInput
                textContentType="password"
                placeholder="Re-type Password"
                secureTextEntry={!showPassword2}
                value={conPassword}
                onChangeText={(text) => setConPassword(text)}
                mode="outlined"
                autoCapitalize="none"
                contextMenuHidden
                cursorColor={validatePasswordColor(conPassword)}
                activeOutlineColor={validatePasswordColor(conPassword)}
                contentStyle={{ fontFamily: KMFont.Regular, fontSize: 17.5 }}
                style={{
                  backgroundColor: Palette.PrimLight,
                  textAlign: 'auto',
                }}
                placeholderTextColor={Palette.SecDark}
                outlineStyle={{ borderRadius: 1000, borderWidth: 1 }}
                left={
                  <TextInput.Icon
                    icon={!showPassword2 ? 'eye' : 'eye-off'}
                    onPress={() => setShowPassword2(!showPassword2)}
                  />
                }
              />

              {/* NEXT PASSWORD */}
              <Button
                icon="arrow-left-bold"
                mode="contained"
                elevation={5}
                buttonColor={Palette.Info}
                textColor={Palette.PrimLight}
                style={{ borderRadius: 1000, marginTop: 10 }}
                labelStyle={{
                  fontFamily: KMFont.Bold,
                  fontSize: 17,
                  lineHeight: 29,
                }}
                disabled={nextPassValid(conPassword, localPassword)}
                onPress={() => {
                  setpassStep(false);
                  setTOUStep(true);
                  setpassStepIcon('check-decagram');
                }}
              >
                التالي
              </Button>
            </View>
          )}
        </Stack>
        {/* TOUchecked */}
        {TOUStep && (
          <View>
            <Stack direction="row" justify="start" items="center" pv={5}>
              <Switch value={TOUchecked} onValueChange={setTOUChecked} color={Palette.Info} />
              <Text
                variant="bodyMedium"
                style={{
                  fontFamily: KMFont.Medium,
                  color: Palette.PrimLight,
                }}
              >
                اوافق على شروط الاستخدام والخصوصية
              </Text>
            </Stack>
            {/* NEXT TOUchecked */}
            <Button
              mode="contained"
              elevation={5}
              icon="arrow-left-bold"
              buttonColor={Palette.Info}
              textColor={Palette.PrimLight}
              style={{ borderRadius: 1000, marginTop: 10 }}
              labelStyle={{
                fontFamily: KMFont.Bold,
                fontSize: 17,
                lineHeight: 29,
              }}
              disabled={!TOUchecked ? true : false}
              onPress={() => {
                setTOUStep(false);
                setCarStep(true);
                setTOUStepIcon('check-decagram');
              }}
            >
              التالي
            </Button>
          </View>
        )}
        {/* CAR DATA */}
        {carStep && (
          <Stack direction="column" justify="center" items="stretch" spacing={8} pb={5}>
            <Box>
              <SelectList
                setSelected={setLocalMake}
                data={carMake}
                fontFamily={KMFont.Regular}
                search={false}
                dropdownStyles={[Styles.dropdownStyles, { backgroundColor: Palette.PrimLight }]}
                boxStyles={[{ backgroundColor: Palette.PrimLight }, Styles.boxStyles]}
                inputStyles={{ color: Palette.PrimDark, fontSize: 17.5 }}
                dropdownTextStyles={{ color: Palette.PrimDark, fontSize: 17.5 }}
                placeholder="الشركة"
                arrowicon={
                  <MaterialCommunityIcons name="menu-down" color={Palette.Info} size={30} />
                }
              />
            </Box>
            {localMake && (
              <Box>
                <SelectList
                  setSelected={setLocalModel}
                  data={carModel[localMake]}
                  fontFamily={KMFont.Regular}
                  search={false}
                  dropdownStyles={[Styles.dropdownStyles, { backgroundColor: Palette.PrimLight }]}
                  boxStyles={[{ backgroundColor: Palette.PrimLight }, Styles.boxStyles]}
                  inputStyles={{ color: Palette.PrimDark, fontSize: 17.5 }}
                  dropdownTextStyles={{
                    color: Palette.PrimDark,
                    fontSize: 17.5,
                  }}
                  placeholder="الموديل"
                  arrowicon={
                    <MaterialCommunityIcons name="menu-down" color={Palette.Info} size={30} />
                  }
                />
              </Box>
            )}
            {loaclModel && (
              <Box>
                <SelectList
                  setSelected={setLocalYear}
                  data={carYear}
                  fontFamily={KMFont.Regular}
                  search={false}
                  dropdownStyles={[{ backgroundColor: Palette.PrimLight }, Styles.dropdownStyles]}
                  boxStyles={[{ backgroundColor: Palette.PrimLight }, Styles.boxStyles]}
                  inputStyles={{ color: Palette.PrimDark, fontSize: 17.5 }}
                  dropdownTextStyles={{
                    color: Palette.PrimDark,
                    fontSize: 17.5,
                  }}
                  placeholder="السنة"
                  arrowicon={
                    <MaterialCommunityIcons name="menu-down" color={Palette.Info} size={30} />
                  }
                />
              </Box>
            )}
            {/* NEXT CAR DATA */}
            <Button
              mode="contained"
              elevation={5}
              icon="arrow-left-bold"
              buttonColor={Palette.Info}
              textColor={Palette.PrimLight}
              style={{ borderRadius: 1000, marginTop: 10 }}
              labelStyle={{
                fontFamily: KMFont.Bold,
                fontSize: 17,
                lineHeight: 29,
              }}
              disabled={nextCarValid(localMake, loaclModel, localYear)}
              onPress={() => {
                setCarStep(false);
                setAddressStep(true);
                setCarStepIcon('check-decagram');
              }}
            >
              التالي
            </Button>
          </Stack>
        )}
        {/* Address Data */}
        {addressStep && (
          <Stack direction="column" justify="center" items="stretch" spacing={8} pb={5}>
            <Box>
              <SelectList
                setSelected={setLocalReg}
                data={reg}
                fontFamily={KMFont.Regular}
                search={false}
                dropdownStyles={[{ backgroundColor: Palette.PrimLight }, Styles.dropdownStyles]}
                boxStyles={[{ backgroundColor: Palette.PrimLight }, Styles.boxStyles]}
                inputStyles={{ color: Palette.PrimDark, fontSize: 17.5 }}
                dropdownTextStyles={{ color: Palette.PrimDark, fontSize: 17.5 }}
                placeholder="المنطقة"
                arrowicon={
                  <MaterialCommunityIcons name="menu-down" color={Palette.Info} size={30} />
                }
              />
            </Box>
            {localReg && (
              <Box>
                <SelectList
                  setSelected={setLocalCity}
                  data={cit[localReg]}
                  fontFamily={KMFont.Regular}
                  search={false}
                  dropdownStyles={[{ backgroundColor: Palette.PrimLight }, Styles.dropdownStyles]}
                  boxStyles={[{ backgroundColor: Palette.PrimLight }, Styles.boxStyles]}
                  inputStyles={{ color: Palette.PrimDark, fontSize: 17.5 }}
                  dropdownTextStyles={{
                    color: Palette.PrimDark,
                    fontSize: 17.5,
                  }}
                  placeholder="المدينة"
                  arrowicon={
                    <MaterialCommunityIcons name="menu-down" color={Palette.Info} size={30} />
                  }
                />
              </Box>
            )}
            {loaclCity && (
              <Box>
                <TextInput
                  keyboardType="default"
                  textContentType="none"
                  placeholder="الحي"
                  value={localDis}
                  onChangeText={(name) => setLocalDis(name)}
                  mode="outlined"
                  contextMenuHidden
                  cursorColor={validateNameColor(localDis)}
                  activeOutlineColor={validateNameColor(localDis)}
                  contentStyle={{ fontFamily: KMFont.Regular, fontSize: 17.5 }}
                  style={{
                    backgroundColor: Palette.PrimLight,
                    textAlign: 'auto',
                  }}
                  placeholderTextColor={Palette.SecDark}
                  outlineStyle={{ borderRadius: 1000, borderWidth: 1 }}
                />
              </Box>
            )}
            {/* NEXT ADDRESS DATA */}
            <Button
              mode="contained"
              elevation={5}
              icon="arrow-left-bold"
              buttonColor={Palette.Info}
              textColor={Palette.PrimLight}
              style={{ borderRadius: 1000, marginTop: 10 }}
              labelStyle={{
                fontFamily: KMFont.Bold,
                fontSize: 17,
                lineHeight: 29,
              }}
              disabled={nextCarValid(localReg, loaclCity, localDis)}
              onPress={() => {
                setAddressStep(false);
                setFinishAll(true);
                setAddressStepIcon('check-decagram');
              }}
            >
              التالي
            </Button>
          </Stack>
        )}
        {/* SIGN UP BUTTON */}
        <Stack direction="column" justify="center" items="stretch" pt={10}>
          {finishAll && (
            <View>
              <Card
                style={{
                  borderRadius: 15,
                  backgroundColor: Palette.PrimLight,
                  marginBottom: 30,
                  overflow: 'hidden',
                  elevation: 30,
                }}
              >
                <Card.Content>
                  <View
                    style={{
                      position: 'absolute',
                      backgroundColor: Palette.Primary,
                      opacity: 0.15,
                      height: 300,
                      width: 250,
                      transform: [{ rotate: '44deg' }],
                      bottom: -50,
                      left: 200,
                      borderRadius: 50,
                    }}
                  />
                  <Text
                    variant="headlineSmall"
                    style={{
                      fontFamily: KMFont.Black,
                      color: Palette.Primary2,
                      fontSize: 22,
                    }}
                  >
                    {`👋 أهلاً، ${localFName} ${localLName}`}
                  </Text>
                  <Divider color={Palette.Primary} style={{ marginVertical: 8, opacity: 0.4 }} />
                  <Text
                    variant="bodyLarge"
                    style={{
                      fontFamily: KMFont.Medium,
                      color: Palette.Black,
                    }}
                  >
                    {`📧 الايميل: ${localEmail}`}
                  </Text>
                  <Text
                    variant="bodyLarge"
                    style={{
                      fontFamily: KMFont.Medium,
                      color: Palette.Black,
                    }}
                  >
                    {`🚗 السيارة: ${localMake} ${loaclModel} ${localYear}`}
                  </Text>
                  <Text
                    variant="bodyLarge"
                    style={{
                      fontFamily: KMFont.Medium,
                      color: Palette.Black,
                    }}
                  >
                    {`🗺️ العنوان: ${loaclCity} - ${localDis}`}
                  </Text>
                </Card.Content>
                <Card.Actions>
                  <IconButton
                    mode="contained"
                    containerColor={Palette.Primary}
                    icon="pencil"
                    iconColor={Palette.PrimLight}
                    onPress={() => {
                      resetSignUpForm();
                    }}
                  />
                </Card.Actions>
              </Card>
              <Button
                icon="lightning-bolt"
                mode="contained"
                elevation={5}
                buttonColor={Palette.Info}
                textColor={Palette.PrimLight}
                style={{ borderRadius: 1000 }}
                labelStyle={{
                  fontFamily: KMFont.Bold,
                  fontSize: 17,
                  lineHeight: 29,
                }}
                onPress={() => {
                  userCreactAccount(
                    localFName,
                    localLName,
                    localEmail,
                    localPassword,
                    localMake,
                    loaclModel,
                    localYear,
                    localReg,
                    loaclCity,
                    localDis
                  );
                }}
              >
                إنشاء
              </Button>
            </View>
          )}
          <Button
            icon="login"
            mode="outlined"
            style={{ borderColor: Palette.Info, borderRadius: 1000, marginTop: 10 }}
            textColor={Palette.Info}
            labelStyle={{
              fontFamily: KMFont.Medium,
              fontSize: 15,
              lineHeight: 29,
            }}
            onPress={() => go.to('login')}
          >
            لديك حساب مسجل؟ سجل دخولك
          </Button>
          <Button
            mode="text"
            labelStyle={{
              fontFamily: KMFont.Regular,
              color: Palette.SecDark,
              fontSize: 12,
            }}
            onPress={() => openLink('https://kareemabo3id.github.io/ourcar-TOU/')}
          >
            سياسة الاستخدام والخصوصية
          </Button>
        </Stack>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// local styles:
const Styles = StyleSheet.create({
  SAVStyleForAndroid: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 22,
  },
  dropdownStyles: {
    borderWidth: 0,
    width: '100%',
    elevation: 10,
    borderRadius: 15,
  },
  boxStyles: {
    borderWidth: 0,
    borderRadius: 1000,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
