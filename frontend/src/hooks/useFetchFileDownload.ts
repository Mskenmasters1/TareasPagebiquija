import { useEffect, useState } from 'react';
import { IFetch } from '../interfaces/fetch.interface';
import { ILocalStorageInfo } from '../interfaces/localStorage.interface';

export const useFetchFileDownload = <T>(url: string) => {
  const [state, setState] = useState<IFetch>({
    data: null,
    loading: false,
    status: 0,
    errorFetch: false,
    errorMsg: ''
  });

  const getData = async (): Promise<void> => {
    if (url !== '') {
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
        const blob = await data.blob();
        const file = window.URL.createObjectURL(blob);
        // Para ver la imagen en una pestaña aparte
        // window.location.assign(file);
        const link = document.createElement('a');
        link.href = file;
        link.download = 'archivo.png';
        document.body.appendChild(link); // we need to append the element to the dom -> otherwise it will not work in firefox
        link.click();
        link.remove();
        setState({
          data: null,
          loading: false,
          status: data.status,
          errorFetch: false,
          errorMsg: ''
        });
      } catch (e) {
        setState({
          data: null,
          loading: false,
          status: 0,
          errorFetch: true,
          errorMsg: ''
        });
      }
    }
  };

  useEffect(() => {
    getData();
  }, [url]);

  return {
    data: state.data as T,
    loading: state.loading,
    status: state.status,
    errorFetch: state.errorFetch
  };
};
