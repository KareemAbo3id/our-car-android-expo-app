/* eslint-disable no-else-return */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable object-curly-newline */
import React from 'react';
import { ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { Stack } from '@react-native-material/core';
import usePalette from '../hooks/usePalette.hook';
import CartItem from '../components/CartItem.component';
// imports ////////////////////////////////

// react function /////////////////////////
export default function PayNav({ route }) {
  // local hooks:
  const { title, price, prodNo, image } = route.params;
  // local hooks:
  const Palette = usePalette();
  const [refreshing, setRefreshing] = React.useState(false);

  // local handlers:

  // onRefresh =============:
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 800);
  }, []);

  // local ui:
  return (
    <ScrollView
      style={Styles.SAVStyleForAndroid}
      refreshControl={
        <RefreshControl colors={[Palette.Primary]} refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Stack
        justify="center"
        items="stretch"
        direction="column"
        spacing={10}
        ph={10}
        mt={20}
        pv={5}
      >
        <CartItem title={title} price={price} image={image} prodNo={prodNo} />
      </Stack>
    </ScrollView>
  );
}

// local styles:
const Styles = StyleSheet.create({
  SAVStyleForAndroid: {
    flex: 1,
  },
});
