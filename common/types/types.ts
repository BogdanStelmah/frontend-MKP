import { User } from '@react-native-google-signin/google-signin';

import { LangEnum, ThemeEnum } from '@/common/enums';
import { GenderEnum } from '@/common/enums/gender.enum';

export interface IUser {
  email: string;
  password: string;
}

export interface ISettings {
  theme: ThemeEnum;
  language: LangEnum;
}

export interface IUserPersonalInfo {
  firstName: string;
  lastName: string;
  gender: GenderEnum;
}

export interface IUserFullInfo extends IUserPersonalInfo {
  setting: ISettings;
}

export interface IGoogleUser extends User {}
