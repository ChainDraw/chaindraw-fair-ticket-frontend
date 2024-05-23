import useSWR, { SWRResponse } from 'swr';
import { fetcher } from '../utils/fetcher';

interface FetcherParams {
  [key: string]: any;
}

export const useGetData = <T>(url: string): SWRResponse<T, any> => {
  return useSWR<T>(url, (url: string) => fetcher<T>(url, 'GET'));
};

export const usePostData = <T>(
  url: string,
  options: FetcherParams
): SWRResponse<T, any> => {
  return useSWR<T>([url, options], (url: string) =>
    fetcher<T>(url, 'POST', options)
  );
};

export const usePatchData = <T>(
  url: string,
  options: FetcherParams
): SWRResponse<T, any> => {
  return useSWR<T>([url, options], (url: string) =>
    fetcher<T>(url, 'PATCH', options)
  );
};

export const useDeleteData = <T>(url: string): SWRResponse<T, any> => {
  return useSWR<T>(url, (url: string) => fetcher<T>(url, 'DELETE'));
};
