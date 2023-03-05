import React from 'react';
import { firebase } from '../../config';
import { StatusBar, StyleSheet, I18nManager, SafeAreaView } from 'react-native';
import { Box, Flex } from '@react-native-material/core';
import { Button, Text } from 'react-native-paper';

// hooks:
import useNav from '../hooks/useNav.hook';
import KMFont from '../hooks/useFont.hook';
import usePalette from '../hooks/usePalette.hook';
import useLink from '../hooks/useLink.hook';
import TitleAuth from '../components/TitleAuth.component';
// imports ////////////////////////////////

I18nManager.forceRTL(true);
I18nManager.allowRTL(true);

// react function /////////////////////////
export default function EmailVer() {
  // local hooks =============:
  const go = useNav();
  const openLink = useLink();
  const Palette = usePalette();

  // reSendVerEmail =============:
  const reSendVerEmail = async () => {
    await firebase
      .auth()
      .currentUser.sendEmailVerification({
        handleCodeInApp: true,
        url: 'https://ourcar-ec74b.firebaseapp.com',
      })
      .then(() => {
        alert('تم ارسال رابط تفعيل الحساب الى بريدك الالكتروني');
      })
      .catch(() => {
        alert('خطأ غير معروف، حاول مرة اخرى');
      });
  };

  // local ui =============:
  return (
    <SafeAreaView style={[Styles.SAVStyleForAndroid, { backgroundColor: Palette.darkBg }]}>
      <StatusBar backgroundColor="transparent" translucent />
      <Flex direction="column" items="center" justify="center">
        <TitleAuth
          title="فعّل حسابك"
          describe="تم ارسال رابط تفعيل الحساب الى بريدك الالكتروني الرجاء تفعيل الحساب ثم تسجيل الدخول"
          source={require('../../assets/images/email-ver.png')}
        />
        <Box pv={20}>
          {/* 3 LOGIN BUTTON ================================ */}
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
            onPress={() => {
              firebase.auth().signOut();
            }}
          >
            التوجه الى صفحة تسجيل الدخول
          </Button>
          <Button
            icon="email-fast"
            mode="outlined"
            style={{ borderColor: Palette.Info, borderRadius: 1000, marginTop: 10 }}
            textColor={Palette.Info}
            labelStyle={{
              fontFamily: KMFont.Medium,
              fontSize: 15,
              lineHeight: 29,
            }}
            onPress={() => reSendVerEmail()}
          >
            ارسال الرابط مجدداً
          </Button>
        </Box>
        <Text
          style={{ textAlign: 'center', fontFamily: KMFont.Regular, color: Palette.SecDark }}
          variant="bodyMedium"
        >
          تحقق من صندوق الرسائل غير المرغوب فيها او spam
        </Text>
        <Text
          style={{ textAlign: 'center', fontFamily: KMFont.Regular, color: Palette.SecDark }}
          variant="bodyMedium"
        >
          ذلك لأن النسخة مازلت تجريبية
        </Text>
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
      </Flex>
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
