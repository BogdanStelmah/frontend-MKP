import React from 'react';
import { View, ImageSourcePropType } from 'react-native';

interface PaginatorProps {
  currentSlideIndex: number;
  slidesData: {
    id: string;
    title: string;
    description: string;
    imageSource: ImageSourcePropType;
  }[];
}

const Paginator: React.FC<PaginatorProps> = ({ currentSlideIndex, slidesData }) => {
  const getOpacity = (index: number) => {
    if (index !== currentSlideIndex) {
      return 'opacity-20';
    }
  };

  return (
    <View className="flex flex-row flex-wrap justify-center space-x-2">
      {slidesData.map((_, i) => {
        return (
          <View
            className={'bg-blue-primary h-1.5 w-5 rounded inline ' + getOpacity(i)}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
};

export default Paginator;
