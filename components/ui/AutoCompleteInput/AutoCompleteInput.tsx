import React, { useState } from 'react';
import {
  GestureResponderEvent,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TouchableOpacity,
  View
} from 'react-native';

import { FontWeightEnum } from '@/common/enums';
import { TextInput } from '@/components/ui/TextInput';
import Text2sm from '@/components/ui/Typography/Text2sm';

export interface AutoCompleteInputProps {
  value?: string;
  label: string;
  placeholder: string;
  suggestions: string[];
  error?: boolean;
  helperText?: string;
  onSuggestionSelect?: (suggestion: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onPress?: (event: GestureResponderEvent) => void;
}

const AutoCompleteInput: React.FC<AutoCompleteInputProps> = ({
  label,
  placeholder,
  suggestions,
  onSuggestionSelect,
  value,
  onBlur,
  onPress,
  error,
  helperText
}) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const handleInputChange = (text: string) => {
    onSuggestionSelect?.(text);

    if (text) {
      const filtered = suggestions
        .filter((suggestion) => suggestion.toLowerCase().includes(text.toLowerCase()))
        .slice(0, 10);

      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSuggestionSelect = (suggestion: string) => {
    onSuggestionSelect?.(suggestion);
    setFilteredSuggestions([]);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (value) {
      const filtered = suggestions.filter(
        (suggestion) => suggestion.toLowerCase() === value.toLowerCase()
      );

      if (filtered.length === 1) setFilteredSuggestions([]);
    }
    onBlur?.(e);
  };

  const handleAddNew = () => {
    setFilteredSuggestions([]);
  };

  return (
    <View>
      <TextInput
        label={label}
        value={value}
        onChangeText={handleInputChange}
        placeholder={placeholder}
        onBlur={handleBlur}
        onPress={onPress}
        error={error}
        helperText={helperText}
      />

      {filteredSuggestions.length > 0 && (
        <View className="bg-background border border-brown-camouflage dark:border-black-greyscale-main-dark rounded-lg mt-1">
          <TouchableOpacity onPress={handleAddNew} className="h-[46px] justify-center">
            <Text2sm
              fontWeight={FontWeightEnum.MEDIUM}
              extraStyles="px-[12px] text-disable dark:text-disable-dark"
            >
              Додати новий
            </Text2sm>
          </TouchableOpacity>

          {filteredSuggestions.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => handleSuggestionSelect(item)}
              className="h-[46px] justify-center"
            >
              <Text2sm fontWeight={FontWeightEnum.MEDIUM} extraStyles="px-[12px]">
                {item}
              </Text2sm>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default AutoCompleteInput;
