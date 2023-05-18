import { useEffect, useState } from 'react';
import { useFetchDelete } from '../../../hooks/useFetchDelete';
import { ICategoria, ICategoriaResponse } from '../../../interfaces/categoria.interface';
import Modal from 'react-bootstrap/Modal';
import { CategoriasModal } from './CategoriasModal';

interface ICategoriasTableProps {
  categoriasResponse: ICategoriaResponse;
  setRefreshCategorias: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CategoriasTable = ({ categoriasResponse, setRefreshCategorias }: ICategoriasTableProps) => {
  const [url, setUrl] = useState<string>('');
  const [showModificar, setShowModificar] = useState(false);
  const [show, setShow] = useState(false);
  const [categoriaModal, setCategoriaModal] = useState<ICategoria>({ nombre: '' });
  const [categoriaEliminar, setCategoriaEliminar] = useState<string>('');
  const { total, categorias } = categoriasResponse;

  const { loading, data: response, status, errorFetch, errorMsg } = useFetchDelete<ICategoria>(url);

  const handleClose = () => setShow(false);
  const handleShow = (id: string | undefined) => {
    id && setCategoriaEliminar(id);
    setShow(true);
  };

  const editCategoria = (e: ICategoria) => {
    setCategoriaModal(e);
    setShowModificar(true);
  };

  const deleteCategoria = () => {
    setUrl('http://localhost:3000/api/categorias/' + categoriaEliminar);
    setShow(false);
  };

  useEffect(() => {
    if (status === 200) {
      setRefreshCategorias(true);
    }
  }, [response]);

  return (
    <>
      {categorias?.length > 0 && (
        <>
          <h2>Total categorías: {total}</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((x) => (
                <tr key={x._id}>
                  <td>{x.nombre}</td>
                  <td>
                    <button className="btn btn-warning" onClick={() => editCategoria(x)}>
                      Modificar
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-danger" onClick={() => handleShow(x._id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {loading && (
        <div className="alert alert-warning" role="status" aria-live="polite">
          Eliminando categoría...
        </div>
      )}
      {errorFetch && !loading && (
        <div className="alert alert-danger" role="status" aria-live="polite">
          {errorMsg}
        </div>
      )}

      <CategoriasModal
        categoria={categoriaModal}
        show={showModificar}
        setShow={setShowModificar}
        setRefreshCategorias={setRefreshCategorias}
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar categoría</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Está seguro?</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>
            Cancelar
          </button>
          <button className="btn btn-danger" onClick={() => deleteCategoria()}>
            Eliminar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
