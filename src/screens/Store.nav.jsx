/* eslint-disable react/no-unstable-nested-components */
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
import { ActivityIndicator, TextInput } from 'react-native-paper';
import { firebase } from '../../config';
import storeList from '../../data/storeList';
import KMFont from '../hooks/useFont.hook';
import usePalette from '../hooks/usePalette.hook';
import StoreItem from '../components/StoreItem.component';
// imports ////////////////////////////////

// eslint-disable-next-line no-unused-vars
const { height, width } = Dimensions.get('window');

// react function /////////////////////////
export default function StoreNav({ navigation }) {
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
  const filteredCenters = storeList.filter((center) => {
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
          placeholder="ابحث عن منتج..."
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
              <StoreItem
                key={item.id}
                image={item.image}
                title={item.title}
                describe={item.describe}
                rates={item.rates}
                price={item.price}
                altPrice={item.altPrice}
                onPressCard={() => {
                  navigation.navigate('Details', {
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    image: item.image,
                    stars: item.stars,
                    rates: item.rates,
                    prodNo: item.prodNo,
                    altPrice: item.altPrice,
                    packageNo: item.packageNo,
                  });
                }}
                stars={item.stars.map((i, j) => {
                  if (i === 1) {
                    return <MaterialCommunityIcons key={j} name="star" color={Palette.Warning2} />;
                  } else {
                    return (
                      <MaterialCommunityIcons key={j} name="star" color={Palette.SecPrimary} />
                    );
                  }
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
