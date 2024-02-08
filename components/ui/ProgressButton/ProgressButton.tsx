import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

import NextIcon from '../../../assets/icons/next-button.svg';

interface ProgressButtonProps {
  progress: number;
  handleScroll: any;
}

const ProgressButton: React.FC<ProgressButtonProps> = ({ progress, handleScroll }) => {
  const size = 80;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <View>
      <Svg className="w-20 h-20" fill="none">
        <G rotation="-90" origin={center}>
          <Circle
            r={radius}
            cx={center}
            cy={center}
            strokeWidth={strokeWidth}
            className="stroke-green-secondary opacity-30"
          />
          <Circle
            r={radius}
            cx={center}
            cy={center}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - circumference * progress}
            className="stroke-green-secondary"
          />
        </G>
      </Svg>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={handleScroll}
        className="bg-green-secondary w-16 h-16 rounded-full absolute ml-2 mt-2">
        <View className="mt-5 ml-6">
          <NextIcon />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProgressButton;
