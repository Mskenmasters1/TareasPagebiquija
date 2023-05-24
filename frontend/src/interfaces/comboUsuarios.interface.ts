export interface IComboUsuarios {
  _id?: string;
  nombre: string;
  estado?: boolean;
}

export interface IComboUsuariosResponse {
  total: number;
  usuarios: IComboUsuarios[];
}
