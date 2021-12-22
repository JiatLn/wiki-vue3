import useHttp from '@/api/useHttp';
import type { BasicResp, DataResp } from '@/api/types';

export interface INoteData {
  nid: string;
  space: string;
  title: string;
  content: string;
  author: string;
  createAt: string;
  updateAt: string;
  isPublished: Boolean;
  isDeleted: Boolean;
}

export const addNoteApi = (data: Partial<INoteData>) => {
  return useHttp<BasicResp<Partial<INoteData>>>({
    url: '/note',
    method: 'POST',
    data: {
      ...data,
    },
  });
};

export interface INotesParams {
  pageSize: number;
  pageNum: number;
  space: string;
}

export const getNoteListApi = (params: INotesParams) => {
  return useHttp<DataResp<INoteData[]>>({
    url: '/note/list',
    method: 'GET',
    params: {
      ...params,
    },
  });
};

export const getNoteByIdApi = (nid: string) => {
  return useHttp<BasicResp<INoteData>>({
    url: '/note',
    method: 'GET',
    params: {
      nid: nid,
    },
  });
};
