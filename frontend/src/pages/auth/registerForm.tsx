import { FormEvent, useEffect, useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { useFetchPost } from '../../hooks/useFetchPost';
import { ICategoria } from '../../../interfaces/categoria.interface';

interface ICategoriasFormProps {
  setRefreshCategorias: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CategoriasForm = ({ setRefreshCategorias }: ICategoriasFormProps) => {
  const [body, setBody] = useState<string>('');
  const { form, onInputChange } = useForm<ICategoria>({
    nombre: ''
  });

  const { nombre } = form;

  const {
    loading,
    data: response,
    status,
    errorFetch,
    errorMsg
  } = useFetchPost<ICategoria>('http://localhost:3000/api/categorias', body);

  useEffect(() => {
    if (status === 201 && !loading) {
      setRefreshCategorias(true);
    }
    setBody('');
  }, [loading]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const categoria: ICategoria = {
      nombre: nombre
    };
    setBody(JSON.stringify(categoria));
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input className="form-control" id="nombre" type="text" value={nombre} onChange={onInputChange} />
          {nombre.trim() === '' && <small className="text-danger">Nombre obligatorio</small>}
        </div>
        <button className="btn btn-success" type="submit" disabled={nombre.trim() === ''}>
          Agregar categoría
        </button>
      </form>

      {loading && (
        <div className="alert alert-warning" role="alert">
          Agregando categoría...
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
