import { User } from '@react-native-google-signin/google-signin';

import { GenderEnum } from '@/common/enums/gender.enum';

export interface IUser {
  email: string;
  password: string;
}

export interface IUserPersonalInfo {
  firstName: string;
  lastName: string;
  gender: GenderEnum;
}

export interface IGoogleUser extends User {}
