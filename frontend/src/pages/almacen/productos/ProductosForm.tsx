import { FormEvent, useEffect, useState } from 'react';
import { useForm } from '../../../hooks/useForm';
import { useFetchPost } from '../../../hooks/useFetchPost';
import { IProducto } from '../../../interfaces/tarea.interface';
import { ComboCategorias } from '../../../components/ComboCategorias';

interface IProductosFormProps {
  setRefreshProductos: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProductosForm = ({ setRefreshProductos }: IProductosFormProps) => {
  const [body, setBody] = useState<string>('');
  const { form, onInputChange, onSelectChange, onResetForm, onCheckBoxChange } = useForm<IProducto>({
    titulo: '',
    disponible: true,
    descripcion: '',
    precio: 0,
    categoria: ''
  });

  const { titulo: nombre, categoria, descripcion, disponible, precio } = form;

  const {
    loading,
    data: response,
    status,
    errorFetch,
    errorMsg
  } = useFetchPost<IProducto>('http://localhost:3000/api/productos', body);

  useEffect(() => {
    if (status === 201 && !loading) {
      onResetForm;
      setRefreshProductos(true);
    }
    setBody('');
  }, [loading]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const producto: IProducto = {
      titulo: nombre,
      descripcion: descripcion,
      categoria: categoria,
      disponible: disponible,
      precio: precio
    };
    setBody(JSON.stringify(producto));
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input className="form-control" id="nombre" type="text" value={nombre} onChange={onInputChange} />
          {nombre.trim() === '' && <small className="text-danger">Nombre obligatorio</small>}
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
            checked={disponible}
            onChange={onCheckBoxChange}
          />
          <label className="form-check-label" htmlFor="disponible">
            Disponible
          </label>
        </div>
        <button className="btn btn-success" type="submit" disabled={nombre.trim() === ''}>
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
