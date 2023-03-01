// /* eslint-disable react/function-component-definition */
// /* eslint-disable react/no-unstable-nested-components */
// /* eslint-disable react-native/no-raw-text */
// /* eslint-disable import/no-extraneous-dependencies */
// /* eslint-disable object-curly-newline */
// /* eslint-disable operator-linebreak */
// /* eslint-disable react-native/no-color-literals */
// /* eslint-disable no-else-return */
// /* eslint-disable react-native/no-inline-styles */
// /* eslint-disable react/jsx-wrap-multilines */
// /* eslint-disable no-alert */
// import React from 'react';
// import { Box, Flex, Stack } from '@react-native-material/core';
// import { useNavigation } from '@react-navigation/native';
// import { SelectList } from 'react-native-dropdown-select-list';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native';
// import { Avatar, Text, TextInput } from 'react-native-paper';
// import { firebase } from '../../config/firebase';
// import { ContainedButtonCtrl } from '../components/ButtonCtrl.component';
// import { Font, TextRight } from '../styles/Font.style';
// import Palette from '../styles/Colors.style';
// import cit from '../../data/cit';
// import reg from '../../data/reg';
// import InputCtrl from '../components/InputCtrl.component';
// import { validateAddressFormSubmit } from '../validations/validation';
// // imports ////////////////////////////////

// // react function /////////////////////////
export default function UpdateAddress() {
  //   // local hooks =============:
  //   const Navigation = useNavigation();
  //   const goTo = (path) => Navigation.navigate(path);
  //   const [localReg, setLocalReg] = React.useState('');
  //   const [loaclCity, setLocalCity] = React.useState('');
  //   const [localDis, setLocalDis] = React.useState('');
  //   const [sentUpdateData, setSentUpdateData] = React.useState(false);
  //   // local handlers =============:
  //   const userUpdateAddress = async (userReg, userCity, userDis) => {
  //     await firebase
  //       .firestore()
  //       .collection('users')
  //       .doc(firebase.auth().currentUser.uid)
  //       .update({
  //         userAddress: {
  //           reg: userReg,
  //           city: userCity,
  //           dis: userDis,
  //         },
  //       })
  //       .then(() => {
  //         setSentUpdateData(true);
  //         Keyboard.dismiss();
  //         setTimeout(() => {
  //           goTo('ProfileRoot');
  //         }, 3000);
  //       })
  //       .catch(() => alert('حدث خطأ. حاول مرة اخرة'));
  //   };
  //   // local ui =============:
  //   const ListPlaceholder = ({ text }) => {
  //     return (
  //       <Flex direction="row" justify="center" items="center">
  //         <Text
  //           style={{
  //             fontWeight: Font.tajawalMedium,
  //             color: Palette.Secondary,
  //             fontSize: 16,
  //           }}
  //         >
  //           {text}
  //         </Text>
  //         <Box mh={5} />
  //         <Box>
  //           <MaterialCommunityIcons
  //             name="map-marker"
  //             size={20}
  //             color={Palette.Primary}
  //           />
  //         </Box>
  //       </Flex>
  //     );
  //   };
  //   if (sentUpdateData) {
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
  //             style={{ fontWeight: Font.tajawalMedium, textAlign: 'center' }}
  //           >
  //             تم تحديث العنوان
  //           </Text>
  //         </Flex>
  //       </KeyboardAvoidingView>
  //     );
  //   }
  //   return (
  //     <KeyboardAvoidingView style={Styles.SAVStyleForAndroid}>
  //       <Stack spacing={5}>
  //         <Box>
  //           <SelectList
  //             // SelectList Logic:
  //             setSelected={setLocalReg}
  //             data={reg}
  //             // SelectList Style:
  //             fontWeight={Font.tajawalMedium}
  //             search={false}
  //             dropdownStyles={[ListStyles.dropdownStyles, { zIndex: 22 }]}
  //             boxStyles={ListStyles.boxStyles}
  //             inputStyles={ListStyles.inputStyles}
  //             dropdownTextStyles={ListStyles.dropdownTextStyles}
  //             placeholder={<ListPlaceholder text="المنطقة" />}
  //             arrowicon={<MaterialCommunityIcons name="menu-down" size={30} />}
  //           />
  //         </Box>
  //         {localReg && (
  //           <Box>
  //             <SelectList
  //               // SelectList Logic:
  //               setSelected={setLocalCity}
  //               data={cit[localReg]}
  //               // SelectList Style:
  //               fontWeight={Font.tajawalMedium}
  //               search={false}
  //               dropdownShown={false}
  //               dropdownStyles={[ListStyles.dropdownStyles, { zIndex: 20 }]}
  //               boxStyles={ListStyles.boxStyles}
  //               inputStyles={ListStyles.inputStyles}
  //               dropdownTextStyles={ListStyles.dropdownTextStyles}
  //               placeholder={<ListPlaceholder text="المدينة" />}
  //               arrowicon={<MaterialCommunityIcons name="menu-down" size={30} />}
  //             />
  //           </Box>
  //         )}
  //         {loaclCity && (
  //           <Box>
  //             <InputCtrl
  //               start={
  //                 localDis.toLowerCase().length < 1 ? (
  //                   <TextInput.Icon
  //                     icon="map-marker"
  //                     size={20}
  //                     iconColor={Palette.Primary}
  //                   />
  //                 ) : null
  //               }
  //               contentStyle={{
  //                 fontWeight: Font.tajawalMedium,
  //                 textAlign: TextRight,
  //               }}
  //               keyboardType="default"
  //               textContentType="addressCity"
  //               placeholder="الحي"
  //               value={localDis}
  //               onChangeText={(text) => setLocalDis(text)}
  //               activeOutlineColor={Palette.Primary}
  //             />
  //           </Box>
  //         )}
  //         {/* UPDATE BUTTON ================================ */}
  //         <Box>
  //           <ContainedButtonCtrl
  //             title="حفظ العنوان"
  //             disabled={validateAddressFormSubmit(localReg, loaclCity, localDis)}
  //             onPress={() => {
  //               userUpdateAddress(localReg, loaclCity, localDis);
  //             }}
  //           />
  //         </Box>
  //       </Stack>
  //     </KeyboardAvoidingView>
  //   );
  // }
  // const ListStyles = {
  //   dropdownStyles: {
  //     borderWidth: 1,
  //     borderColor: Palette.Light,
  //     backgroundColor: Palette.White,
  //     elevation: 2,
  //     position: 'absolute',
  //     marginTop: 55,
  //     width: '100%',
  //     borderRadius: 4,
  //   },
  //   boxStyles: {
  //     borderColor: Palette.Primary,
  //     borderRadius: 5,
  //     justifyContent: 'space-between',
  //     alignItems: 'center',
  //   },
  //   inputStyles: { color: Palette.DarkGray, fontSize: 16 },
  //   dropdownTextStyles: { color: Palette.DarkGray, fontSize: 16 },
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
