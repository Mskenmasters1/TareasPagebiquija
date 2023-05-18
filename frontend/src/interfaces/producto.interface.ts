export interface IProducto {
  _id?: string;
  nombre: string;
  estado?: boolean;
  categoria: ICategoriaProducto | string;
  precio: number;
  descripcion: string;
  disponible: boolean;
}

export interface ICategoriaProducto {
  _id: string;
  nombre: string;
}

export interface IProductoResponse {
  total: number;
  productos: IProducto[];
}
