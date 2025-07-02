import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import HomePage from "../pages/Home/HomePage";
import AddBook from "../pages/AddBook/AddBook";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "../components/PrivateRoute";
import RedirectIfLoggedIn from "../components/RedirectIfLoggedIn";
import AllBooks from "../pages/AllBooks/AllBooks";
import EditBook from "../pages/EditBook/EditBook";
import axios from "axios";
import CategorizedBook from "../pages/CategorizedBook/CategorizedBook";
import BookDetail from "../pages/BookDetail/BookDetail";
import BorrowedBooks from "../pages/BorrowedBooks/BorrowedBooks";
import Page404 from "../pages/404/Page404";
import Error from "../components/Error";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <Error />,
    children: [
      { index: true, Component: HomePage },
      {
        path: "/login",
        element: (
          <RedirectIfLoggedIn>
            <Login />
          </RedirectIfLoggedIn>
        ),
      },
      {
        path: "/register",
        element: (
          <RedirectIfLoggedIn>
            <Register />
          </RedirectIfLoggedIn>
        ),
      },
      {
        path: "/addbook",
        element: (
          <PrivateRoute>
            <AddBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/allbooks",
        element: (
          <PrivateRoute>
            <AllBooks />
          </PrivateRoute>
        ),
        loader: () => ({
          booksPromise: axios.get(
            "https://open-library-ten.vercel.app/allbooks"
          ),
        }),
      },
      {
        path: "/edit/:bookId",
        element: (
          <PrivateRoute>
            <EditBook />
          </PrivateRoute>
        ),
      },
      {
        path: "category/:categoryName",
        element: (
          <PrivateRoute>
            <CategorizedBook />
          </PrivateRoute>
        ),
        loader: ({ params }) => ({
          categoryPromise: axios.get(
            "https://open-library-ten.vercel.app/category/ " +
              params.categoryName
          ),
        }),
      },
      {
        path: "bookdetail/:bookId",
        element: (
          <PrivateRoute>
            <BookDetail />
          </PrivateRoute>
        ),
        loader: ({ params }) => ({
          bookPromise: axios.get(
            "https://open-library-ten.vercel.app/bookdetail/" + params.bookId
          ),
        }),
      },
      {
        path: "/borrowedbooks",
        element: (
          <PrivateRoute>
            <BorrowedBooks />
          </PrivateRoute>
        ),
        // loader: ({ request }) => {
        //   const url = new URL(request.url);
        //   const userEmail = url.searchParams.get("email");
        //   let query = userEmail ? "?email=" + userEmail : "";
        //   return {
        //     borrowedBooksPromise: axios.get(
        //       "https://open-library-ten.vercel.app/borrowedbooks" + query
        //     ),
        //   };
        // },
      },
    ],
  },
  { path: "*", Component: Page404 },
]);

export default router;
