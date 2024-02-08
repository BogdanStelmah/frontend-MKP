import React from 'react';
import { View, Text, Image, ImageSourcePropType } from 'react-native';

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
        <Text className="text-black-greyscale-main font-barlow-bold text-2lg text-center mb-3">
          {item.title}
        </Text>
        <Text className="text-black-greyscale-main opacity-70 font-barlow-medium text-md text-center">
          {item.description}
        </Text>
      </View>
    </View>
  );
};

export default Slide;
