import React from 'react';
import { Form, Formik } from 'formik';

import Header from 'components/Header/Header';
import FormikTextInput from 'components/formik/FormikTextInput/FormikTextInput';
import FormikTextAreaInput from 'components/formik/FormikTextAreaInput/FormikTextAreaInput';
import FormikCheckboxInput from 'components/formik/FormikCheckboxInput/FormikCheckboxInput';

import RegistrationSuccessModal from './components/RegistrationSuccessModal/RegistrationSuccessModal';
import useSchema from './hooks/useSchema';
import useInitialValues, { RegisterFormData } from './hooks/useInitialValues';
import useOnSubmit from './hooks/useOnSubmit';
import useModalState from './hooks/useModalState';

import './RegistrationPage.scss';
export interface RegistrationPageProps {
  onRegister: (data: RegisterFormData) => Promise<boolean>;
}

const RegistrationPage = ({ onRegister }: RegistrationPageProps) => {
  const [modalState, handleOpenModal, handleCloseModal] = useModalState();

  const schema = useSchema();
  const initialValues = useInitialValues();
  const onSubmit = useOnSubmit(onRegister, handleOpenModal);

  return (
    <div className="register">
      <Header />
      <main>
        <h1>Welcome to our register page!</h1>

        <Formik<RegisterFormData> initialValues={initialValues} onSubmit={onSubmit} validationSchema={schema}>
          <Form>
            <section>
              <FormikTextInput name="name" label="Name" />
              <FormikTextInput name="email" label="Email" />
              <FormikTextAreaInput name="address" label="Address" />
            </section>
            <section className="terms">
              <FormikCheckboxInput name="terms" label="I agree to terms and conditions" />
            </section>
            <section>
              <button className="button primary">Register!</button>
            </section>
          </Form>
        </Formik>
      </main>
      <RegistrationSuccessModal open={modalState.open} data={modalState.data} onClose={handleCloseModal} />
    </div>
  );
};

export default RegistrationPage;
