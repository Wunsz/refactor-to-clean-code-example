import React from 'react';
import { Story } from '@storybook/react';

import TextInput, { TextInputProps } from './TextInput';

export default {
  title: 'components / form / TextInput',
  component: TextInput,
};

const Template: Story<TextInputProps> = (props) => <TextInput {...props} ref={undefined} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Label',
  touched: false,
  error: ''
};
