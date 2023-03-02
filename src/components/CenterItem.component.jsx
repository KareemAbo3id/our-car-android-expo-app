/* eslint-disable react-native/no-raw-text */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable object-curly-newline */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
/* eslint-disable import/no-useless-path-segments */
import React from 'react';
import { I18nManager } from 'react-native';
import { Stack } from '@react-native-material/core';
import { Button, Card, Text } from 'react-native-paper';
import KMFont from '../hooks/useFont.hook';
import usePalette from '../hooks/usePalette.hook';
// imports ////////////////////////////////

I18nManager.forceRTL(true);
I18nManager.allowRTL(true);

// react function /////////////////////////
export default function CenterItem({ image, title, rates, stars, services }) {
  // local hook =============:
  const Palette = usePalette();

  // local ui =============:
  return (
    <Card
      mode="elevated"
      style={{
        backgroundColor: Palette.White,
        marginBottom: 15,
        marginHorizontal: 20,
      }}
    >
      <Card.Cover source={image} resizeMode="cover" style={{ height: 150 }} />
      <Card.Content style={{ paddingTop: 10 }}>
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
          {services}
        </Stack>
      </Card.Content>
      <Card.Content
        style={{
          paddingTop: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 15,
        }}
      >
        <Button
          mode="elevated"
          elevation={1}
          icon="calendar"
          textColor={Palette.White}
          buttonColor={Palette.Primary}
          style={{ borderRadius: 1200, flex: 0.5 }}
          labelStyle={{
            fontFamily: KMFont.Regular,
            fontSize: 18,
            paddingVertical: 5,
          }}
        >
          حجز موعد
        </Button>
        <Button
          mode="elevated"
          elevation={1}
          icon="phone"
          textColor={Palette.White}
          buttonColor={Palette.PrimDark}
          style={{ borderRadius: 1200, flex: 0.5 }}
          labelStyle={{
            fontFamily: KMFont.Regular,
            fontSize: 18,
            paddingVertical: 5,
          }}
        >
          تواصل
        </Button>
      </Card.Content>
    </Card>
  );
}
