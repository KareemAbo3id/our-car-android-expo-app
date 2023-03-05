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
import { FlatList, Dimensions } from 'react-native';
import { ActivityIndicator, Text, TextInput } from 'react-native-paper';
import { firebase } from '../../config';
import centersList from '../../data/centersList';
import CenterItem from '../components/CenterItem.component';
import KMFont from '../hooks/useFont.hook';
import usePalette from '../hooks/usePalette.hook';
import useNav from '../hooks/useNav.hook';
// imports ////////////////////////////////

// eslint-disable-next-line no-unused-vars
const { height, width } = Dimensions.get('window');

// react function /////////////////////////
export default function EntryNav() {
  // local hooks:
  const Palette = usePalette();
  const [refreshing, setRefreshing] = useState(false);
  const [centerSearch, setCenterSearch] = useState('');
  const go = useNav();

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
  const filteredCenters = centersList.filter((center) => {
    return center.title.toLocaleLowerCase().includes(centerSearch);
  });

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
      <Stack ph={20} pb={10} direction="row" items="center" justify="center">
        <TextInput
          placeholder="ابحث عن شركة، مركز صيانة..."
          mode="outlined"
          value={centerSearch}
          onChangeText={(text) => setCenterSearch(text)}
          autoCapitalize="none"
          cursorColor={Palette.Primary}
          activeOutlineColor={Palette.SecDark2}
          outlineColor="transparent"
          contentStyle={{ fontFamily: KMFont.Regular, fontSize: 17 }}
          style={{ backgroundColor: Palette.White, textAlign: 'auto', flex: 1 }}
          placeholderTextColor={Palette.SecDark}
          outlineStyle={{ borderRadius: 1200, borderWidth: 1 }}
        />
      </Stack>
      {!filteredCenters ? (
        <Stack pv={20}>
          <ActivityIndicator animating color={Palette.Primary} />
        </Stack>
      ) : (
        <Stack mb={height * 0.17}>
          <FlatList
            refreshing={refreshing}
            onRefresh={onRefresh}
            data={filteredCenters}
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
                    return (
                      <MaterialCommunityIcons key={j} name="star" color={Palette.SecPrimary} />
                    );
                  }
                })}
                services={item.services.map((i, o) => {
                  return (
                    <Stack key={o} direction="row" items="center" justify="between" w="100%">
                      <Stack direction="row" items="center" justify="start" spacing={5}>
                        <MaterialCommunityIcons name="car-wash" size={20} color={Palette.Info} />
                        <Text
                          variant="titleMedium"
                          style={{ color: Palette.PrimDark, fontFamily: KMFont.Medium }}
                        >
                          {i.serName}
                        </Text>
                      </Stack>
                      <Text
                        variant="titleMedium"
                        style={{ color: Palette.Primary2, fontFamily: KMFont.Medium }}
                      >
                        {i.serPrice} ريال
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
      )}
    </Stack>
  );
}
