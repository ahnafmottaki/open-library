import InputField from "../../components/InputField";
import TwoSectionWithLottie from "../../components/TwoSectionWithLottie";
import libraryTwo from "../../assets/lotties/library-two.json";
import {
  hasMinLength,
  validateEmail,
  validatePassword,
} from "../../utils/inputValidation/inputValidation";
import { useAuthContext } from "../../contexts/Auth/AuthContext";
import { useNavigate } from "react-router";
import { useState } from "react";
import GoogleLogin from "../../components/GoogleLogin";
import fireToast from "../../utils/toastRelated/toastFn";
import useTitle from "../../hooks/useTitle";

const Register = () => {
  useTitle("Register | Open Library");
  const navigate = useNavigate();
  const {
    registerUser,
    updateUserProfile,
    reloadUser,
    setUser,
    getCurrentUser,
  } = useAuthContext();
  const [loggingIn, setLoggingIn] = useState(false);
  const handleRegister = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formDetails = Object.fromEntries(formData.entries());

    const { email, password, name, photo_url } = Object.fromEntries(
      Object.entries(formDetails).map(([key, value]) => [key, value.trim()])
    );
    if (!hasMinLength(name, 3))
      return fireToast("Name must be at least 3 characters long!", "warning");
    if (!hasMinLength(photo_url, 15))
      return fireToast(
        "Photo Url must be at least 15 characters long!",
        "warning"
      );
    const emailErrors = validateEmail(email);
    if (emailErrors.length > 0) return fireToast(emailErrors[0], "warning");

    const passErrors = validatePassword(password);
    if (passErrors.length > 0) return fireToast(passErrors[0], "warning");

    setLoggingIn(true);
    try {
      await registerUser(email, password);
      await updateUserProfile({ displayName: name, photoURL: photo_url });
      await reloadUser();
      event.target.reset();
      fireToast("Registration successful", "success");
      setUser(getCurrentUser);
      navigate("/");
    } catch (err) {
      if (err) {
        fireToast("Registration failed!", "error");
      }
    } finally {
      setLoggingIn(false);
    }
  };
  return (
    <TwoSectionWithLottie mode={"register"} lottie={libraryTwo}>
      <form onSubmit={handleRegister}>
        <div className="space-y-4">
          <InputField
            label="Name"
            id="name"
            placeholder="Enter your name"
            name="name"
            type="text"
            required
          />
          <InputField
            label="Photo Url"
            id="photo_url"
            placeholder="Enter your Photo Url"
            name="photo_url"
            type="url"
            required
          />
          <InputField
            label="Email"
            id="email"
            placeholder="Enter your email"
            type="email"
            name="email"
            required
          />
          <InputField
            label="Password"
            id="password"
            placeholder="Enter your password"
            type="password"
            name="password"
            required
          />
        </div>

        <button
          type="submit"
          className={`bg-primary-blue hover:shadow-custom-shadow my-custom-btn w-full mt-3 ${
            loggingIn ? "opacity-50" : ""
          }`}
          disabled={loggingIn}
        >
          Register
        </button>
      </form>
      <GoogleLogin loggingIn={loggingIn} setLoggingIn={setLoggingIn} />
    </TwoSectionWithLottie>
  );
};

export default Register;
