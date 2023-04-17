import { DetailedHTMLProps, forwardRef, InputHTMLAttributes, ReactNode } from 'react';

import useRequiredId from 'hooks/useRequiredId';

import './TextAreaInput.scss';

type Variant = 'standard' | 'filled';

export interface TextAreaInputProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  label?: string;
  error?: string | ReactNode;
  hint?: string | ReactNode;
  touched?: boolean;
  rows?: number;
  required?: boolean;
}

const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaInputProps>(
  ({ id, label, error, touched = false, required = false, className = '', hint, ...props }, ref) => {
    const ensuredId = useRequiredId(id);
    const errorId = `${ensuredId}-error`;

    const hasError = Boolean(error && error !== '' && touched);

    return (
      <div className={`clean-code-textarea-input ${className}`}>
        <label htmlFor={ensuredId}>
          {label}
          {required && '*'}
        </label>
        <div>
          <textarea {...props} aria-invalid={hasError} aria-errormessage={errorId} id={ensuredId} ref={ref} />
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

export default TextAreaInput;
