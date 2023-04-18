import React, { ChangeEvent, forwardRef, useCallback } from 'react';

import useFormikConnection, { TouchTrigger, WithoutInjectedProps } from 'hooks/useFormikConnection';
import TextInput, { TextInputProps } from 'components/forms/TextInput';

export interface FormikTextInputProps extends WithoutInjectedProps<TextInputProps, 'onChange'> {
  name: string;
  touchedTrigger?: TouchTrigger;
}

const FormikTextInput = forwardRef<HTMLInputElement, FormikTextInputProps>(({ name, ...props }, ref) => {
  const { setValue, ...other } = useFormikConnection<string, HTMLInputElement>(name, props);
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value), [setValue]);

  return <TextInput {...props} {...other} ref={ref} label={props.label} onChange={handleChange} />;
});

export default FormikTextInput;
