import { User } from '@/entities';
import {
  IAccessToken,
  IRefreshToken,
  ISignIn,
  ISignUp,
  TokenPair,
  WrongResponse,
} from '@/shared';
import { API_SERVER_URL } from '@/shared/config';
import axios, { AxiosError, AxiosResponse } from 'axios';

const DefaultTriesCount = 2;

class _Auth {
  public url: string;

  constructor() {
    this.url = `${API_SERVER_URL}/auth`;
  }

  async signIn(
    data: ISignIn,
    tries = DefaultTriesCount
  ): Promise<AxiosResponse<TokenPair>> {
    return await axios
      .post<TokenPair>(`${this.url}/sign-in`, data)
      .catch((e: AxiosError<WrongResponse>) => {
        return this._retry<ISignIn, ReturnType<typeof this.signIn>>(
          this.signIn,
          tries,
          e,
          data
        );
      });
  }

  async signUp(
    data: ISignUp,
    tries = DefaultTriesCount
  ): Promise<AxiosResponse<User>> {
    return await axios
      .post<User>(`${this.url}/sign-up`, data)
      .catch((e: AxiosError<WrongResponse>) => {
        return this._retry<ISignUp, ReturnType<typeof this.signUp>>(
          this.signUp,
          tries,
          e,
          data
        );
      });
  }

  async refresh(
    data: IRefreshToken,
    tries = DefaultTriesCount
  ): Promise<AxiosResponse<IAccessToken>> {
    return await axios
      .post<IAccessToken>(`${this.url}/refresh`, data)
      .catch((e: AxiosError<WrongResponse>) => {
        return this._retry<IRefreshToken, ReturnType<typeof this.refresh>>(
          this.refresh,
          tries,
          e,
          data
        );
      });
  }

  async userByToken(
    token: string,
    tries = DefaultTriesCount
  ): Promise<AxiosResponse<User>> {
    return await axios
      .get<User>(`${this.url}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((e: AxiosError<WrongResponse>) => {
        return this._retry<string, ReturnType<typeof this.userByToken>>(
          this.userByToken,
          tries,
          e,
          token
        );
      });
  }

  _retry = async <DataType, ResponseType>(
    cb: (data: DataType, tries: number) => ResponseType,
    tries: number,
    { response }: AxiosError<WrongResponse>,
    ...data: [DataType]
  ) => {
    if (response?.status && response.status >= 500) {
      throw new Error('Somethings wrong... Try later');
    }

    if (response?.status && response.status === 401) {
      throw new Error(response?.data.detail);
    }

    if (tries === 0) {
      throw new Error(response?.data.detail);
    }

    return cb.bind(this)(...data, tries - 1);
  };
}

export const AuthApiCore = new _Auth();
