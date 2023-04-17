import React, { useCallback, useMemo, useState } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';

import Modal from 'components/Modal/Modal';
import TextAreaInput from 'components/forms/TextAreaInput';
import TextInput from 'components/forms/TextInput';
import CheckboxInput from 'components/forms/CheckboxInput';

import './RegistrationPage.scss';

export interface RegistrationPageProps {
  onRegister: (data: RegisterFormData) => Promise<boolean>;
}

export interface RegisterFormData {
  name: string;
  email: string;
  address: string;
  terms: boolean;
}

const RegistrationPage = ({ onRegister }: RegistrationPageProps) => {
  const [modalState, setModalState] = useState<{ open: true; data: RegisterFormData } | { open: false }>({
    open: false,
  });

  const schema = useMemo(
    () =>
      yup.object().shape({
        email: yup.string().required('This field is required'),
        address: yup.string().required('This field is required'),
        terms: yup.boolean().isTrue('This field is required').required('This field is required'),
      }),
    [],
  );

  const initialValues = useMemo(
    (): RegisterFormData => ({
      name: '',
      email: '',
      address: '',
      terms: false,
    }),
    [],
  );

  const onSubmit = useCallback(async (values: RegisterFormData, helpers: FormikHelpers<RegisterFormData>) => {
    try {
      const isSuccess = await onRegister(values);

      if (!isSuccess) {
        helpers.setFieldError('terms', 'API Error - try again!');
        return;
      }

      setModalState({
        open: true,
        data: values,
      });
    } catch (e) {
      if (e instanceof Error) {
        helpers.setFieldError('terms', e.message);
      }
    }
  }, []);

  return (
    <div className="register">
      <header>
        <div>Clean code register!</div>
        <nav>
          <a href="/">Home</a>
          <a href="/login">Login</a>
          <a href="/other">Other</a>
        </nav>
      </header>
      <main>
        <h1>Welcome to our register page!</h1>

        <Formik<RegisterFormData> initialValues={initialValues} onSubmit={onSubmit} validationSchema={schema}>
          {({ submitForm, touched, errors, values, setFieldValue, setFieldTouched }) => (
            <Form>
              <section>
                <TextInput
                  touched={touched.name}
                  error={errors.name}
                  value={values.name}
                  onChange={(event) => setFieldValue('name', event.target.value)}
                  onBlur={() => setFieldTouched('name')}
                  name="name"
                  label="Name"
                />
                <TextInput
                  touched={touched.email}
                  error={errors.email}
                  value={values.email}
                  onChange={(event) => setFieldValue('email', event.target.value)}
                  onBlur={() => setFieldTouched('email')}
                  name="email"
                  label="Email"
                />
                <TextAreaInput
                  touched={touched.address}
                  error={errors.address}
                  value={values.address}
                  onChange={(event) => setFieldValue('address', event.target.value)}
                  onBlur={() => setFieldTouched('address')}
                  name="address"
                  label="Address"
                />
              </section>
              <section className="terms">
                <CheckboxInput
                  touched={touched.terms}
                  error={errors.terms}
                  checked={values.terms}
                  onChange={(event) => setFieldValue('terms', event.target.checked)}
                  onBlur={() => setFieldTouched('terms')}
                  name="terms"
                  label="I agree to terms and conditions"
                />
              </section>
              <section>
                <button className="button primary">Register!</button>
              </section>
            </Form>
          )}
        </Formik>
      </main>
      {modalState.open && (
        <Modal isOpen={modalState.open} className="registration-success-modal">
          <div className="title">
            <h2>Registration successful!</h2>
          </div>
          <div className="details">
            <p>Here are your details</p>
            <dl>
              <dt>Name</dt>
              <dd>{modalState.data.name}</dd>

              <dt>Email</dt>
              <dd>{modalState.data.email}</dd>

              <dt>Address</dt>
              <dd>{modalState.data.address}</dd>
            </dl>
          </div>
          <div className="summary">
            <span>Your registration request will be processed within 24 hours!</span>
            <button className="button secondary-filled" onClick={() => setModalState({ open: false })}>
              Ok
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default RegistrationPage;
