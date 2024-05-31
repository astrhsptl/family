import {
  IAccessToken,
  IRefreshToken,
  ISignIn,
  ISignUp,
  IUser,
  TokenPair,
  WrongResponse,
} from '@/shared';
import { API_SERVER_URL } from '@/shared/config';
import axios, { AxiosResponse } from 'axios';

const DefaultTriesCount = 2;

class _Auth {
  public url: string;

  constructor() {
    this.url = `${API_SERVER_URL}/auth`;
  }

  async signIn(
    data: ISignIn,
    tries = DefaultTriesCount
  ): Promise<AxiosResponse<TokenPair> | WrongResponse> {
    return await axios
      .post<TokenPair>(`${this.url}/sign-in`, data)
      .catch(() => {
        if (tries === 0) {
          return { data: null };
        }
        return this.signIn(data, tries - 1);
      });
  }

  async signUp(
    data: ISignUp,
    tries = DefaultTriesCount
  ): Promise<AxiosResponse<IUser> | WrongResponse> {
    return await axios.post<IUser>(`${this.url}/sign-up`, data).catch((e) => {
      console.log(e);

      if (tries === 0) {
        return { data: null };
      }
      return this.signUp(data, tries - 1);
    });
  }

  async refresh(
    data: IRefreshToken,
    tries = DefaultTriesCount
  ): Promise<AxiosResponse<IAccessToken> | WrongResponse> {
    return await axios
      .post<IAccessToken>(`${this.url}/refresh`, data)
      .catch(() => {
        if (tries === 0) {
          return { data: null };
        }
        return this.refresh(data, tries - 1);
      });
  }

  async userByToken(
    token: string,
    tries = DefaultTriesCount
  ): Promise<AxiosResponse<IUser> | WrongResponse> {
    return await axios
      .get<IUser>(`${this.url}/user`, { headers: { Authorization: token } })
      .catch(() => {
        if (tries === 0) {
          return { data: null };
        }
        return this.userByToken(token, tries - 1);
      });
  }
}

export const AuthApiCore = new _Auth();
