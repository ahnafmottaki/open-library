import { toast } from "react-toastify";
import DropdownMenu from "../../components/DropdownMenu";
import { useAuthContext } from "../../contexts/Auth/AuthContext";

const ProfileImage = () => {
  const { signOutUser, user } = useAuthContext();
  const handleLogOut = () => {
    signOutUser()
      .then(() => {
        toast("Sign Out Successful", { type: "success" });
      })
      .catch((err) => {
        if (err) {
          toast("Sign Out Failed");
        }
      });
  };
  return (
    <>
      <DropdownMenu
        triggerElement={
          <>
            <div
              className="overflow-hidden md:w-11 w-10 aspect-square  rounded-full cursor-pointer"
              title={user.displayName}
            >
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-full h-full"
              />
            </div>
          </>
        }
      >
        <button onClick={handleLogOut} type="button" className="primary-btn">
          Logout
        </button>
      </DropdownMenu>
    </>
  );
};

export default ProfileImage;
