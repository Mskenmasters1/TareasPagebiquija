import { Types } from 'mongoose';

export interface ITarea {
  titulo: string;
  fecha: Date;
  estado: boolean;
  usuario: Types.ObjectId;
  observaciones: string;
  descripcion: string;
  terminada: boolean;
}
