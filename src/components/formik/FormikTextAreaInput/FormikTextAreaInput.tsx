import React, { ChangeEvent, forwardRef, useCallback } from 'react';

import useFormikConnection, { TouchTrigger, WithoutInjectedProps } from 'hooks/useFormikConnection';
import TextAreaInput, { TextAreaInputProps } from 'components/forms/TextAreaInput';

export interface FormikTextInputProps extends WithoutInjectedProps<TextAreaInputProps, 'onChange'> {
  name: string;
  touchedTrigger?: TouchTrigger;
}

const FormikTextAreaInput = forwardRef<HTMLTextAreaElement, FormikTextInputProps>(({ name, ...props }, ref) => {
  const { setValue, ...other } = useFormikConnection<string, HTMLTextAreaElement>(name, props);
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => setValue(event.target.value),
    [setValue],
  );

  return <TextAreaInput {...props} {...other} ref={ref} label={props.label} onChange={handleChange} />;
});

export default FormikTextAreaInput;
