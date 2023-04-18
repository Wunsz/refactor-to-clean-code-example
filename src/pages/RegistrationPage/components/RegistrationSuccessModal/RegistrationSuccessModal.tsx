import React from 'react';

import Modal from 'components/Modal/Modal';
import Button from 'components/Button/Button';

import { RegisterFormData } from '../../hooks/useInitialValues';

import './RegistrationSuccessModal.scss';

interface RegistrationSuccessModalProps {
  open: boolean;
  data: RegisterFormData | undefined;
  onClose: () => void;
}

const RegistrationSuccessModal = ({ open, data, onClose }: RegistrationSuccessModalProps) => {
  if (!data) {
    return null;
  }

  return (
    <Modal isOpen={open} className="registration-success-modal">
      <div className="title">
        <h2>Registration successful!</h2>
      </div>
      <div className="details">
        <p>Here are your details</p>
        <dl>
          <dt>Name</dt>
          <dd>{data.name}</dd>

          <dt>Email</dt>
          <dd>{data.email}</dd>

          <dt>Address</dt>
          <dd>{data.address}</dd>
        </dl>
      </div>
      <div className="summary">
        <span>Your registration request will be processed within 24 hours!</span>
        <Button variant="secondary" onClick={onClose}>
          Ok
        </Button>
      </div>
    </Modal>
  );
};

export default RegistrationSuccessModal;
