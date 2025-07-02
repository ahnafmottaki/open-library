import { PacmanLoader } from "react-spinners";
const PacManSpinner = () => {
  return (
    <div className="min-h-[calc(100vh-100px)] container mx-auto grid place-items-center">
      <PacmanLoader size={30} />
    </div>
  );
};

export default PacManSpinner;
