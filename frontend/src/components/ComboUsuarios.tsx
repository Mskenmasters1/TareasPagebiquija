import { ChangeEvent, useEffect, useState } from 'react';
import { ICategoria, ICategoriaResponse } from '../interfaces/categoria.interface';
import { useFetchGet } from '../hooks/useFetchGet';

interface IComboUsuariosProps {
  setSelected: ({ target }: React.ChangeEvent<HTMLSelectElement>) => void;
  activa?: string;
}

export const ComboUsuarios = ({ setSelected, activa }: IComboUsuariosProps) => {
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const { loading, data, status, errorFetch } = useFetchGet<ICategoriaResponse>(
    'http://localhost:3000/api/categorias',
    true
  );

  useEffect(() => {
    if (status === 200) {
      setCategorias([{ nombre: 'Elige una categoría', _id: '' }, ...data.categorias]);
    }
  }, [status]);

  const selectedCategoria = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelected(e);
  };

  return (
    <>
      {categorias && status === 200 && (
        <select
          className="form-select"
          aria-label="Categorías"
          id="categoria"
          onChange={selectedCategoria}
          value={activa}
        >
          {categorias.map((x, i) => (
            <option key={x._id} value={x._id}>
              {x.nombre}
            </option>
          ))}
        </select>
      )}
    </>
  );
};
