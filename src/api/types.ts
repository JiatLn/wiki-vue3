export interface BasicResp<T> {
  code: number;
  data: T;
  msg: string;
}

export interface LoginResp {
  token: string;
  username: string;
}

export interface DataResp<T> {
  code: number;
  data: {
    total: number;
    rows: T;
  };
  msg: string;
}
