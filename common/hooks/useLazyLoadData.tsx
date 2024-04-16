import { useEffect, useState } from 'react';

import { PaginationParams } from '@/common/interfaces';
import { useRecipeStore } from '@/store/recipeStore';

export function useLazyLoadData<T, F>(
  initialLimit: number = 10,
  fetch: F
): [T[], PaginationParams, () => void] {
  const [data, setData] = useState<T[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [limit] = useState<number>(initialLimit);

  const isLoading = useRecipeStore.use.isLoading();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (typeof fetch !== 'function') return;

    const data = await fetch();
    setData((prevData) => [...prevData, ...data]);
    setOffset((prevOffset) => prevOffset + limit);
  };

  const loadMoreData = async () => {
    if (!isLoading) await fetchData();
  };

  return [data, { offset, limit }, loadMoreData];
}
