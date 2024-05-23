import { axiosInstance as axios } from '@/services/api';

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);
