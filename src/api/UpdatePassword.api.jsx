// /* eslint-disable object-curly-newline */
// /* eslint-disable operator-linebreak */
// /* eslint-disable react-native/no-color-literals */
// /* eslint-disable no-else-return */
// /* eslint-disable react-native/no-inline-styles */
// /* eslint-disable react/jsx-wrap-multilines */
// /* eslint-disable no-alert */
// import {
//   ActivityIndicator,
//   Box,
//   Flex,
//   Stack,
//   Wrap,
// } from '@react-native-material/core';
// import React from 'react';
// import { KeyboardAvoidingView, StyleSheet } from 'react-native';
// import { Avatar, Text, TextInput } from 'react-native-paper';
// import { firebase } from '../../config/firebase';
// import { ContainedButtonCtrl } from '../components/ButtonCtrl.component';
// import InputCtrl from '../components/InputCtrl.component';
// import { Font, TextLeft } from '../styles/Font.style';
// import Palette from '../styles/Colors.style';
// import {
//   validatePasswordColor,
//   validatePasswordIcon,
//   validateUpdatePasswordColor,
//   validateUpdatePasswordIcon,
//   validateUpdatePasswordSubmit,
// } from '../validations/validation';
// // imports ////////////////////////////////

// // react function /////////////////////////
export default function UpdatePassword() {
  //   // local hooks:
  //   const { currentUser } = firebase.auth();
  //   const { credential } = firebase.auth.EmailAuthProvider;
  //   const [localPassword, setLocalPassword] = React.useState('');
  //   const [newPassword, setNewPassword] = React.useState('');
  //   const [showPassword, setShowPassword] = React.useState(false);
  //   const [showNewPassword, setShowNewPassword] = React.useState(false);
  //   const [sentUpdateLink, setSentUpdateLink] = React.useState(false);
  //   // local handlers =============:
  //   const userReAuthenticate = (newPass) => {
  //     const userCredential = credential(currentUser.email, newPass);
  //     return currentUser.reauthenticateWithCredential(userCredential);
  //   };
  //   const userUpdatePassword = () => {
  //     userReAuthenticate(localPassword)
  //       .then(() => {
  //         currentUser
  //           .updatePassword(newPassword)
  //           .then(() => {
  //             setSentUpdateLink(true);
  //           })
  //           .then(() => {
  //             setTimeout(() => {
  //               firebase.auth().signOut();
  //             }, 5000);
  //           })
  //           .catch(() => alert('حدث خطأ. حاول مرة اخرة'));
  //       })
  //       .catch(() => alert('تأكد من صحة رمز المرور'));
  //   };
  //   // local ui:
  //   if (sentUpdateLink) {
  //     return (
  //       <KeyboardAvoidingView style={Styles.SAVStyleForAndroid}>
  //         <Flex
  //           direction="column"
  //           justify="center"
  //           items="center"
  //           pb={10}
  //           spacing={5}
  //         >
  //           <Avatar.Icon
  //             size={70}
  //             icon="check-circle-outline"
  //             color={Palette.Primary}
  //             style={{ backgroundColor: 'transparent' }}
  //           />
  //           <Text
  //             variant="headlineSmall"
  //             style={{ fontFamily: Font.tajawalMedium, textAlign: 'center' }}
  //           >
  //             تم تحديث رمز المرور
  //           </Text>
  //         </Flex>
  //         <Wrap justify="center" items="center" pb={10} spacing={5}>
  //           <Text
  //             variant="bodyLarge"
  //             style={{ fontFamily: Font.tajawalMedium, textAlign: 'center' }}
  //           >
  //             جاري تسجيل الخروج
  //           </Text>
  //           <ActivityIndicator color={Palette.Primary} />
  //         </Wrap>
  //       </KeyboardAvoidingView>
  //     );
  //   }
  //   return (
  //     <KeyboardAvoidingView style={Styles.SAVStyleForAndroid}>
  //       <Text
  //         variant="bodyLarge"
  //         style={{ fontFamily: Font.tajawalMedium, textAlign: 'center' }}
  //       >
  //         بعد تحديث الرمز سيتم تسجيل الخروج تلقائياً.
  //       </Text>
  //       <Text
  //         variant="bodyLarge"
  //         style={{ fontFamily: Font.tajawalMedium, textAlign: 'center' }}
  //       >
  //         الرجاء معاودة الدخول
  //       </Text>
  //       <Stack spacing={5}>
  //         {/* 1 OLD PASSWORD ============================= */}
  //         <Box>
  //           <InputCtrl
  //             end={
  //               <TextInput.Icon
  //                 icon={validatePasswordIcon(localPassword)}
  //                 size={20}
  //                 iconColor={validatePasswordColor(localPassword)}
  //               />
  //             }
  //             contentStyle={{
  //               fontFamily: Font.tajawalMedium,
  //               textAlign: TextLeft,
  //             }}
  //             keyboardType="default"
  //             textContentType="password"
  //             placeholder="password رمز المرور الحالي"
  //             value={localPassword}
  //             secureTextEntry={!showPassword}
  //             onChangeText={(password) => setLocalPassword(password)}
  //             activeOutlineColor={validatePasswordColor(localPassword)}
  //             start={
  //               <TextInput.Icon
  //                 onPress={() => setShowPassword(!showPassword)}
  //                 icon={showPassword ? 'eye-off-outline' : 'eye-outline'}
  //                 size={20}
  //               />
  //             }
  //           />
  //         </Box>
  //         {/* 2 NEW PASSWORD ============================= */}
  //         <Box>
  //           <InputCtrl
  //             end={
  //               <TextInput.Icon
  //                 icon={validateUpdatePasswordIcon(newPassword)}
  //                 size={20}
  //                 iconColor={validateUpdatePasswordColor(newPassword)}
  //               />
  //             }
  //             contentStyle={{
  //               fontFamily: Font.tajawalMedium,
  //               textAlign: TextLeft,
  //             }}
  //             keyboardType="default"
  //             textContentType="password"
  //             placeholder="password رمز المرور الجديد"
  //             value={newPassword}
  //             secureTextEntry={!showNewPassword}
  //             onChangeText={(password) => setNewPassword(password)}
  //             activeOutlineColor={validateUpdatePasswordColor(newPassword)}
  //             start={
  //               <TextInput.Icon
  //                 onPress={() => setShowNewPassword(!showNewPassword)}
  //                 icon={showNewPassword ? 'eye-off-outline' : 'eye-outline'}
  //                 size={20}
  //               />
  //             }
  //           />
  //         </Box>
  //         <Box pt={10}>
  //           {/* 4 UPDATE BUTTON ================================ */}
  //           <ContainedButtonCtrl
  //             title="تحديث"
  //             onPress={() => {
  //               userUpdatePassword();
  //             }}
  //             disabled={validateUpdatePasswordSubmit(localPassword, newPassword)}
  //           />
  //         </Box>
  //       </Stack>
  //     </KeyboardAvoidingView>
  //   );
}

// const Styles = StyleSheet.create({
//   SAVStyleForAndroid: {
//     flex: 1,
//     borderTopEndRadius: 20,
//     borderTopStartRadius: 20,
//     marginTop: 10,
//     borderColor: Palette.Secondary,
//     borderWidth: 1,
//     borderBottomWidth: 0,
//     backgroundColor: Palette.White,
//     justifyContent: 'center',
//     paddingHorizontal: 25,
//   },
// });
