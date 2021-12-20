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

export interface ISpacesParams {
  pageSize: number;
  pageNum: number;
}

export const getSpaceListApi = (params: ISpacesParams) => {
  return useHttp<DataResp<ISpaceData[]>>({
    url: '/space/list',
    method: 'GET',
    params: {
      ...params,
    },
  });
};

export const getSpaceByIdApi = (sid: string) => {
  console.log(sid);
  return useHttp<BasicResp<ISpaceData>>({
    url: '/space',
    method: 'GET',
    params: {
      sid: sid,
    },
  });
};
