import React from 'react';
import {
  StatusBar,
  StyleSheet,
  I18nManager,
  SafeAreaView,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import { firebase } from '../../config';
import { Flex, Stack } from '@react-native-material/core';
import { TextInput, Button } from 'react-native-paper';
import {
  validateEmailColor,
  validatePasswordColor,
  validateSignInFormSubmit,
} from '../hooks/useValidation.hook';

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
export default function Login() {
  // local hooks:
  const go = useNav();
  const openLink = useLink();
  const Palette = usePalette();

  // user inputs:
  const [localEmail, setLocalEmail] = React.useState('');
  const [localPassword, setLocalPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  // local handlers:
  userLogin = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(
        'البريد الالكتروني او رمز المرور الذي ادخلته قد يكون خاطئ او غير مسجل في التطبيق، حاول لاحقاً.'
      );
    }
  };

  // local ui:
  return (
    <SafeAreaView style={[Styles.SAVStyleForAndroid, { backgroundColor: Palette.darkBg }]}>
      <StatusBar backgroundColor="transparent" translucent />
      <BackPattern1 />
      <BackPattern2 />
      <BackPattern3 />
      <KeyboardAvoidingView role="form" behavior="height">
        {/* WELCOME ========================== */}
        <TitleAuth
          title="هلا فيك!"
          describe="تسجيل الدخول"
          source={require('../../assets/images/log-in.png')}
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
          <TextInput
            textContentType="password"
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={localPassword}
            onChangeText={(text) => setLocalPassword(text)}
            mode="outlined"
            autoCapitalize="none"
            contextMenuHidden
            cursorColor={validatePasswordColor(localPassword)}
            activeOutlineColor={validatePasswordColor(localPassword)}
            contentStyle={{ fontFamily: KMFont.Regular, fontSize: 17.5 }}
            style={{ backgroundColor: Palette.PrimLight, textAlign: 'auto' }}
            placeholderTextColor={Palette.SecDark}
            outlineStyle={{ borderRadius: 1000, borderWidth: 1 }}
          />
        </Stack>
        <Flex direction="row" justify="between" items="center" pv={5}>
          <Button
            icon={!showPassword ? 'eye' : 'eye-off'}
            mode="text"
            compact
            labelStyle={{
              fontFamily: KMFont.Regular,
              color: Palette.PrimLight,
            }}
            onPress={() => setShowPassword(!showPassword)}
          >
            {!showPassword ? 'اظهار رمز المرور' : 'اخفاء رمز المرور'}
          </Button>
          <Button
            mode="text"
            compact
            labelStyle={{
              fontFamily: KMFont.Regular,
              color: Palette.Info,
            }}
            onPress={() => go.to('resetPassword')}
          >
            نسيت رمز المرور؟
          </Button>
        </Flex>
        <Stack direction="column" justify="center" items="stretch" spacing={10}>
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
            onPress={() => userLogin(localEmail, localPassword)}
            disabled={validateSignInFormSubmit(localEmail, localPassword)}
          >
            دخول
          </Button>
          <Button
            icon="account-plus"
            mode="outlined"
            style={{ borderColor: Palette.Info, borderRadius: 1000 }}
            textColor={Palette.Info}
            labelStyle={{
              fontFamily: KMFont.Medium,
              fontSize: 15,
              lineHeight: 29,
            }}
            onPress={() => go.to('signup')}
          >
            مستخدم جديد؟ انشئ حسابك
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
});
