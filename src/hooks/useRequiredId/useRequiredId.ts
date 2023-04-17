import { useId } from 'react';

/**
 * Wrapper on `React.useId` which either uses passed in ID or uses a generated one.
 *
 * @param id Optional ID
 */
const useRequiredId = (id?: string) => {
  const generatedId = useId();

  return id ?? generatedId;
};

export default useRequiredId;
