export interface ITarea {
  _id?: string;
  titulo: string;
    fecha: string;
  estado?: boolean;
  usuario: IUsuario | string;
  descripcion: string;
  terminada: boolean;
    observaciones: string;
}

export interface IUsuario {
  _id: string;
  nombre: string;
}

export interface ITareaResponse {
  total: number;
  tareas: ITarea[];
}
