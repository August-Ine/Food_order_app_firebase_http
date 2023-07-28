import { useState } from "react";

const useModal = () => {
  const [modalIsShown, setModalIsShown] = useState(false);

  const showModalHandler = () => {
    setModalIsShown(true);
  };

  const hideModalHandler = () => {
    setModalIsShown(false);
  };

  return {
    modalIsShown,
    showModalHandler,
    hideModalHandler
  };
};

export default useModal;
