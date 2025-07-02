import Lottie from "lottie-react";

import { Link } from "react-router";
import { Slide } from "react-awesome-reveal";

const TwoSectionWithLottie = ({ children, mode, lottie }) => {
  let modeInfo;
  if (mode === "login") {
    modeInfo = {
      text: `Didn't have an Account?`,
      btnText: "Register",
      path: "/register",
    };
  }

  if (mode === "register") {
    modeInfo = {
      text: "Already have an Account?",
      btnText: "Login",
      path: "/login",
    };
  }

  return (
    <div className="hero  min-h-[calc(100vh-100px)] container mx-auto pb-20 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 ">
        <div className=" w-full max-w-sm grid place-items-center ">
          <div className="card-body ">
            <Slide direction="down" cascade triggerOnce>
              <Lottie animationData={lottie} />
            </Slide>
          </div>
        </div>
        <Slide direction="up" cascade triggerOnce>
          <div className=" w-full max-w-sm shrink-0 px-5 flex flex-col gap-3 justify-center">
            <h1 className="text-2xl font-bold text-center">
              {mode.replace(mode.at(0), mode.at(0).toUpperCase())} Here
            </h1>
            {children}
            <p className="text-right text-xs font-medium">
              {modeInfo.text}{" "}
              <Link to={modeInfo.path} className="font-bold text-whitey-blue">
                {modeInfo.btnText}
              </Link>
            </p>
          </div>
        </Slide>
      </div>
    </div>
  );
};

export default TwoSectionWithLottie;
