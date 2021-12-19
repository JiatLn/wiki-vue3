import { BasicResp, DataResp } from '@/api/types';
import useHttp from '@/api/useHttp';

export interface ISpaceData {
  name: string;
  code: string;
  description: string;
  creator: string;
  updateAt: string;
  pageCount: number;
}

export const addSpaceApi = (data: Partial<ISpaceData>) => {
  return useHttp<BasicResp<null>>({
    url: '/space',
    method: 'POST',
    data: {
      ...data,
    },
  });
};

export const getSpaceListApi = () => {
  return useHttp<DataResp<ISpaceData[]>>({
    url: '/space/list',
    method: 'GET',
  });
};
