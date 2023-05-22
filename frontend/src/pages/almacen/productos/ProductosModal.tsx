import { FormEvent, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from '../../../hooks/useForm';
import { useFetchPut } from '../../../hooks/useFetchPut';
import { ICategoriaProducto, IProducto } from '../../../interfaces/tarea.interface';
import { ComboCategorias } from '../../../components/ComboCategorias';

interface IProductosModalProps {
  producto: IProducto;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setRefreshProductos: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
}

export const ProductosModal = ({ producto, setShow, setRefreshProductos, show }: IProductosModalProps) => {
  const [body, setBody] = useState<string>('');
  const { _id } = producto;
  const { form, onInputChange, onResetForm, onSelectChange, onCheckBoxChange } = useForm<IProducto>({
    titulo: producto.titulo,
    categoria: producto.categoria,
    descripcion: producto.descripcion,
    disponible: producto.disponible,
    precio: producto.precio
  });

  const { titulo: nombre, categoria, descripcion, disponible, precio } = form;

  const {
    loading,
    data: response,
    status,
    errorFetch,
    errorMsg
  } = useFetchPut<IProducto>(`http://localhost:3000/api/productos/${_id}`, body);

  const handleClose = () => setShow(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const producto: IProducto = {
      titulo: nombre,
      categoria: categoria,
      descripcion: descripcion,
      disponible: disponible,
      precio: precio
    };
    setBody(JSON.stringify(producto));
  };

  useEffect(() => {
    if ((status === 200 || status === 204) && !loading) {
      setRefreshProductos(true);
    }
    setBody('');
    handleClose();
  }, [loading]);

  return (
    <>
      <Modal show={show} onHide={handleClose} onShow={onResetForm}>
        <form onSubmit={onSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Modificar producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input className="form-control" id="nombre" type="text" value={nombre} onChange={onInputChange} />
              {nombre.trim() === '' && <small className="text-danger">Nombre obligatorio</small>}
            </div>
            <ComboCategorias setSelected={onSelectChange} activa={(categoria as ICategoriaProducto)._id} />
            <div className="form-group">
              <label htmlFor="descripcion">Descripción</label>
              <input
                className="form-control"
                id="descripcion"
                type="text"
                value={descripcion}
                onChange={onInputChange}
              />
              {descripcion.trim() === '' && <small className="text-danger">Descripción obligatoria</small>}
            </div>
            <div className="form-group">
              <label htmlFor="precio">Precio</label>
              <input className="form-control" id="precio" type="number" value={precio} onChange={onInputChange} />
              {precio.toString().trim() === '' && <small className="text-danger">Precio obligatorio</small>}
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
            {loading && (
              <div className="alert alert-warning" role="alert">
                Modificando producto...
              </div>
            )}
            {errorFetch && !loading && (
              <div className="alert alert-danger" role="alert">
                {errorMsg}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Guardar cambios
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};
