import { IUserData } from "../user/types";

export interface IAuthResponse {
  result: IUserData;
  token: string;
  accessToken: string;
}
