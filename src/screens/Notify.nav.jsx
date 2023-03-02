/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable object-curly-newline */
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack } from '@react-native-material/core';
import React from 'react';
import { ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { Card, Text } from 'react-native-paper';
import KMFont from '../hooks/useFont.hook';
import useNav from '../hooks/useNav.hook';
import usePalette from '../hooks/usePalette.hook';
// imports ////////////////////////////////

const notificationsList = [
  { id: 1, message: 'تم تفعيل الحساب' },
  { id: 2, message: 'تم اضافة بيانات السيارة' },
  { id: 3, message: 'تم ادخال العنوان' },
];

// react function /////////////////////////
export default function NotifyNav() {
  // local hooks:

  const Palette = usePalette();
  const [refreshing, setRefreshing] = React.useState(false);
  const go = useNav();

  // local handlers:

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
        <Text variant="titleSmall" style={{ fontFamily: KMFont.Bold, color: Palette.SecDark }}>
          الاشعارات
        </Text>
        {notificationsList.map((note) => {
          return (
            <Card
              key={note.id}
              mode="contained"
              style={{
                backgroundColor: Palette.White,
                borderColor: Palette.SecDark2,
                borderWidth: 1,
                paddingVertical: 8,
              }}
            >
              <Card.Content
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  flexWrap: 'wrap',
                  gap: 5,
                }}
              >
                <MaterialCommunityIcons name="message-outline" size={17} color={Palette.Black} />
                <Text
                  variant="bodyLarge"
                  style={{
                    fontFamily: KMFont.Medium,
                    color: Palette.Black,
                  }}
                >
                  {note.message}
                </Text>
              </Card.Content>
            </Card>
          );
        })}
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
