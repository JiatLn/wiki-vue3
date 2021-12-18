export interface BasicResp<T> {
  code: number;
  data: T;
  msg: string;
}

export interface LoginResp {
  token: string;
  username: string;
}
