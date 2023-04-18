import React, { ChangeEvent, forwardRef, useCallback } from 'react';

import useFormikConnection, { TouchTrigger, WithoutInjectedProps } from 'hooks/useFormikConnection';
import CheckboxInput, { CheckboxInputProps } from 'components/forms/CheckboxInput';

export interface FormikCheckboxInputProps extends WithoutInjectedProps<CheckboxInputProps, 'onChange'> {
  name: string;
  touchedTrigger?: TouchTrigger;
}

const FormikCheckboxInput = forwardRef<HTMLInputElement, FormikCheckboxInputProps>(({ name, ...props }, ref) => {
  const { setValue, value, ...other } = useFormikConnection<boolean, HTMLInputElement>(name, props);
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.checked),
    [setValue],
  );

  return <CheckboxInput {...props} {...other} checked={value} ref={ref} label={props.label} onChange={handleChange} />;
});

export default FormikCheckboxInput;
