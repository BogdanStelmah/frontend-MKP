import React from 'react';
import { Image, ImageSourcePropType, View } from 'react-native';

import { FontWeightEnum } from '@/common/enums/fontWeight.enum';
import Text2lg from '@/components/ui/Typography/Text2lg';
import TextMd from '@/components/ui/Typography/TextMd';

interface SlideProps {
  item: {
    id: string;
    title: string;
    description: string;
    imageSource: ImageSourcePropType;
  };
}

const Slide: React.FC<SlideProps> = ({ item }) => {
  return (
    <View className="w-screen">
      <Image source={item.imageSource} className="w-full h-[280] mb-2" />
      <View className="mx-5">
        <Text2lg
          fontWeight={FontWeightEnum.BOLD}
          extraStyles="text-black-greyscale-main dark:text-black-greyscale-main-dark text-center mb-3"
        >
          {item.title}
        </Text2lg>

        <TextMd
          fontWeight={FontWeightEnum.MEDIUM}
          extraStyles="text-black-greyscale-main dark:text-black-greyscale-main-dark opacity-70 text-center"
        >
          {item.description}
        </TextMd>
      </View>
    </View>
  );
};

export default Slide;
