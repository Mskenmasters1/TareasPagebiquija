import { FormEvent, useContext, useEffect, useState } from 'react';
import { useForm } from '../../../hooks/useForm';
import { useFetchPost } from '../../../hooks/useFetchPost';
import { ComboUsuarios } from '../../../components/ComboUsuarios';
import { ITarea } from '../../../interfaces/tarea.interface';
import { IUsuarioInfoContext } from '../../../interfaces/context.interface';
import { AppContext } from '../../../context/AppContext';


export const TareasForm = () => {
  const [body, setBody] = useState<string>('');
  const { form, onInputChange, onSelectChange, onResetForm, onCheckBoxChange } = useForm<ITarea>({
    titulo: '',
    terminada: false,
    descripcion: '',
    observaciones: '',
    fecha: '',
    usuario: ''
  });

  const { titulo: titulo, usuario: categoria, descripcion, terminada: terminada, fecha, observaciones } = form;

  const {
    loading,
    status,
    errorFetch,
    errorMsg
  } = useFetchPost<ITarea>('http://localhost:3000/api/tareas', body);

  useEffect(() => {
    if (status === 201 && !loading) {
      onResetForm;
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

  const { usuarioInfo } = useContext<IUsuarioInfoContext>(AppContext);

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="titulo">Título</label>
          <input className="form-control" id="titulo" required type="text" value={titulo} onChange={onInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="fecha">Fecha de creación</label>
          <input className="form-control" id="fecha" type="date" required value={fecha} onChange={onInputChange} />
        </div>

        <ComboUsuarios setSelected={onSelectChange} activa={usuarioInfo._id} />
        <div className="form-group">
          <label htmlFor="descripcion">Descripción</label>
          <input className="form-control" id="descripcion" type="text" value={descripcion} onChange={onInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="observaciones">Observaciones</label>
          <textarea className="form-control" id="observaciones" value={observaciones} onChange={onInputChange}></textarea>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="terminada"
            checked={terminada}
            onChange={onCheckBoxChange}
          />
          <label className="form-check-label" htmlFor="terminada">
            Terminada
          </label>
        </div>
        <button className="btn btn-success" type="submit">
          Guardar tarea
        </button>
      </form>

      {loading && (
        <div className="alert alert-warning" role="status" aria-live="polite">
          Guardando tarea...
        </div>
      )}
      {errorFetch && !loading && (
        <div className="alert alert-danger" role="status" aria-live='polite'>
          {errorMsg}
        </div>
      )}
      {(status === 200 || status === 201) && !loading && (
        <div className='alert alert-success' role='status' aria-live='polite'>
          Tarea guardada.
        </div>
      )}
    </>
  );
};
