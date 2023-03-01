/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { StyleSheet, Animated, useWindowDimensions } from 'react-native';
import { Flex } from '@react-native-material/core';
// imports ////////////////////////////////

// react function /////////////////////////
export default function OnboardIndicator({ data, scrollX }) {
  // local hooks:
  const { width } = useWindowDimensions();

  // local handlers:

  // local ui:
  return (
    <Flex direction="row-reverse" pt={50}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [12, 35, 12],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.4, 1, 0.4],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            style={[
              Styles.dot,
              { width: dotWidth, opacity },
            ]}
            key={i.toString()}
          />
        );
      })}
    </Flex>
  );
}

const Styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  dot: {
    height: 2.7,
    borderRadius: 100,
    marginHorizontal: 8,
    backgroundColor: '#2ebdd3',
  },
});
