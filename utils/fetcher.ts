import axios, { AxiosRequestConfig, Method } from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '', // 设置基础 URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetcher = <T>(
  url: string,
  method: Method = 'GET',
  data: any = null
): Promise<T> => {
  const config: AxiosRequestConfig = {
    method,
    url,
    data,
  };
  return axiosInstance(config).then((res) => res.data);
};
