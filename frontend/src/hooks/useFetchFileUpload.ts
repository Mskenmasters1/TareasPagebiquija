import { useEffect, useState } from 'react';
import { IFetch } from '../interfaces/fetch.interface';
import { ILocalStorageInfo } from '../interfaces/localStorage.interface';

export const useFetchFileUpload = <T>(url: string, archivo: FileList | null) => {
  const [state, setState] = useState<IFetch>({
    data: null,
    loading: false,
    status: 0,
    errorFetch: false,
    errorMsg: ''
  });

  const postData = async (): Promise<void> => {
    if (url != '' && archivo) {
      setState({
        ...state,
        loading: true
      });

      try {
        let token = '';
        // Las peticiones post necesitan un body con los datos que van al servidor y una cabecera para especificar que los datos van en JSON
        const infoStorage: ILocalStorageInfo = JSON.parse(localStorage.getItem('usuarioInfo')!);
        token = infoStorage?.token;
        const headers: HeadersInit = {
          //      'Content-Type': 'application/json',
          'x-token': token
        };

        const formData = new FormData();
        formData.append('archivo', archivo.item(0)!);

        const data = await fetch(url, {
          method: 'PUT',
          headers: headers,
          body: formData
        });
        // Si viene un error del servidor no va al catch. Al catch va cuando no se puede acceder al servidor
        if (data.status !== 200 && data.status !== 201 && data.status !== 204) {
          const jsonErrors = await data.json();
          let msgError = '';
          // jsonErrors.errors es un array de errores que vendrá cuando los validadores de Node devuelvan un error (los check)
          if (jsonErrors.errors) {
            jsonErrors.errors.forEach((x: any) => {
              // Por cada item del array, el validador devuelve una propiedad msg
              msgError += x.msg + '/';
            });
          } else {
            // El objeto con la propiedad msg es el que devolvemos nosotros de forma personalizada
            msgError = jsonErrors.msg;
          }

          setState({
            data: null,
            loading: false,
            status: data.status,
            errorFetch: true,
            errorMsg: msgError
          });
        } else {
          // Llegados aquí, los datos vienen bien, es decir, data.json() serán los datos que devuelve el servidor tras todo el proceso realizado de forma exitosa
          const json: T = await data.json();
          setState({
            data: json,
            loading: false,
            status: data.status,
            errorFetch: false,
            errorMsg: ''
          });
        }
      } catch (e) {
        setState({
          data: null,
          loading: false,
          status: 0,
          errorFetch: true,
          errorMsg: 'No se ha podido establecer la conexión con el recurso solicitado'
        });
      }
      // Al acabar la petición devolvemos un nuevo estado. Este devuelve los datos, el loading a false y el número de estado de la petición
    }
  };

  // Cuando cambia el body realizamos una nueva petición
  useEffect(() => {
    postData();
  }, [url]);

  // El hook retorna los tres valores. data será del tipo genérico (as T), que hemos utilizado para esta petición
  return {
    data: state.data as T,
    loading: state.loading,
    status: state.status,
    errorFetch: state.errorFetch,
    errorMsg: state.errorMsg
  };
};
