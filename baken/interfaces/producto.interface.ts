import { Types } from 'mongoose';

export interface IProducto {
  nombre: string;
  estado: boolean;
  categoria: Types.ObjectId;
  precio: number;
  descripcion: string;
  disponible: boolean;
}
