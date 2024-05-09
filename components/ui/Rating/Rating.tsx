import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { View } from 'react-native';

interface RatingProps {
  value: number;
}

const Rating: React.FC<RatingProps> = ({ value }) => {
  const { colorScheme } = useColorScheme();

  if (value < 1.0 || value > 5.5) return null;

  const roundedValue = Math.round(value * 2) / 2;

  const stars: React.ReactNode[] = [];

  const color = colorScheme === 'light' ? '#4F7942' : '#3F8B28';

  for (let i = 1; i <= 5; i++) {
    if (roundedValue >= i) {
      stars.push(<FontAwesome key={i} name="star" size={20} color={color} />);
    } else if (roundedValue >= i - 0.5) {
      stars.push(<FontAwesome key={i} name="star-half-o" size={20} color={color} />);
    } else {
      stars.push(<FontAwesome key={i} name="star-o" size={20} color={color} />);
    }
  }

  return <View className="flex flex-row gap-[1px]">{stars.map((star) => star)}</View>;
};

export default Rating;
