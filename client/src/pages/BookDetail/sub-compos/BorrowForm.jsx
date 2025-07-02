import { useRef, useState } from "react";
import InputField from "../../../components/InputField.jsx";
import { useAuthContext } from "../../../contexts/Auth/AuthContext.jsx";
import fireToast from "../../../utils/toastRelated/toastFn.js";
import useAxiosSecure from "../../../hooks/interceptorsHooks/useAxios.js";
import { useNavigate } from "react-router";

const BorrowForm = ({ book }) => {
  const [isBorrowing, setIsBorrowing] = useState(false);
  const navigate = useNavigate();
  const { axiosApi: borrowApi } = useAxiosSecure("borrow/" + book._id, "post");
  const { user } = useAuthContext();
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const dateRef = useRef(null);
  const handleBorrowBook = async () => {
    const return_date = dateRef.current.value;
    const email = emailRef.current.value;
    const name = nameRef.current.value;
    if (return_date === "" || !return_date)
      return fireToast("Return date in Invalid", "warning");
    if (email !== user.email)
      return fireToast("Invalid Email Address", "warning");
    if (name !== user.displayName) return fireToast("Invalid Name", "warning");
    const borrowersInformation = {
      name,
      email,
      return_date,
    };
    setIsBorrowing(true);
    try {
      const res = await borrowApi(
        {
          params: {
            email: user.email,
          },
        },
        borrowersInformation
      );
      if (res.data?.success) {
        fireToast(res.data.message, "success");
        navigate("/borrowedbooks?email=" + user.email);
      } else {
        fireToast(res.data.message, "error");
      }
    } catch (err) {
      if (err?.response.status === 401 || err?.response.status === 403) return;
      fireToast("Failed to Borrow Book", "error");
    } finally {
      setIsBorrowing(false);
    }
  };

  return (
    <div className="modal-box bg-gray-800">
      <h3 className="font-bold text-lg text-white">{book.name}</h3>
      <div className="my-5 flex flex-col gap-3">
        <InputField
          id={"return-date"}
          label={"Return Date"}
          name="return_date"
          type="date"
          labelClasses="text-gray-400"
          required
          ref={dateRef}
        />
        <InputField
          id={"name"}
          label={"Full Name"}
          name="name"
          type="text"
          defaultValue={user.displayName}
          ref={nameRef}
          readOnly
        />
        <InputField
          id={"email"}
          label={"Email"}
          name="email"
          type="text"
          defaultValue={user.email}
          readOnly
          ref={emailRef}
        />
      </div>
      <div className="modal-action">
        <form method="dialog" className="flex items-center gap-1">
          {/* if there is a button in form, it will close the modal */}
          <button
            type="button"
            disabled={isBorrowing}
            onClick={handleBorrowBook}
            className="my-custom-btn bg-primary-blue shadow-custom-shadow"
          >
            Borrow
          </button>

          <button
            disabled={isBorrowing}
            className="my-custom-btn shadow-purple-800 bg-purple-700"
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default BorrowForm;
