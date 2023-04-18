import { useMemo } from 'react';
import * as yup from 'yup';

const useSchema = () =>
  useMemo(
    () =>
      yup.object().shape({
        email: yup.string().required('This field is required'),
        address: yup.string().required('This field is required'),
        terms: yup.boolean().isTrue('This field is required').required('This field is required'),
      }),
    [],
  );

export default useSchema;
