/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable object-curly-newline */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
/* eslint-disable import/no-useless-path-segments */
import React from 'react';
import { I18nManager, Image, View } from 'react-native';
import { Divider, Stack } from '@react-native-material/core';
import { Card, Text } from 'react-native-paper';
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
    <View>
      <Card
        mode="contained"
        style={{
          backgroundColor: Palette.White,
          marginBottom: 15,
          marginHorizontal: 20,
          borderWidth: 1,
          borderColor: Palette.SecDark2,
        }}
      >
        <Stack
          p={10}
          bg={Palette.White}
          direction="row"
          items="center"
          justify="start"
          spacing={15}
          style={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
        >
          <Image
            source={image}
            style={{
              width: 55,
              height: 55,
              resizeMode: 'contain',
              backgroundColor: Palette.SecDark2,
              borderRadius: 5,
              borderColor: Palette.SecDark2,
              borderWidth: 1,
            }}
          />
          <Stack direction="column" justify="center" items="start">
            <Text
              variant="titleLarge"
              style={{ fontFamily: KMFont.Medium, color: Palette.PrimDark }}
            >
              {title}
            </Text>
            <Stack direction="row" justify="center" items="center" spacing={5}>
              <Text>{stars}</Text>
              <Text
                variant="bodyMedium"
                style={{ fontFamily: KMFont.Regular, color: Palette.SecDark }}
              >
                {`(${rates})`}
              </Text>
            </Stack>
          </Stack>
        </Stack>
        <Divider color={Palette.SecDark2} />
        <Stack
          p={10}
          bg={Palette.White}
          direction="column"
          items="start"
          justify="center"
          spacing={15}
          style={{ borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}
        >
          <Stack direction="row" items="center" justify="between" w="100%" ph={10}>
            <Text variant="titleSmall" style={{ color: Palette.SecDark, fontFamily: KMFont.Bold }}>
              الخدمة
            </Text>
            <Text variant="titleSmall" style={{ color: Palette.SecDark, fontFamily: KMFont.Bold }}>
              السعر
            </Text>
          </Stack>
          {services}
        </Stack>
      </Card>
    </View>
  );
}
