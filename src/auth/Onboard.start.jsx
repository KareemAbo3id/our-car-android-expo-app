/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef } from 'react';
import {
  StatusBar,
  FlatList,
  Animated,
  StyleSheet,
  I18nManager,
  SafeAreaView,
  View,
} from 'react-native';
import { Flex } from '@react-native-material/core';

// others:
import OnboardItem from '../components/OnboardItem.component';
import OnboardIndicator from '../components/OnboardIndicator.component';
import onBoardList from '../../data/onboardList';

// hooks:
import useNav from '../hooks/useNav.hook';
import usePalette from '../hooks/usePalette.hook';
import OnboardNext from '../components/OnboardNext.component';
// imports ////////////////////////////////

I18nManager.forceRTL(true);
I18nManager.allowRTL(true);

// react function /////////////////////////
export default function Onboard() {
  // local hooks =============:
  const go = useNav();
  const Palette = usePalette();

  // onboard slides functions: =============:
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const scrollTo = () => {
    if (currentIndex < onBoardList.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      go.to('login');
    }
  };

  const viewConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  // local ui =============:

  return (
    <SafeAreaView style={[Styles.SAVStyleForAndroid, { backgroundColor: Palette.darkBg }]}>
      <StatusBar backgroundColor="transparent" translucent />
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
      <Flex h="100%" pv={20} direction="column" justify="between" items="center">
        <FlatList
          data={onBoardList}
          renderItem={({ item }) => <OnboardItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false,
          })}
          onViewableItemsChanged={viewableItemsChanged}
          scrollEventThrottle={32}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
        <OnboardNext
          scrollTo={scrollTo}
          percentage={(currentIndex + 1) * (100 / onBoardList.length)}
        />
        <OnboardIndicator data={onBoardList} scrollX={scrollX} />
      </Flex>
    </SafeAreaView>
  );
}

// local styles:
const Styles = StyleSheet.create({
  SAVStyleForAndroid: {
    flex: 1,
  },
});
