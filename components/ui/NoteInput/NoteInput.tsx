import { Feather } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

interface NoteInputProps {
  value?: string;
  isDisabled?: boolean;
  onChangeText: (text: string) => void;
  onPressPlus: () => void;
}

const NoteInput: React.FC<NoteInputProps> = ({
  value = '',
  onChangeText,
  onPressPlus,
  isDisabled
}) => {
  const { colorScheme } = useColorScheme();

  return (
    <View className="flex-row items-center">
      <View className="flex-1">
        <TextInput
          placeholder="Додати інгредієнт"
          value={value}
          onChangeText={onChangeText}
          editable={!isDisabled}
          className="font-lato-medium w-full h-[30px] text-black-greyscale-main dark:text-black-greyscale-main-dark border border-brown-camouflage dark:border-black-greyscale-main-dark px-3 pb-[2px] rounded-lg text-[15px] focus:border-yellow-camouflage"
        />
      </View>

      <TouchableOpacity onPress={onPressPlus} disabled={value === ''} className="ml-[10px]">
        <Feather
          name="plus-circle"
          size={30}
          color={colorScheme === 'light' ? '#4F7942' : '#3F8B28'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default NoteInput;
