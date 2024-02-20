import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { useCallback, useRef, useState } from 'react';
import { FlatList, View } from 'react-native';

import { slidesData } from '@/common/dictionary/slidesData.dictionary';
import Button from '@/components/ui/Button';
import Paginator from '@/components/ui/Paginator';
import ProgressButton from '@/components/ui/ProgressButton';
import ScreenContainer from '@/components/ui/ScreenContainer';
import Slide from '@/components/ui/Slide';
import i18n from '@/i18n';

interface IntroductionProps {}

const Introduction: React.FC<IntroductionProps> = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const sliderRef = useRef<any>(null);

  const handleViewableItemsChanged = useCallback(({ viewableItems }: any) => {
    setCurrentSlideIndex(viewableItems[0].index);
  }, []);

  const redirectToRegister = () => router.navigate('/registration');

  const redirectToSignIn = () => router.navigate('/signIn');

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
      <View className="w-full">
        <Button
          label={i18n.t('introduction.get-started')}
          type="filled"
          onPress={redirectToRegister}
          borderRadius="rounded-lg"
          extraStyles="mb-3"
        />

        <Button
          label={i18n.t('introduction.already-have-an-account')}
          type="outlined"
          onPress={redirectToSignIn}
          borderRadius="rounded-lg"
        />
      </View>
    );
  };

  return (
    <ScreenContainer isTouchableWithoutFeedback={false}>
      <View className="h-full flex justify-between">
        <View className="h-4/5">
          <View className="flex flex-row-reverse ml-5 my-[17px] h-5">
            {currentSlideIndex < slidesData.length - 1 && (
              <Button label={i18n.t('introduction.skip')} type="" onPress={redirectToRegister} />
            )}
          </View>

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

          <View className="mb-10">
            <Paginator currentSlideIndex={currentSlideIndex} slidesData={slidesData} />
          </View>
        </View>

        <View className="flex flex-row justify-center mx-4 h-[124px]">{getButton()}</View>
      </View>
    </ScreenContainer>
  );
};

export default Introduction;
