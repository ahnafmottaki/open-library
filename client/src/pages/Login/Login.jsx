import TwoSectionWithLottie from "../../components/TwoSectionWithLottie";
import InputField from "../../components/InputField";
import { useAuthContext } from "../../contexts/Auth/AuthContext";
import libraryOne from "../../assets/lotties/library-one.json";
import {
  validateEmail,
  validatePassword,
} from "../../utils/inputValidation/inputValidation";
import GoogleLogin from "../../components/GoogleLogin";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import fireToast from "../../utils/toastRelated/toastFn";
import useTitle from "../../hooks/useTitle";

const Login = () => {
  useTitle("Login | Open Library");
  const { signInUser } = useAuthContext();
  const [loggingIn, setLoggingIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogIn = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userCredentials = Object.fromEntries(formData.entries());

    const { email, password } = Object.fromEntries(
      Object.entries(userCredentials).map(([key, value]) => [key, value.trim()])
    );

    const emailErrors = validateEmail(email);
    if (emailErrors.length > 0) return fireToast(emailErrors[0], "warning");

    const passErrors = validatePassword(password);
    if (passErrors.length > 0) return fireToast(passErrors[0], "warning");

    setLoggingIn(true);
    try {
      await signInUser(email, password);
      event.target.reset();
      navigate(location?.state?.from || "/");
      fireToast("Sign in successful", "success");
    } catch (error) {
      if (error.message.includes("auth/invalid-credential")) {
        return fireToast("Invalid username or password", "error");
      }
      fireToast("Sign in Failed, try again", "error");
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <TwoSectionWithLottie mode={"login"} lottie={libraryOne}>
      <form action="" onSubmit={handleLogIn}>
        <div className="space-y-4">
          <InputField
            label="Email"
            id="email"
            placeholder="Enter your email"
            type="text"
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
          disabled={loggingIn}
          type="submit"
          className={`bg-primary-blue hover:shadow-custom-shadow my-custom-btn w-full mt-3 ${
            loggingIn ? " opacity-40 " : ""
          }`}
        >
          Login
        </button>
      </form>
      <GoogleLogin loggingIn={loggingIn} setLoggingIn={setLoggingIn} />
    </TwoSectionWithLottie>
  );
};

export default Login;
