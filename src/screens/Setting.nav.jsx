/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable object-curly-newline */
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack } from '@react-native-material/core';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import KMFont from '../hooks/useFont.hook';
import useNav from '../hooks/useNav.hook';
import usePalette from '../hooks/usePalette.hook';
import Version from '../components/Version.component';
// imports ////////////////////////////////

// react function /////////////////////////
export default function SettingNav() {
  // local hooks:

  const Palette = usePalette();
  const go = useNav();

  // local handlers:

  // local ui:
  return (
    <ScrollView style={Styles.SAVStyleForAndroid}>
      <Stack
        justify="center"
        items="stretch"
        direction="column"
        ph={20}
        pv={5}
        mt={20}
        spacing={10}
      >
        <Text variant="titleSmall" style={{ fontFamily: KMFont.Bold, color: Palette.SecDark }}>
          الاعدادات
        </Text>
        <Card mode="elevated" style={{ backgroundColor: Palette.White }}>
          <Card.Content
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexWrap: 'wrap',
              gap: 5,
            }}
          >
            <MaterialCommunityIcons name="key" size={18} color={Palette.Primary2} />
            <Text
              variant="bodyLarge"
              style={{
                fontFamily: KMFont.Medium,
                color: Palette.Primary2,
              }}
            >
              تحديث رمز المرور
            </Text>
          </Card.Content>
        </Card>
        <Card mode="elevated" style={{ backgroundColor: Palette.White }}>
          <Card.Content
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexWrap: 'wrap',
              gap: 5,
            }}
          >
            <MaterialCommunityIcons name="rename-box" size={18} color={Palette.Primary2} />
            <Text
              variant="bodyLarge"
              style={{
                fontFamily: KMFont.Medium,
                color: Palette.Primary2,
              }}
            >
              تحديث الاسم
            </Text>
          </Card.Content>
        </Card>
      </Stack>
      <Stack
        justify="center"
        items="stretch"
        direction="column"
        ph={20}
        mt={20}
        pv={5}
        spacing={10}
      >
        <Version />
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
