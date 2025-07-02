import { toast } from "react-toastify";

const fireToast = (message, type) => {
  toast(message, { type });
};

export default fireToast;
