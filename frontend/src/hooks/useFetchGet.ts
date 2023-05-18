import { useEffect, useState } from 'react';
import { IFetch } from '../interfaces/fetch.interface';
import { ILocalStorageInfo } from '../interfaces/localStorage.interface';

export const useFetchGet = <T>(url: string, refresh: boolean) => {
  const [state, setState] = useState<IFetch>({
    data: null,
    loading: false,
    status: 0,
    errorFetch: false,
    errorMsg: ''
  });

  const getData = async (): Promise<void> => {
    if (url !== '' && refresh) {
      setState({
        ...state,
        loading: true
      });
      let token = '';
      const infoStorage: ILocalStorageInfo = JSON.parse(localStorage.getItem('usuarioInfo')!);
      token = infoStorage?.token;
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'x-token': token
      };
      try {
        const data = await fetch(url, {
          headers: headers
        });
        if (data.status !== 200) {
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
          errorMsg: ''
        });
      }
      refresh = false;
    }
  };

  useEffect(() => {
    getData();
  }, [refresh]);

  return {
    data: state.data as T,
    loading: state.loading,
    status: state.status,
    errorFetch: state.errorFetch
  };
};
