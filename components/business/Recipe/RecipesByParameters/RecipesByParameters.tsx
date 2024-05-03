import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

import RecipeListSkeleton from '../../../ui/Skeletons/RecipeListSkeleton';
import RecipeCard from '../RecipeCard/RecipeCard';

import { IPreviewRecipe } from '@/common/entities';
import { FilterRecipeParams, PaginationParams, SearchParam } from '@/common/interfaces';
import { useRecipeStore } from '@/store/recipeStore';

interface RecipesByParametersProps {
  queryParams: Partial<PaginationParams & SearchParam & FilterRecipeParams>;
  onPressOnRecipeHandler: (recipeId: number) => void;
}

const RecipesByParameters: React.FC<RecipesByParametersProps> = ({
  queryParams = {},
  onPressOnRecipeHandler
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [previewRecipes, setPreviewRecipes] = useState<IPreviewRecipe[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [limit] = useState<number>(16);

  const fetchPreviewRecipes = useRecipeStore.use.fetchPreviewRecipes();

  useEffect(() => {
    setIsLoading(true);
    setPreviewRecipes([]);

    if (Object.keys(queryParams).length > 0) {
      fetchPreviewRecipes({ ...queryParams, limit, offset })
        .then((data) => {
          if (Array.isArray(data)) {
            setPreviewRecipes(data);
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [queryParams]);

  // TODO: Implement loadMoreData function

  return (
    <ScrollView showsHorizontalScrollIndicator={false} className="mb-20">
      {!isLoading && (
        <View className="flex-wrap flex-row m-4">
          {previewRecipes.map((recipe, index) => (
            <View
              key={recipe.id}
              className={index % 2 !== 1 ? 'pr-2 w-[50%] mb-4' : 'pl-2 w-[50%] mb-4'}
            >
              <RecipeCard
                recipe={recipe}
                onPress={() => onPressOnRecipeHandler(recipe.id)}
                size="medium"
              />
            </View>
          ))}
        </View>
      )}

      {isLoading && <RecipeListSkeleton numberOfSkeletons={16} />}
    </ScrollView>
  );
};

export default RecipesByParameters;
