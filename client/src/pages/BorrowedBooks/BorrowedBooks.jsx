import { Suspense, use } from "react";
import { Await, useLoaderData } from "react-router";
import PacManSpinner from "../../components/PacManSpinner";
import ShowListedBooks from "../../components/ShowListedBooks";
import useTitle from "../../hooks/useTitle";
import useAxiosSecure from "../../hooks/interceptorsHooks/useAxios";
import { useAuthContext } from "../../contexts/Auth/AuthContext";

function MyBorrowedBooks({ booksPromise }) {
  const { data: books } = use(booksPromise);
  const borrowedBooksCount = books.length;
  if (borrowedBooksCount === 0)
    return (
      <div className="min-h-[calc(100vh-100px)] grid place-items-center font-bold text-2xl sm:text-3xl ">
        No Books Borrowed
      </div>
    );
  return (
    <section className="container min-h-[calc(100vh-100px)] p-2 pt-11 pb-13 mx-auto">
      <ShowListedBooks books={books} btnType={"return"} />
    </section>
  );
}

const BorrowedBooks = () => {
  useTitle("Borrowed Books | Open Library");
  const { user } = useAuthContext();
  const { axiosApi: borrowedBooksPromise } = useAxiosSecure(
    "/borrowedbooks",
    "get"
  );
  return (
    <Suspense fallback={<PacManSpinner />}>
      <MyBorrowedBooks
        booksPromise={borrowedBooksPromise({
          params: {
            email: user.email,
          },
        })}
      />
    </Suspense>
  );
};

export default BorrowedBooks;
