import useAxiosSecure from "../hooks/interceptorsHooks/useAxios";
import { useState } from "react";
import { useAuthContext } from "../contexts/Auth/AuthContext";
import fireToast from "../utils/toastRelated/toastFn";
import SingleBook from "./SingleBook";

const ShowListedBooks = ({ books, btnType }) => {
  const { axiosApi: returnBookApi } = useAxiosSecure("/returnbook", "delete");
  const { user } = useAuthContext();
  const [myBooks, setMyBooks] = useState(books);
  const handleReturnBook = async (id) => {
    const originalBooks = [...myBooks];
    setMyBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
    try {
      const res = await returnBookApi({
        params: { email: user.email, bookId: id },
      });
      if (res.data?.success) {
        fireToast(res.data.message, "success");
      } else {
        setMyBooks(() => originalBooks);
        fireToast(res.data.message, "error");
      }
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) return;
      fireToast("Book Return Failed", "error");
      setMyBooks(() => originalBooks);
    }
  };
  let message = "There are no books right now";
  if (btnType.toLowerCase() === "details")
    message = "There are no book in this category";
  if (btnType.toLowerCase() === "return")
    message = "You haven't borrowed any books";

  if (myBooks.length === 0)
    return (
      <div className="grid min-h-[calc(100vh-100px)] font-bold text-center italic text-3xl sm:text-4xl md:text-5xl place-items-center">
        {message}
      </div>
    );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {myBooks.map((book) => (
        <SingleBook
          key={book._id}
          book={book}
          btnType={btnType}
          onReturn={handleReturnBook}
        />
      ))}
    </div>
  );
};

export default ShowListedBooks;
