import { Api } from "./api.service";

export interface IApiOptions {
  isAuthed?: boolean;
}

type Method = keyof Api;

export interface IUseFetchProps {
  method: Method;
  url: string;
  data?: object;
  options?: IApiOptions;
}
