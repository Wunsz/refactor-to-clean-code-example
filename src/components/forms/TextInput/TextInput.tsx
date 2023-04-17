import { DetailedHTMLProps, forwardRef, InputHTMLAttributes, ReactNode } from 'react';

import useRequiredId from 'hooks/useRequiredId';

import './TextInput.scss';

export interface TextInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
  error?: string | ReactNode;
  hint?: string | ReactNode;
  touched?: boolean;
  required?: boolean;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ id, label, error, touched = false, required = false, className = '', type = 'text', hint, ...props }, ref) => {
    const ensuredId = useRequiredId(id);
    const errorId = `${ensuredId}-error`;

    const hasError = Boolean(error && error !== '' && touched);

    return (
      <div className={`clean-code-text-input ${className}`}>
        <label htmlFor={ensuredId}>
          {label}
          {required && '*'}
        </label>
        <div>
          <input {...props} aria-invalid={hasError} aria-errormessage={errorId} type={type} id={ensuredId} ref={ref} />
          {hasError && (
            <span id={errorId} className="error-label">
              {error}
            </span>
          )}
        </div>
      </div>
    );
  },
);

export default TextInput;
