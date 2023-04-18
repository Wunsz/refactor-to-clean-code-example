import React, { useState } from 'react';
import { Form, Formik } from 'formik';

import Modal from 'components/Modal/Modal';
import TextAreaInput from 'components/forms/TextAreaInput';
import TextInput from 'components/forms/TextInput';
import CheckboxInput from 'components/forms/CheckboxInput';
import Header from 'components/Header/Header';

import useSchema from './hooks/useSchema';
import useInitialValues, { RegisterFormData } from './hooks/useInitialValues';
import useOnSubmit from './hooks/useOnSubmit';

import './RegistrationPage.scss';

export interface RegistrationPageProps {
  onRegister: (data: RegisterFormData) => Promise<boolean>;
}

const RegistrationPage = ({ onRegister }: RegistrationPageProps) => {
  const [modalState, setModalState] = useState<{ open: true; data: RegisterFormData } | { open: false }>({
    open: false,
  });

  const schema = useSchema();
  const initialValues = useInitialValues();
  const onSubmit = useOnSubmit(onRegister, setModalState);

  return (
    <div className="register">
      <Header />
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
