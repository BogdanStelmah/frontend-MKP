import { GenderEnum } from '@/common/enums/gender.enum';

export interface IUser {
  email: string;
  password: string;
}

export interface IUserEntity extends IUser {
  id: number;
  gender: GenderEnum;
}
