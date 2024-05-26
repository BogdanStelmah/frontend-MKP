import * as ImagePicker from 'expo-image-picker';
import React, { useEffect } from 'react';
import { Image, Platform, TouchableOpacity, View } from 'react-native';

import { FontWeightEnum } from '@/common/enums';
import Text2md from '@/components/ui/Typography/Text2md';
import i18n from '@/i18n';

export interface ImageInputProps {
  image: string | null;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
}

const ImageInput: React.FC<ImageInputProps> = ({ setImage, image }) => {
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <TouchableOpacity onPress={pickImage} activeOpacity={100}>
      <Image
        style={{ height: 200, width: '100%' }}
        source={!image ? require('../../../assets/images/slide-1.png') : { uri: image }}
        className="rounded-sm"
      />

      {!image && (
        <View className="absolute h-[200px] w-full items-center justify-center">
          <Text2md fontWeight={FontWeightEnum.SEMIBOLD}>{i18n.t('general.choose-image')}</Text2md>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ImageInput;
