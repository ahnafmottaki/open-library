import { NavLink } from "react-router";

const PrimaryNavLink = ({ children, ...props }) => {
  return (
    <li>
      <NavLink
        {...props}
        className={({ isActive }) =>
          `font-medium whitespace-nowrap hover:text-whitey-blue relative after:absolute after:top-full after:left-0 after:content-[''] after:h-1 after:w-0 hover:after:w-full after:transition-all duration-1000 after:bg-whitey-blue ${
            isActive ? " after:w-full text-whitey-blue" : ""
          }`
        }
      >
        {children}
      </NavLink>
    </li>
  );
};

export default PrimaryNavLink;
