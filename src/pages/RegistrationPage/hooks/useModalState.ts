import { useCallback, useState } from 'react';

import { RegisterFormData } from './useInitialValues';

type RegisterModalState = { open: boolean; data?: RegisterFormData };

const useModalState = () => {
  const [modalState, setModalState] = useState<RegisterModalState>({
    open: false,
  });

  const handleOpen = useCallback((data: RegisterFormData) => {
    setModalState({ open: true, data });
  }, []);

  const handleClose = useCallback(() => {
    setModalState({ open: false });
  }, []);

  return [modalState, handleOpen, handleClose] as const;
};

export default useModalState;
