import { Feather } from '@expo/vector-icons';
import classNames from 'classnames';
import React from 'react';
import {
  GestureResponderEvent,
  KeyboardType,
  NativeSyntheticEvent,
  TextInput as DefaultTextInput,
  TextInputFocusEventData,
  TouchableOpacity,
  View
} from 'react-native';

export interface SearchInputProps {
  placeholder: string;
  value?: string;
  maxLength?: number;
  extraStyles?: string;
  keyboardType?: KeyboardType;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  onChangeText?: (value: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onPress?: (event: GestureResponderEvent) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  autoCapitalize = 'none',
  extraStyles,
  onPress,
  ...props
}) => {
  const styleMap = {
    textInput: classNames(
      {
        'font-lato-medium h-[40px] text-black-greyscale-main px-[8px] pb-[1px] text-2sm flex-1':
          true
      },
      extraStyles
    )
  };

  return (
    <View className="h-[40px] rounded-lg bg-chosen flex-1">
      <TouchableOpacity activeOpacity={100} onPress={onPress}>
        <View className="flex-row px-[8px] items-center">
          <Feather size={22} name="search" color="#909590" />

          <DefaultTextInput
            placeholderTextColor="#909590"
            className={styleMap.textInput}
            autoCapitalize={autoCapitalize}
            {...props}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
