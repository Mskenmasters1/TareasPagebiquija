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
  const { titulo, usuario, descripcion, terminada, fecha, observaciones } = form;
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<string>('');

  const { loading, status, errorFetch, errorMsg } = useFetchPost<ITarea>('http://localhost:3000/api/tareas', body);

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
      usuario: usuario,
      terminada: terminada
    };

    setBody(JSON.stringify(tarea));
  };

  const { usuarioInfo } = useContext<IUsuarioInfoContext>(AppContext);

  useEffect(() => {
    if (loading) {
      setMessage('          Guardando tarea...');
      setMessageType('warning');
    } else if (errorFetch) {
      setMessage(errorMsg);
      setMessageType('danger');
    } else if (status === 201 || status === 200) {
      setMessage('Tarea guardada');
      setMessageType('success');
    } else {
      setMessage('');
      setMessageType('');
    }
  }, [loading, errorFetch, status]);


  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 5000); // Los mensajes se borraran después de 5 segundos

      return () => clearTimeout(timer); // Limpia el timer si el componente se desmonta
    }
  }, [message]);


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

        <ComboUsuarios setSelected={onSelectChange} activa={usuarioInfo.nombre} />
        <div className="form-group">
          <label htmlFor="descripcion">Descripción</label>
          <input className="form-control" id="descripcion" type="text" value={descripcion} onChange={onInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="observaciones">Observaciones</label>
          <textarea
            className="form-control"
            id="observaciones"
            value={observaciones}
            onChange={onInputChange}
          ></textarea>
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

      {message && (
        <div className={`alert alert-${messageType}`} role="region" aria-live="assertive">
          {message}
        </div>
      )}


    </>
  );
};
