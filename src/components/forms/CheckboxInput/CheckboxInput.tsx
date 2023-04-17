import React, { DetailedHTMLProps, forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import useRequiredId from 'hooks/useRequiredId';

import './CheckboxInput.scss';

export interface CheckboxInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string | ReactNode;
  error?: string | ReactNode;
  touched?: boolean;
  fullWidth?: boolean;
}

const CheckboxInput = forwardRef<HTMLInputElement, CheckboxInputProps>(
  ({ id, error, touched, label, ...props }, ref) => {
    const ensuredId = useRequiredId(id);
    const errorId = `${ensuredId}-error`;

    const hasError = Boolean(error && error !== '' && touched);

    return (
      <div className="clean-code-checkbox-input">
        <div>
          <input {...props} ref={ref} id={ensuredId} type="checkbox" />
          <label htmlFor={ensuredId}>{label}</label>
        </div>
        {hasError && (
          <span id={errorId} className="error-label">
            {error}
          </span>
        )}
      </div>
    );
  },
);

export default CheckboxInput;
