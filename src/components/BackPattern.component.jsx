/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
import React from 'react';
import { View } from 'react-native';
import usePalette from '../hooks/usePalette.hook';
// imports ////////////////////////////////

// react function /////////////////////////
function BackPattern1() {
  // local hooks:
  const Palette = usePalette();

  // local handlers:

  // local ui:
  return (
    <View
      style={{
        backgroundColor: Palette.Primary,
        height: 500,
        width: 600,
        borderRadius: 80,
        position: 'absolute',
        transform: [{ rotate: '20deg' }],
        top: -250,
        left: 60,
        elevation: 20,
        zIndex: -2,
      }}
    />
  );
}

function BackPattern2() {
  // local hooks:
  const Palette = usePalette();
  return (
    <View
      style={{
        backgroundColor: Palette.PrimLight,
        opacity: 0.2,
        height: 500,
        width: 600,
        borderRadius: 80,
        position: 'absolute',
        transform: [{ rotate: '20deg' }],
        top: -200,
        left: 120,
        zIndex: -1,
      }}
    />
  );
}
function BackPattern3() {
  // local hooks:
  const Palette = usePalette();
  return (
    <View
      style={{
        backgroundColor: Palette.Primary,
        opacity: 0.55,
        height: 500,
        width: 600,
        borderRadius: 80,
        position: 'absolute',
        transform: [{ rotate: '30deg' }],
        bottom: -400,
        right: 110,
        zIndex: -1,
      }}
    />
  );
}

export { BackPattern1, BackPattern2, BackPattern3 };
