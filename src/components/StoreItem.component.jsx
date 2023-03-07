/* eslint-disable react-native/no-raw-text */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable object-curly-newline */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
/* eslint-disable import/no-useless-path-segments */
import React from 'react';
import { I18nManager, Image } from 'react-native';
import { Stack } from '@react-native-material/core';
import { Button, Card, Text } from 'react-native-paper';
import KMFont from '../hooks/useFont.hook';
import usePalette from '../hooks/usePalette.hook';
// imports ////////////////////////////////

I18nManager.forceRTL(true);
I18nManager.allowRTL(true);

// react function /////////////////////////
export default function StoreItem({ image, title, rates, stars, price, onPressCard }) {
  // local hook =============:
  const Palette = usePalette();

  // local ui =============:
  return (
    <Card
      onPress={onPressCard}
      mode="elevated"
      style={{
        backgroundColor: Palette.White,
        marginBottom: 15,
        marginHorizontal: 20,
      }}
    >
      <Card.Content style={{ paddingTop: 10 }}>
        <Stack items="center" mv={10}>
          <Image source={image} style={{ height: 150 }} resizeMode="contain" />
        </Stack>
        <Text variant="titleLarge" style={{ fontFamily: KMFont.Bold, color: Palette.Black }}>
          {title}
        </Text>
        <Stack direction="row" justify="start" items="center" spacing={5}>
          <Text>{stars}</Text>
          <Text variant="bodyMedium" style={{ fontFamily: KMFont.Regular, color: Palette.SecDark }}>
            {`(${rates})`}
          </Text>
        </Stack>
      </Card.Content>
      <Card.Content style={{ paddingTop: 10 }}>
        <Stack direction="column" items="start" justify="center" spacing={15}>
          <Text variant="titleLarge" style={{ fontFamily: KMFont.Bold, color: Palette.Info }}>
            {price} ريال
          </Text>
        </Stack>
      </Card.Content>
      <Card.Content
        style={{
          paddingTop: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button
          mode="elevated"
          elevation={1}
          textColor={Palette.White}
          buttonColor={Palette.Primary}
          style={{ borderRadius: 1200, flex: 1 }}
          labelStyle={{
            fontFamily: KMFont.Regular,
            fontSize: 18,
            paddingVertical: 5,
          }}
        >
          اضافة للسلة
        </Button>
      </Card.Content>
    </Card>
  );
}
