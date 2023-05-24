import { ChangeEvent, useEffect, useState } from 'react';
import { useFetchGet } from '../hooks/useFetchGet';
import { IComboUsuarios, IComboUsuariosResponse } from '../interfaces/comboUsuarios.interface';

interface IComboUsuariosProps {
  setSelected: ({ target }: React.ChangeEvent<HTMLSelectElement>) => void;
  activa?: string;
}

export const ComboUsuarios = ({ setSelected, activa }: IComboUsuariosProps) => {
  const [usuarios, setUsuarios] = useState<IComboUsuarios[]>([]);
  const { loading, data, status, errorFetch } = useFetchGet<IComboUsuariosResponse>(
    'http://localhost:3000/api/usuarios',
    true
  );

  useEffect(() => {
    if (status === 200) {
      setUsuarios([{ nombre: 'Asignar a', _id: '' }, ...data.usuarios]);
    }
  }, [status]);
  const selectedUsuario = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelected(e);
  };

  return (
    <>
      {usuarios && status === 200 && (
        <select
          className="form-select"
          label-for='Asignar a'
          required
          id="usuario"
          onChange={selectedUsuario}
          value={activa}
        >
          {usuarios.map((x, i) => (
            <option key={x._id} value={x._id}>
              {x.nombre}
            </option>
          ))}
        </select>
      )}
    </>
  );
};
