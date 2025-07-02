import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const CustomModal = forwardRef(({ children }, ref) => {
  const modalRef = useRef(null);
  useImperativeHandle(ref, () => {
    return {
      open() {
        modalRef.current.showModal();
      },
      closeModal() {
        modalRef.current.close();
      },
    };
  });
  return createPortal(
    <dialog
      ref={modalRef}
      className="modal modal-bottom sm:modal-middle flex flex-col justify-center"
    >
      {children}
    </dialog>,
    document.getElementById("modal-container")
  );
});

export default CustomModal;
