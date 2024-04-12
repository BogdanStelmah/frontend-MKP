export interface IRecipe extends IPreviewRecipe {
  description?: string;
  cookingInstructions: string;
  calorieContent: string;
  weight: number;
  numberOfServings: number;
}

export interface IPreviewRecipe {
  id: number;
  imageUrl?: string;
  title: string;
}
