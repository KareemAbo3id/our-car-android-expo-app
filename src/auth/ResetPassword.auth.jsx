import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  I18nManager,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import { firebase } from '../../config';
import { Flex, Stack } from '@react-native-material/core';
import { Button, TextInput } from 'react-native-paper';
import { validateEmailColor, validateForgotPasswordFormSubmit } from '../hooks/useValidation.hook';

// hooks:
import useNav from '../hooks/useNav.hook';
import KMFont from '../hooks/useFont.hook';
import usePalette from '../hooks/usePalette.hook';
import useLink from '../hooks/useLink.hook';
import TitleAuth from '../components/TitleAuth.component';
import { BackPattern1, BackPattern2, BackPattern3 } from '../components/BackPattern.component';
// imports ////////////////////////////////

I18nManager.forceRTL(true);
I18nManager.allowRTL(true);

// react function /////////////////////////
export default function ResetPassword() {
  // local hooks =============:
  const go = useNav();
  const openLink = useLink();
  const Palette = usePalette();

  // user inputs =============:
  const [localEmail, setLocalEmail] = useState('');
  const [updateEmailSent, setUpdateEmailSent] = useState(false);

  // forget password handler =============:
  const userResetPassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(localEmail)
      .then(() => {
        setUpdateEmailSent(true);
      })
      .catch(() => {
        alert('حدث خطأ، حاول مرة اخرى');
      });
  };

  // local ui =============:

  return (
    <SafeAreaView style={[Styles.SAVStyleForAndroid, { backgroundColor: Palette.darkBg }]}>
      <StatusBar backgroundColor="transparent" translucent />
      <BackPattern1 />
      <BackPattern2 />
      <BackPattern3 />
      {!updateEmailSent ? (
        <KeyboardAvoidingView role="form" behavior="height">
          {/* WELCOME ========================== */}
          <TitleAuth
            title="نسيت رمز مرورك؟"
            describe="ادخل بريدك الالكتروني لارسال رابط تهيئة رمز المرور"
            source={require('../../assets/images/reset-pass.png')}
          />
          {/* WELCOME ========================== */}
          <Stack direction="column" justify="center" items="stretch">
            <TextInput
              keyboardType="email-address"
              textContentType="emailAddress"
              placeholder="E-mail Address"
              value={localEmail}
              onChangeText={(text) => setLocalEmail(text)}
              mode="outlined"
              autoCapitalize="none"
              contextMenuHidden
              cursorColor={validateEmailColor(localEmail)}
              activeOutlineColor={validateEmailColor(localEmail)}
              contentStyle={{ fontFamily: KMFont.Regular, fontSize: 17.5 }}
              style={{ backgroundColor: Palette.PrimLight, textAlign: 'auto' }}
              placeholderTextColor={Palette.SecDark}
              outlineStyle={{ borderRadius: 1000, borderWidth: 1 }}
            />
          </Stack>
          <Flex direction="row" justify="between" items="center" pv={5}></Flex>
          <Stack direction="column" justify="center" items="stretch">
            <Button
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
              disabled={validateForgotPasswordFormSubmit(localEmail)}
              onPress={() => userResetPassword()}
            >
              ارسال
            </Button>
            <Button
              mode="text"
              textColor={Palette.Info}
              labelStyle={{
                fontFamily: KMFont.Regular,
                fontSize: 17,
                lineHeight: 29,
              }}
              onPress={() => go.to('login')}
            >
              رجوع
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
      ) : (
        <Flex direction="column" items="center" justify="center">
          <TitleAuth
            title="تم ارسال رابط تهيئة رمز المرور"
            source={require('../../assets/images/email-ver.png')}
          />
          <Button
            mode="text"
            textColor={Palette.Info}
            labelStyle={{
              fontFamily: KMFont.Regular,
              fontSize: 17,
              lineHeight: 29,
            }}
            onPress={() => go.to('login')}
          >
            رجوع
          </Button>
        </Flex>
      )}
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  SAVStyleForAndroid: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 22,
  },
});
