import React, { ChangeEvent, FC, FocusEvent, RefObject, useCallback } from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';

import useFormikConnection, { TouchTrigger } from './useFormikConnection';
import { Formik } from 'formik';
import { FormikProps } from 'formik/dist/types';

interface TestFormProps {
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  passHandlers?: boolean;
  touchedTrigger?: TouchTrigger;
}

describe('components / Form / formik / useFormikConnection', () => {
  const getTestComponent = () => {
    const TestForm: FC<TestFormProps> = ({ passHandlers, ...focusHandlers }) => {
      const { setValue, touched, error, ...props } = useFormikConnection<string, HTMLInputElement>(
        'field',
        passHandlers ? focusHandlers : undefined,
      );

      const handleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value),
        [setValue],
      );

      return (
        <div>
          <input {...props} aria-label="field" onChange={handleChange} />
          {touched && <div data-testid="touched" />}
          {error && <div data-testid="error" data-errorvalue={error} />}
        </div>
      );
    };

    return {
      TestForm,
    };
  };

  it('should correctly change formik value on change text', async () => {
    const { TestForm } = getTestComponent();
    const ref: RefObject<FormikProps<{ field: string }>> = { current: null };

    const { getByLabelText } = render(
      <Formik initialValues={{ field: 'value' }} onSubmit={() => {}} innerRef={ref}>
        <TestForm />
      </Formik>,
    );

    expect(ref.current?.values).toEqual({ field: 'value' });

    const field = getByLabelText('field') as HTMLInputElement;

    fireEvent.change(field, { target: { value: 'otherValue' } });

    await waitFor(() => expect(ref.current?.values.field).toEqual('otherValue'));
  });

  it('should correctly change touched status on blur', async () => {
    const { TestForm } = getTestComponent();
    const ref: RefObject<FormikProps<{ field: string }>> = { current: null };

    const { queryByTestId, getByLabelText } = render(
      <Formik initialValues={{ field: 'value' }} onSubmit={() => {}} innerRef={ref}>
        <TestForm />
      </Formik>,
    );

    expect(ref.current?.touched).toEqual({});
    expect(queryByTestId('touched')).toBeNull();

    fireEvent.blur(getByLabelText('field'));

    await waitFor(() => expect(ref.current?.touched).toEqual({ field: true }));
    expect(queryByTestId('touched')).not.toBeNull();
  });

  it('should correctly change touched status on focus', async () => {
    const { TestForm } = getTestComponent();
    const ref: RefObject<FormikProps<{ field: string }>> = { current: null };

    const { getByLabelText, queryByTestId } = render(
      <Formik initialValues={{ field: 'value' }} onSubmit={() => {}} innerRef={ref}>
        <TestForm passHandlers touchedTrigger="onFocus" />
      </Formik>,
    );

    expect(ref.current?.touched).toEqual({});
    expect(queryByTestId('touched')).toBeNull();

    fireEvent.focus(getByLabelText('field'));

    await waitFor(() => expect(ref.current?.touched).toEqual({ field: true }));
    expect(queryByTestId('touched')).not.toBeNull();
  });

  it('should correctly pass custom focus handlers', async () => {
    const { TestForm } = getTestComponent();
    const ref: RefObject<FormikProps<{ field: string }>> = { current: null };

    const handleFocus = vi.fn();
    const handleBlur = vi.fn();

    const { getByLabelText, queryByTestId } = render(
      <Formik initialValues={{ field: 'value' }} onSubmit={() => {}} innerRef={ref}>
        <TestForm onFocus={handleFocus} onBlur={handleBlur} passHandlers />
      </Formik>,
    );

    expect(ref.current?.touched).toEqual({});
    expect(queryByTestId('touched')).toBeNull();

    fireEvent.focus(getByLabelText('field'));

    expect(handleFocus).toHaveBeenCalled();

    fireEvent.blur(getByLabelText('field'));

    await waitFor(() => expect(ref.current?.touched).toEqual({ field: true }));
    expect(queryByTestId('touched')).not.toBeNull();
  });

  it('should correctly pass errors', async () => {
    const { TestForm } = getTestComponent();
    const ref: RefObject<FormikProps<{ field: string }>> = { current: null };

    const { queryByTestId, getByTestId } = render(
      <Formik initialValues={{ field: 'value' }} onSubmit={() => {}} innerRef={ref}>
        <TestForm />
      </Formik>,
    );

    expect(ref.current?.touched).toEqual({});
    expect(queryByTestId('error')).toBeNull();

    act(() => ref.current?.setFieldError('field', 'some error'));

    await waitFor(() => expect(ref.current?.errors).toEqual({ field: 'some error' }));
    expect(queryByTestId('error')).not.toBeNull();
    expect(getByTestId('error').dataset.errorvalue).toEqual('some error');
  });
});
