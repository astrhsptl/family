export interface ISignUp {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  family_id?: string;
}

export interface ISignIn {
  email: string;
  password: string;
}

export interface IAccessToken {
  access: string;
}

export interface IRefreshToken {
  refresh: string;
}

export interface TokenPair {
  refresh: string;
  access: string;
}
