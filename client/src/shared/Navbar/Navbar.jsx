import logo from "../../assets/openlibrary-logo-tighter.svg";
import { HiOutlineMenu } from "react-icons/hi";
import LoginAndRegister from "./LoginAndRegister";
import ProfileImage from "./ProfileImage";
import DesktopLinks from "./DesktopLinks";
import DynamicDrawer from "../../components/DynamicDrawer";
import DrawerLink from "./DrawerLink";
import { useAuthContext } from "../../contexts/Auth/AuthContext";
export default function Navbar() {
  const { user } = useAuthContext();

  const links = <DesktopLinks className="hidden items-center gap-3 md:flex" />;

  const loginOrProfile = user ? <ProfileImage /> : <LoginAndRegister />;

  const drawerContent = (
    <>
      <div className="grid grid-cols-2 grid-rows-2 w-full  h-full p-2 gap-2">
        <DrawerLink to="/">Home</DrawerLink>
        <>
          <DrawerLink to="/addbook">Add Book</DrawerLink>
          <DrawerLink to="/allbooks">All Books</DrawerLink>
          <DrawerLink to={`/borrowedbooks?email=${user?.email}`}>
            Borrowed Books
          </DrawerLink>
        </>
      </div>
    </>
  );

  return (
    <header className="container mx-auto py-8 flex items-center justify-between px-2 md:px-0 ">
      <div className="flex items-center gap-1">
        <DynamicDrawer
          triggerBtnCls="md:hidden"
          triggerElement={<HiOutlineMenu className="text-3xl " />}
        >
          {drawerContent}
        </DynamicDrawer>
        <img src={logo} alt="" className="h-8 sm:h-10 " />
      </div>
      {links}
      <div className="flex items-center gap-2">{loginOrProfile}</div>
    </header>
  );
}
