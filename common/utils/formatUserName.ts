import { IRecipeAuthor } from '@/common/entities/user.entity';

export const formatUserName = (author: IRecipeAuthor): string => {
  if (author.lastName) {
    return `${author.firstName} ${author.lastName}`;
  } else {
    return author.firstName;
  }
};
