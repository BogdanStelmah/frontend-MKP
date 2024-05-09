import classNames from 'classnames';
import React from 'react';
import { View } from 'react-native';

import { FontWeightEnum } from '@/common/enums/fontWeight.enum';
import TextLg from '@/components/ui/Typography/TextLg';

interface TabTitleProps {
  title: string;
  extraStyles?: string;
  extraTitleStyles?: string;
}

const TabTitle: React.FC<TabTitleProps> = ({ title, extraStyles, extraTitleStyles }) => {
  const styleMap = {
    mainBlock: classNames(extraStyles, {
      'my-[7px] flex items-center': true
    }),
    title: classNames(extraTitleStyles, {
      'text-black-greyscale-main dark:text-black-greyscale-main-dark text-center': true
    })
  };

  return (
    <View className={styleMap.mainBlock}>
      <TextLg fontWeight={FontWeightEnum.BOLD} extraStyles={styleMap.title}>
        {title}
      </TextLg>
    </View>
  );
};

export default TabTitle;
