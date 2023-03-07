/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Card, Text } from 'react-native-paper';
import KMFont from '../hooks/useFont.hook';
import usePalette from '../hooks/usePalette.hook';
// imports ////////////////////////////////

// react function /////////////////////////
export default function CartItem({ note }) {
  // local hooks:
  const Palette = usePalette();

  // local handlers:

  // local ui:
  return (
    <Card
      mode="elevated"
      elevation={2}
      style={{ backgroundColor: Palette.White, marginBottom: 10 }}
    >
      <Card.Content>
        <Text variant="titleMedium" style={{ fontFamily: KMFont.Medium, color: Palette.Black }}>
          {note}
        </Text>
      </Card.Content>
    </Card>
  );
}
