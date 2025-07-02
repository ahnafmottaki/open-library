import { NavLink } from "react-router";

const DrawerLink = ({ children, ...props }) => {
  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        `flex w-full h-full justify-center items-center border-2 border-whitey-blue  rounded-xs font-medium text-lg transition-colors ${
          isActive ? "bg-whitey-blue  text-white " : ""
        }`
      }
    >
      {children}
    </NavLink>
  );
};

export default DrawerLink;
