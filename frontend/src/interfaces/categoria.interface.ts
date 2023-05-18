export interface ICategoria {
  _id?: string;
  nombre: string;
  estado?: boolean;
}

export interface ICategoriaResponse {
  total: number;
  categorias: ICategoria[];
}
