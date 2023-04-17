import React from 'react';
import { Story } from '@storybook/react';

import TextAreaInput, { TextAreaInputProps } from './TextAreaInput';

export default {
  title: 'components / form / TextAreaInput',
  component: TextAreaInput,
};

const Template: Story<TextAreaInputProps> = (props) => <TextAreaInput {...props} ref={undefined} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Label',
  touched: false,
  error: '',
};
