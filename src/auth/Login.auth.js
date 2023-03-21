import React from 'react';
import {
  StatusBar,
  StyleSheet,
  I18nManager,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import { firebase } from '../../config';
import { Box, Flex, Stack } from '@react-native-material/core';
import { TextInput, Button, Divider, Card, Text } from 'react-native-paper';
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
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
            contentStyle={{ fontFamily: KMFont.Regular, fontSize: 17 }}
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
            cursorColor={validatePasswordColor(localPassword)}
            activeOutlineColor={validatePasswordColor(localPassword)}
            contentStyle={{ fontFamily: KMFont.Regular, fontSize: 17 }}
            style={{ backgroundColor: Palette.PrimLight, textAlign: 'auto' }}
            placeholderTextColor={Palette.SecDark}
            outlineStyle={{ borderRadius: 1000, borderWidth: 1 }}
            left={
              <TextInput.Icon
                icon={!showPassword ? 'eye' : 'eye-off'}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
          />
        </Stack>
        <Stack direction="column" justify="center" items="stretch" mt={12}>
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
        </Stack>
        {/* ===================================================== */}
        <Box bg={Palette.SecDark} h={1} mt={20} />
        {/* ===================================================== */}
        <Stack direction="row" justify="center" items="center" spacing={10} mt={12}>
          <Card
            mode="contained"
            style={{ backgroundColor: Palette.PrimLight, borderRadius: 8, flex: 0.5 }}
            onPress={() => userLogin('guest@carify.com', '000000')}
          >
            <Stack direction="column" justify="center" items="center" ph={12} pv={8}>
              <MaterialCommunityIcons name="star" color={Palette.Primary2} size={22} />
              <Text
                variant="bodyMedium"
                style={{
                  fontFamily: KMFont.Bold,
                  color: Palette.Primary2,
                }}
              >
                الدخول كضيف
              </Text>
            </Stack>
          </Card>
          <Card
            mode="contained"
            style={{ backgroundColor: Palette.PrimLight, borderRadius: 8, flex: 0.5 }}
            onPress={() => go.to('signup')}
          >
            <Stack direction="column" justify="center" items="center" ph={12} pv={8}>
              <MaterialCommunityIcons name="account-plus" color={Palette.Primary2} size={22} />
              <Text
                variant="bodyMedium"
                style={{
                  fontFamily: KMFont.Bold,
                  color: Palette.Primary2,
                }}
              >
                انشئ حساب جديد
              </Text>
            </Stack>
          </Card>
        </Stack>
        <Stack direction="column" justify="center" items="stretch" spacing={10} mt={12}>
          <Card
            mode="outlined"
            style={{
              backgroundColor: Palette.darkBg,
              borderRadius: 8,
              borderColor: Palette.darkBg,
            }}
            onPress={() => go.to('resetPassword')}
          >
            <Stack direction="row" justify="between" items="center" ph={12} pv={4}>
              <Stack direction="row" justify="start" items="center" spacing={5}>
                <MaterialCommunityIcons name="lock-question" color={Palette.SecLight} size={22} />
                <Text
                  variant="bodyMedium"
                  style={{
                    fontFamily: KMFont.Medium,
                    color: Palette.SecLight,
                    lineHeight: 29,
                  }}
                >
                  نسيت رمز المرور؟
                </Text>
              </Stack>
              <MaterialCommunityIcons name="chevron-left" color={Palette.SecLight} size={25} />
            </Stack>
          </Card>

          <Card
            mode="outlined"
            style={{
              backgroundColor: Palette.darkBg,
              borderRadius: 8,
              borderColor: Palette.darkBg,
            }}
            onPress={() => go.to('TOUAuth')}
          >
            <Stack direction="row" justify="between" items="center" ph={12} pv={4}>
              <Stack direction="row" justify="start" items="center" spacing={5}>
                <MaterialCommunityIcons name="shield-lock" color={Palette.SecLight} size={22} />
                <Text
                  variant="bodyMedium"
                  style={{
                    fontFamily: KMFont.Medium,
                    color: Palette.SecLight,
                    lineHeight: 29,
                  }}
                >
                  سياسة الإستخدام والخصوصية
                </Text>
              </Stack>
              <MaterialCommunityIcons name="chevron-left" color={Palette.SecLight} size={25} />
            </Stack>
          </Card>
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
