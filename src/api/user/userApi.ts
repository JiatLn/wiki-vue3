import type { BasicResp, LoginResp } from '@/api/types';
import useHttp from '@/api/useHttp';

export interface LoginData {
  username: string;
  password: string;
  // code: string;
  // uuid: string;
}

export const loginApi = (data: LoginData) => {
  return useHttp<BasicResp<LoginResp>>({
    url: '/user/login',
    method: 'POST',
    data: {
      ...data,
    },
  });
};

export interface CaptchaImage {
  code: number;
  img: string;
  msg: string;
  uuid: string;
}

export const getCaptchaImageApi = () => {
  return useHttp<CaptchaImage>({
    url: '/captchaImage',
    method: 'GET',
  });
};

export interface RegisterData {
  username: string;
  password: string;
}

export const registerApi = (data: RegisterData) => {
  return useHttp<BasicResp<string>>({
    url: '/user/register',
    method: 'POST',
    data: {
      ...data,
    },
  });
};
