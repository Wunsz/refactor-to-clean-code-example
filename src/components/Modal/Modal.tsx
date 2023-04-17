import React, { FC } from 'react';
import ReactModal, { Props as ReactModalProps } from 'react-modal';

import timesIcon from 'assets/img/timesIcon.svg';

import './Modal.scss';

export interface ModalProps extends ReactModalProps {}

const Modal: FC<ModalProps> = ({ children, onRequestClose, overlayClassName = '', className = '', ...props }) => (
  <ReactModal
    {...props}
    onRequestClose={onRequestClose}
    overlayClassName={`modal-overlay ${overlayClassName}`}
    className={`modal ${className}`}
    appElement={document.getElementById('root') as HTMLElement}
  >
    {children}
    {onRequestClose && (
      <button type="button" className="modal-close-button" onClick={onRequestClose}>
        <img src={timesIcon} alt="Close" />
      </button>
    )}
  </ReactModal>
);

export default Modal;
