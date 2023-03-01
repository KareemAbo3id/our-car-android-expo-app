/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import Svg, { G, Circle } from 'react-native-svg';
import { Animated, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Flex } from '@react-native-material/core';
import usePalette from '../hooks/usePalette.hook';
// imports ////////////////////////////////

// react function /////////////////////////
export default function OnboardNext({ percentage, scrollTo }) {
  // local hooks:
  const Palette = usePalette();

  const size = 110;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  // local handlers:
  const progressAnimation = React.useRef(new Animated.Value(0)).current;
  const progressRef = React.useRef(null);

  const animation = (toValue) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 220,
      useNativeDriver: true
    }).start();
  };

  React.useEffect(() => {
    animation(percentage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percentage]);

  React.useEffect(() => {
    progressAnimation.addListener((value) => {
      const strokeDashoffset = circumference - (circumference * value.value) / 100;
      if (progressRef?.current) {
        progressRef.current.setNativeProps({
          strokeDashoffset
        });
      }
    }, [percentage]);

    return () => {
      progressAnimation.removeAllListeners();
    };

  }, []);

  // local ui:
  return (
    <Flex justify="center" items="center">
      <Svg width={size} height={size}>
        <G rotation="-90" origin={center}>
          <Circle
            stroke={Palette.PrimLight}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
            ref={progressRef}
            stroke={Palette.Info}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
          />
        </G>
      </Svg>
      <TouchableOpacity
        onPress={scrollTo}
        activeOpacity={0.85}
        style={{
          position: 'absolute',
          backgroundColor: Palette.PrimLight,
          borderRadius: 100,
          padding: 15,
        }}
      >
        <MaterialCommunityIcons name="hand-pointing-left" size={60} color={Palette.Info} />
      </TouchableOpacity>
    </Flex>
  );
}
