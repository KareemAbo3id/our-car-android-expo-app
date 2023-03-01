/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-else-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/function-component-definition */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable object-curly-newline */
import React, { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack } from '@react-native-material/core';
import { FlatList } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { firebase } from '../../config';
import centersList from '../../data/centersList';
import CenterItem from '../components/CenterItem.component';
import KMFont from '../hooks/useFont.hook';
import usePalette from '../hooks/usePalette.hook';
// imports ////////////////////////////////

// react function /////////////////////////
export default function EntryNav() {
  // local hooks:
  const Palette = usePalette();
  const [refreshing, setRefreshing] = useState(false);
  const [centerSearch, setCenterSearch] = useState('');

  const { currentUser } = firebase.auth();
  const [userAllData, setUserAllData] = React.useState('');

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

  // onRefresh =============:
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getUserAllData();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  if (!userAllData) {
    return null;
  }

  // local ui:
  return (
    <Stack>
      <Stack w="100%" ph={20} pb={10} direction="row" items="center" justify="start">
        <Text variant="headlineLarge" style={{ fontFamily: KMFont.Bold, color: Palette.PrimDark }}>
          إحجز موعدك
        </Text>
      </Stack>
      <Stack w="100%" ph={25} pb={10} direction="row" items="center" justify="center" spacing={10}>
        <Button
          icon="calendar-blank"
          mode="elevated"
          elevation={1}
          buttonColor={Palette.Info}
          textColor={Palette.White}
          style={{ width: '50%', borderRadius: 1200, paddingVertical: 5 }}
          labelStyle={{ fontFamily: KMFont.Bold }}
        >
          <Text variant="bodyLarge" style={{ color: Palette.White, fontFamily: KMFont.Medium }}>
            {Date().slice(0, 11)}
          </Text>
        </Button>
        <Button
          icon="car"
          mode="elevated"
          elevation={1}
          buttonColor={Palette.White}
          textColor={Palette.Primary}
          style={{
            width: '50%',
            borderRadius: 1200,
            paddingVertical: 5,
          }}
          labelStyle={{ fontFamily: KMFont.Bold }}
        >
          <Text variant="bodyLarge" style={{ color: Palette.PrimDark, fontFamily: KMFont.Bold }}>
            {userAllData?.userCar?.userMake}
          </Text>
        </Button>
      </Stack>

      <Stack w="100%" ph={20} pb={10} direction="row" items="center" justify="between" spacing={10}>
        <TextInput
          placeholder="ابحث عن شركة / مركز صيانة / خدمة"
          mode="outlined"
          value={centerSearch}
          onChangeText={(text) => setCenterSearch(text)}
          autoCapitalize="none"
          cursorColor={Palette.Primary}
          activeOutlineColor={Palette.SecDark2}
          outlineColor="transparent"
          contentStyle={{ fontFamily: KMFont.Regular, fontSize: 17 }}
          style={{ backgroundColor: Palette.White, textAlign: 'auto' }}
          placeholderTextColor={Palette.SecDark}
          outlineStyle={{ borderRadius: 1200, borderWidth: 1 }}
        />
        <MaterialCommunityIcons name="filter-variant" size={40} color={Palette.Primary} />
      </Stack>
      <FlatList
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={centersList}
        renderItem={({ item }) => (
          <CenterItem
            key={item.id}
            image={item.image}
            title={item.title}
            describe={item.describe}
            rates={item.rates}
            stars={item.stars.map((i, j) => {
              if (i === 1) {
                return <MaterialCommunityIcons key={j} name="star" color={Palette.Warning2} />;
              } else {
                return <MaterialCommunityIcons key={j} name="star" color={Palette.SecPrimary} />;
              }
            })}
            services={item.services.map((i, o) => {
              return (
                <Stack key={o} direction="row" items="center" justify="between" w="100%" ph={10}>
                  <Stack direction="row" items="center" justify="start" spacing={5}>
                    <MaterialCommunityIcons name="car-wash" size={20} color={Palette.Info} />
                    <Text
                      variant="titleMedium"
                      style={{ color: Palette.Black, fontFamily: KMFont.Bold }}
                    >
                      {i.serName}
                    </Text>
                  </Stack>
                  <Text
                    variant="titleMedium"
                    style={{ color: Palette.Success, fontFamily: KMFont.Bold }}
                  >
                    SAR {i.serPrice}
                  </Text>
                </Stack>
              );
            })}
          />
        )}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
      />
    </Stack>
  );
}
