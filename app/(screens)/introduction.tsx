import { useRouter } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import { FlatList, View } from 'react-native';

import slidesData from '@/assets/slidesData';
import Button from '@/components/ui/Button';
import Paginator from '@/components/ui/Paginator';
import ProgressButton from '@/components/ui/ProgressButton';
import ScreenContainer from '@/components/ui/ScreenContainer';
import Slide from '@/components/ui/Slide';

interface IntroductionProps {}

const Introduction: React.FC<IntroductionProps> = () => {
  const router = useRouter();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const sliderRef = useRef<any>(null);

  const handleViewableItemsChanged = useCallback(({ viewableItems }: any) => {
    setCurrentSlideIndex(viewableItems[0].index);
  }, []);

  const handleScroll = () => {
    if (currentSlideIndex < slidesData.length - 1) {
      sliderRef.current.scrollToIndex({ index: currentSlideIndex + 1 });
    }
  };

  const getButton = () => {
    if (currentSlideIndex < slidesData.length - 1) {
      return (
        <ProgressButton
          progress={(currentSlideIndex + 1) / slidesData.length}
          handleScroll={handleScroll}
        />
      );
    }
    return (
      <Button
        label="Get Started"
        type="filled"
        onPress={() => router.navigate('/registration')}
        borderRadius="rounded-lg"
      />
    );
  };

  return (
    <ScreenContainer>
      <View>
        <View className="flex flex-row-reverse ml-5 mb-4/25 h-5">
          {currentSlideIndex < slidesData.length - 1 && (
            <Button label="Skip" type="" onPress={() => router.navigate('/registration')} />
          )}
        </View>
        <View className="h-3/4">
          <FlatList
            data={slidesData}
            renderItem={({ item }) => <Slide item={item} />}
            keyExtractor={(item) => item.id}
            onViewableItemsChanged={handleViewableItemsChanged}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            ref={sliderRef}
          />
        </View>

        <View className="mb-10">
          <Paginator currentSlideIndex={currentSlideIndex} slidesData={slidesData} />
        </View>
        <View className="flex flex-row justify-center mx-4 h-20">{getButton()}</View>
      </View>
    </ScreenContainer>
  );
};

export default Introduction;
