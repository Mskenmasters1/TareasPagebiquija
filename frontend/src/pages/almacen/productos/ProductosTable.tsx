import { ChangeEvent, useEffect, useState } from 'react';
import { useFetchDelete } from '../../../hooks/useFetchDelete';
import { IUsuario, IProducto, IProductoResponse } from '../../../interfaces/tarea.interface';
import Modal from 'react-bootstrap/Modal';
import { ProductosModal } from './ProductosModal';
import { useFetchFileUpload } from '../../../hooks/useFetchFileUpload';
import { useFetchFileDownload } from '../../../hooks/useFetchFileDownload';

interface IProductosTableProps {
  productosResponse: IProductoResponse;
  setRefreshProductos: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProductosTable = ({ productosResponse, setRefreshProductos }: IProductosTableProps) => {
  const [url, setUrl] = useState<string>('');
  const [urlUpload, setUrlUpload] = useState<string>('');
  const [show, setShow] = useState(false);
  const [showModificar, setShowModificar] = useState(false);
  const [upload, setUpload] = useState(false);
  const [productoModal, setProductoModal] = useState<IProducto>({
    titulo: '',
    usuario: '',
    descripcion: '',
    terminada: true,
    precio: 0
  });
  const [productoCambiarImagen, setProductoCambiarImagen] = useState<string>('');
  const [archivo, setArchivo] = useState<FileList | null>(null);
  const [urlDownload, setUrlDownload] = useState<string>('');
  const [productoEliminar, setProductoEliminar] = useState<string>('');
  const { total, productos } = productosResponse;
  const { loading, data: response, status, errorFetch, errorMsg } = useFetchDelete<IProducto>(url);

  const {
    loading: loadingUpload,
    data: responseUpload,
    status: statusUpload,
    errorFetch: errorFetchUpload
  } = useFetchFileUpload<IProducto>(urlUpload, archivo);

  console.log(statusUpload);

  const {
    loading: loadingDownload,
    data: responseDownload,
    status: statusDownload,
    errorFetch: errorFetchDownload
  } = useFetchFileDownload<Blob>(urlDownload);

  const handleClose = () => setShow(false);
  const handleShow = (id: string | undefined) => {
    id && setProductoEliminar(id);
    setShow(true);
  };

  const editProducto = (e: IProducto) => {
    setProductoModal(e);
    setShowModificar(true);
  };

  const deleteProducto = () => {
    setUrl('http://localhost:3000/api/productos/' + productoEliminar);
    setShow(false);
  };

  const onFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setArchivo(e.target.files!);
  };

  const downloadImage = (id: string) => {
    setUrlDownload(`http://localhost:3000/api/uploads/productos/${id}`);
  };

  const uploadImage = (id: string) => {
    setUrlUpload(`http://localhost:3000/api/uploads/productos/${id}`);
  };

  useEffect(() => {
    if (status === 200) {
      setRefreshProductos(true);
    }
  }, [response]);

  useEffect(() => {
    if (!loadingDownload) {
      setUrlDownload('');
    }
  }, [loadingDownload]);

  useEffect(() => {
    if (!loadingUpload) {
      setUrlUpload('');
    }

    if (statusUpload === 200 && !loadingUpload) {
      alert('Imagen subida con éxito');
    }
  }, [loadingUpload]);

  return (
    <>
      {productos?.length > 0 && (
        <>
          <h2>Total productos: {total}</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th colSpan={4}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((x) => (
                <tr key={x._id}>
                  <td>{x.titulo}</td>
                  <td>{(x.usuario as IUsuario).nombre}</td>
                  <td>{x.precio}</td>
                  <td>
                    <button className="btn btn-warning" onClick={() => editProducto(x)}>
                      Modificar
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-danger" onClick={() => handleShow(x._id)}>
                      Eliminar
                    </button>
                  </td>
                  <td>
                    <div>
                      <label htmlFor="imagen" className="form-label">
                        Elegir imagen
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        accept="image/*"
                        id="imagen"
                        onChange={(e) => onFileInputChange(e)}
                      />
                    </div>
                    <button className="btn btn-primary" onClick={(e) => uploadImage(x._id!)}>
                      Subir imagen
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-info" onClick={() => downloadImage(x._id!)}>
                      Descargar imagen
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

      <ProductosModal
        producto={productoModal}
        show={showModificar}
        setShow={setShowModificar}
        setRefreshProductos={setRefreshProductos}
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Está seguro?</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>
            Cancelar
          </button>
          <button className="btn btn-danger" onClick={() => deleteProducto()}>
            Eliminar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
