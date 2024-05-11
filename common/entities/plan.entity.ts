import { IUser } from '@/common/types';

export interface IPlan {
  id: number;
  date: string;
  user?: IUser;
}
