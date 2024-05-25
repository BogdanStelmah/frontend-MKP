import { AntDesign } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { FontWeightEnum } from '@/common/enums';
import Text2sm from '@/components/ui/Typography/Text2sm';

interface IngredientItemProps {
  ingredientsString: string[];
  handleDeleteIngredient: (index: number) => void;
}

const IngredientItem: React.FC<IngredientItemProps> = ({
  ingredientsString,
  handleDeleteIngredient
}) => {
  const { colorScheme } = useColorScheme();

  return (
    <View>
      {ingredientsString.map((ingredient, index) => (
        <View
          className="h-[46px] bg-background border border-brown-camouflage dark:border-black-greyscale-main-dark rounded-lg mt-1 flex-row justify-between items-center"
          key={ingredient + index}
        >
          <Text2sm fontWeight={FontWeightEnum.MEDIUM} extraStyles="px-[12px]">
            {ingredient}
          </Text2sm>

          <TouchableOpacity onPress={() => handleDeleteIngredient(index)} className="pr-[12px]">
            <AntDesign
              name="close"
              size={17}
              color={colorScheme === 'light' ? '#454545' : '#BFBFBF'}
            />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default IngredientItem;
