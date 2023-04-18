import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from 'react';

import './Button.scss';

export type ButtonVariant = 'primary' | 'secondary';

export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

const Button: FC<ButtonProps> = ({ children, className, variant = 'primary', type = 'button', ...props }) => (
  <button {...props} type={type} className={`clean-code-button variant-${variant} ${className}`}>
    {children}
  </button>
);

export default Button;
