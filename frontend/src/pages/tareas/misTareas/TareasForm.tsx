import { FormEvent, useEffect, useState } from 'react';
import { useForm } from '../../../hooks/useForm';
import { useFetchPost } from '../../../hooks/useFetchPost';
import { IProducto as ITarea } from '../../../interfaces/tarea.interface';
import { ComboCategorias } from '../../../components/ComboCategorias';

interface ITareasFormProps {
  setRefreshTareas: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TareasForm = ({ setRefreshTareas: setRefreshTareas }: ITareasFormProps) => {
  const [body, setBody] = useState<string>('');
  const { form, onInputChange, onSelectChange, onResetForm, onCheckBoxChange } = useForm<ITarea>({
    titulo: '',
    terminada: true,
    descripcion: '',
    observaciones: '',
    fecha: '',
    usuario: ''
  });

  const { titulo: titulo, usuario: categoria, descripcion, terminada: terminada, fecha, observaciones } = form;

  const {
    loading,
    data: response,
    status,
    errorFetch,
    errorMsg
  } = useFetchPost<ITarea>('http://localhost:3000/api/tareas', body);

  useEffect(() => {
    if (status === 201 && !loading) {
      onResetForm;
      setRefreshTareas(true);
    }
    setBody('');
  }, [loading]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const tarea: ITarea = {
      titulo: titulo,
      fecha: fecha,
      observaciones: observaciones,
      descripcion: descripcion,
      usuario: categoria,
      terminada: terminada,
    };
    setBody(JSON.stringify(tarea));
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="titulo">Titulo</label>
          <input className="form-control" id="titulo" required type="text" value={titulo} onChange={onInputChange} />
          {titulo.trim() === ''}
        </div>
        <ComboCategorias setSelected={onSelectChange} />
        <div className="form-group">
          <label htmlFor="descripcion">Descripción</label>
          <input className="form-control" id="descripcion" type="text" value={descripcion} onChange={onInputChange} />
          {descripcion.trim() === '' && <small className="text-danger">Descripción obligatoria</small>}
        </div>
        <div className="form-group">
          <label htmlFor="precio">Precio</label>
          <input className="form-control" id="precio" type="number" value={precio} onChange={onInputChange} />
          {precio.toString() === '' && <small className="text-danger">Precio obligatorio</small>}
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="disponible"
            checked={terminada}
            onChange={onCheckBoxChange}
          />
          <label className="form-check-label" htmlFor="disponible">
            Disponible
          </label>
        </div>
        <button className="btn btn-success" type="submit" disabled={titulo.trim() === ''}>
          Agregar producto
        </button>
      </form>

      {loading && (
        <div className="alert alert-warning" role="alert">
          Agregando producto...
        </div>
      )}
      {errorFetch && !loading && (
        <div className="alert alert-danger" role="alert">
          {errorMsg}
        </div>
      )}
    </>
  );
};
