import { FormEvent, useEffect, useState } from 'react';
import { ICategoria } from '../../../interfaces/categoria.interface';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from '../../../hooks/useForm';
import { useFetchPut } from '../../../hooks/useFetchPut';

interface ICategoriasModalProps {
  categoria: ICategoria;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setRefreshCategorias: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
}

export const CategoriasModal = ({ categoria, setShow, setRefreshCategorias, show }: ICategoriasModalProps) => {
  const [body, setBody] = useState<string>('');
  const { _id } = categoria;
  const { form, onInputChange, onResetForm } = useForm<ICategoria>({
    nombre: categoria.nombre
  });

  const { nombre } = form;

  const {
    loading,
    data: response,
    status,
    errorFetch,
    errorMsg
  } = useFetchPut<ICategoria>(`http://localhost:3000/api/categorias/${_id}`, body);

  const handleClose = () => setShow(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const categoria: ICategoria = {
      nombre: nombre
    };
    setBody(JSON.stringify(categoria));
  };

  useEffect(() => {
    if ((status === 200 || status === 204) && !loading) {
      setRefreshCategorias(true);
    }
    setBody('');
    handleClose();
  }, [loading]);

  // Al pasarle valores mediante no literales (nombre: categoria.nombre) al iniciar el form, hay que hacer un setForm mediante onResetForm
  return (
    <>
      <Modal show={show} onHide={handleClose} onShow={onResetForm}>
        <form onSubmit={onSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Modificar categoría</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input className="form-control" id="nombre" type="text" value={nombre} onChange={onInputChange} />
              {nombre.trim() === '' && <small className="text-danger">Nombre obligatorio</small>}
            </div>
            {loading && (
              <div className="alert alert-warning" role="alert">
                Modificando categoría...
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
