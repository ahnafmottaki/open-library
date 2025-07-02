import { createPortal } from "react-dom";
import { ToastContainer } from "react-toastify";

const ToastContainerModified = () => {
  return createPortal(
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      pauseOnHover
      theme="light"
      style={{
        zIndex: 99999,
      }}
    />,
    document.getElementById("toast-container-sixty-nine")
  );
};

export default ToastContainerModified;
