import { useFormikContext } from 'formik';
import { useCallback, FocusEvent } from 'react';

export type TouchTrigger = 'onBlur' | 'onFocus';

interface UseFormikConnectionConfig<FE extends Element> {
  touchedTrigger?: 'onBlur' | 'onFocus';
  onFocus?: (event: FocusEvent<FE>) => void;
  onBlur?: (event: FocusEvent<FE>) => void;
}

interface FormikConnection<T, FE extends Element> {
  value: T;
  setValue: (value: T) => void;
  touched: boolean;
  error: string | undefined;
  onFocus: (event: FocusEvent<FE>) => void;
  onBlur: (event: FocusEvent<FE>) => void;
}

export type WithoutInjectedProps<T, Additional extends number | string | symbol> = Omit<
  T,
  'value' | 'touched' | 'error' | Additional
>;

// eslint-disable-next-line @typescript-eslint/naming-convention
const DEFAULT_CONFIG = {};

/**
 * Helper wrapper for connecting Formik state to actual form element via Context API.
 *
 * @param name Form field name
 * @param onFocus Optional focus handler
 * @param onBlur Optional blur handler
 * @param touchedTrigger Optional touched trigger, one of 'onBlur' or 'onFocus' (default: 'onBlur')
 */
const useFormikConnection = <T, ElementType extends Element>(
  name: string,
  { onFocus, onBlur, touchedTrigger = 'onBlur' }: UseFormikConnectionConfig<ElementType> = DEFAULT_CONFIG,
): FormikConnection<T, ElementType> => {
  const { getFieldMeta, getFieldHelpers } = useFormikContext();

  const { setTouched, setValue } = getFieldHelpers(name);
  const { value, touched, error } = getFieldMeta<T>(name);

  // Handles touched state and optionally calls the original onFocus handler
  const handleFocus = useCallback(
    (event: FocusEvent<ElementType>) => {
      if (touchedTrigger === 'onFocus') {
        setTouched(true);
      }

      onFocus?.(event);
    },
    [touchedTrigger, setTouched, onFocus],
  );

  // Handles touched state and optionally calls the original onBlur handler
  const handleBlur = useCallback(
    (event: FocusEvent<ElementType>) => {
      if (touchedTrigger === 'onBlur') {
        setTouched(true);
      }

      onBlur?.(event);
    },
    [touchedTrigger, setTouched, onBlur],
  );

  return {
    value,
    setValue,
    touched,
    error,
    onFocus: handleFocus,
    onBlur: handleBlur,
  };
};

export default useFormikConnection;
