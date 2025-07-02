import PrimaryNavLink from "../../components/PrimaryNavLink";
import { useAuthContext } from "../../contexts/Auth/AuthContext";

const DesktopLinks = (props) => {
  const { user } = useAuthContext();
  return (
    <ul {...props}>
      <PrimaryNavLink to="/">Home</PrimaryNavLink>
      <>
        <PrimaryNavLink to="/allbooks">All Books</PrimaryNavLink>
        <PrimaryNavLink to="/addbook">Add Book</PrimaryNavLink>
        <PrimaryNavLink to={`/borrowedbooks?email=${user?.email}`}>
          Borrowed Books
        </PrimaryNavLink>
      </>
    </ul>
  );
};

export default DesktopLinks;
