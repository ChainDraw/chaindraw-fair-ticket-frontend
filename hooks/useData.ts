import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';

const useData = (endpoint: string) => {
  const { data, error } = useSWR(endpoint, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useData;
