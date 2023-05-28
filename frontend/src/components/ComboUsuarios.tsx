import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useFetchGet } from '../hooks/useFetchGet';
import { IUsuario } from '../interfaces/usuario.interface';
import { AppContext } from '../context/AppContext';
import { IUsuarioInfoContext } from '../interfaces/context.interface';

interface IComboUsuariosProps {
  setSelected: ({ target }: React.ChangeEvent<HTMLSelectElement>) => void;
  activa?: string;
}

// En la respuesta del login no viene el id del usuario de mongo, luego no se almacena ese dato en el context
// Por eso, a activa le paso del form el nombre del usuario para que tome por defecto el usuario autenticado.
// Estaría mejor que node devolviera del login el id además del nombre, ese id también fuera al context y
// que activa fuera el id. Eso permitiría buscar el usuario por defecto mediante el id
// Yo he puesto el value del select vinculado a una función getValue que devuelve, de los usuarios, el que está autenticado según su nombre (activa)
// He estado mirando documentación y cuando se pone un valor por defecto en un select, no se dispara el onChange.
// He implementado un useEffect para que se dispare cuando lleguen los usuarios. Lo que hago es capturar el select y disparar un evento (dispatchEvent)
// change y así lo hace. el bubbles true lo he tenido que poner porque sino no se propaga bien a los contenedores superiores
export const ComboUsuarios = ({ setSelected, activa }: IComboUsuariosProps) => {
  const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
  const { data, status } = useFetchGet<IUsuario[]>('http://localhost:3000/api/usuarios', true);
  // const { usuarioInfo } = useContext<IUsuarioInfoContext>(AppContext);
  // console.log(usuarioInfo)
  useEffect(() => {
    if (status === 200) {
      setUsuarios(data);
    }
  }, [status]);

  const getValue = () => {
    return usuarios.find((x) => x.nombre === activa)?._id;
  };

  useEffect(() => {
    if (usuarios.length > 0) {
      const select = document.querySelector('select')!;
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }, [usuarios]);

  const selectedUsuario = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setSelected(e);
  };

  return (
    <>
      {usuarios && status === 200 && (
        <>
          <label htmlFor="usuario">Asignar a:</label>
          <select className="form-select" required id="usuario" onChange={selectedUsuario} value={getValue()}>
            {usuarios.map((x) =>
              x.nombre === activa ? (
                <option key={x._id} value={usuarios.find((x) => x.nombre === activa)?._id}>
                  A mí
                </option>
              ) : (
                <option key={x._id} value={x._id}>
                  {x.nombre}
                </option>
              )
            )}
          </select>
        </>
      )}
    </>
  );
};
