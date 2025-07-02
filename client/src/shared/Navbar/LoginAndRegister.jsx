import PrimaryNavLink from "../../components/PrimaryNavLink";

const LoginAndRegister = () => {
  return (
    <ul className="flex">
      <PrimaryNavLink to="/login">Login</PrimaryNavLink>
      <span> &nbsp;/&nbsp;</span>
      <PrimaryNavLink to="/register">Register</PrimaryNavLink>
    </ul>
  );
};

export default LoginAndRegister;
