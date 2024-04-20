import { useEffect, useState } from 'react';

import { PaginationParams } from '@/common/interfaces';

export function useLazyLoadData<T, F>(
  initialLimit: number = 10,
  fetch: F
): [T[], PaginationParams, () => void, boolean] {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<T[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [limit] = useState<number>(initialLimit);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (typeof fetch !== 'function') return;

    setIsLoading(true);

    const data = await fetch();
    setData((prevData) => [...prevData, ...data]);
    setOffset((prevOffset) => prevOffset + limit);

    setIsLoading(false);
  };

  const loadMoreData = async () => {
    if (!isLoading) await fetchData();
  };

  return [data, { offset, limit }, loadMoreData, isLoading];
}
