import { useState, useEffect } from 'react';
import { ILogin, ILoginResponse } from '../interfaces/login.interface';
import { useFetchPost } from './useFetchPost';

export const useLogin = (email: string, password: string, shouldLogin: boolean) => {
  const [body, setBody] = useState<string>('');
  const {
    loading,
    data: loginResponse,
    status,
    errorFetch,
    errorMsg
  } = useFetchPost<ILoginResponse>('http://localhost:3000/api/auth/login', body, shouldLogin);

  useEffect(() => {
    if (shouldLogin) {
      setBody(JSON.stringify({ email, password }));
    }
  }, [shouldLogin, email, password]);

  return { loading, loginResponse, status, errorFetch, errorMsg };
};
