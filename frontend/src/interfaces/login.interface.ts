import { IUsuario } from './usuario.interface';

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  usuario: IUsuario;
  token: string;
}

export interface IRefreshToken {
  newToken: string;
}
