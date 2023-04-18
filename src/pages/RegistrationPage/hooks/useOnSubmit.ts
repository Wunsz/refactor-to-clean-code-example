import { useCallback } from 'react';
import { FormikHelpers } from 'formik';

import { RegisterFormData } from './useInitialValues';
const useOnSubmit = (
  onRegister: (values: RegisterFormData) => Promise<boolean>,
  openModal: (state: { open: boolean; data: RegisterFormData }) => void,
) =>
  useCallback(
    async (values: RegisterFormData, helpers: FormikHelpers<RegisterFormData>) => {
      try {
        const isSuccess = await onRegister(values);

        if (!isSuccess) {
          helpers.setFieldError('terms', 'API Error - try again!');
          return;
        }

        openModal({ open: true, data: values });
      } catch (e) {
        if (e instanceof Error) {
          helpers.setFieldError('terms', e.message);
        }
      }
    },
    [onRegister, openModal],
  );

export default useOnSubmit;
