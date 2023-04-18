import { useMemo } from 'react';

export interface RegisterFormData {
  name: string;
  email: string;
  address: string;
  terms: boolean;
}

const useInitialValues = () =>
  useMemo(
    (): RegisterFormData => ({
      name: '',
      email: '',
      address: '',
      terms: false,
    }),
    [],
  );

export default useInitialValues;
