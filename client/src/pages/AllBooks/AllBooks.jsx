import { Suspense, useState } from "react";
import PacManSpinner from "../../components/PacManSpinner";
import { Await, useLoaderData } from "react-router";
import SectionWrapper from "../../components/SectionWrapper";
import TableView from "./sub-compos/TableView";
import SingleBook from "../../components/SingleBook";
import useTitle from "../../hooks/useTitle";
import Error from "../../components/Error";

function AllBooksWrapper({ books }) {
  useTitle("All Books | Open Library");
  const [showKey, setShowKey] = useState("all");
  const [view, setView] = useState("card-view");
  let booksToShow = books;
  if (showKey === "only-available")
    booksToShow = books.filter((book) => book.quantity > 0);
  const handleShowKeyChange = () => {
    setShowKey((prev) => {
      if (prev === "all") {
        return "only-available";
      }
      return "all";
    });
  };
  const handleViewChange = (e) => {
    setView(e.target.value);
  };
  return (
    <SectionWrapper title={showKey === "all" ? "All Books" : "Available Books"}>
      <div className="my-5 flex sm:flex-row flex-col  items-center gap-3">
        <button
          onClick={handleShowKeyChange}
          className="my-custom-btn shadow-custom-shadow bg-primary-blue"
        >
          {showKey === "all" ? "Show Available Books" : "Show All Books"}
        </button>
        <select
          id="view"
          className="text-sm max-w-xs custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out  focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
          value={view}
          onChange={handleViewChange}
        >
          <option value={"card-view"}>Card View</option>
          <option value={"table-view"}>Table View</option>
        </select>
      </div>
      {view === "card-view" ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {booksToShow.map((book) => (
              <SingleBook book={book} btnType={"update"} key={book._id} />
            ))}
          </div>
        </>
      ) : (
        <TableView books={booksToShow} />
      )}
    </SectionWrapper>
  );
}

const AllBooks = () => {
  const { booksPromise } = useLoaderData();
  return (
    <Suspense fallback={<PacManSpinner />}>
      <Await resolve={booksPromise} errorElement={<Error />}>
        {(res) => <AllBooksWrapper books={res.data} />}
      </Await>
    </Suspense>
  );
};

export default AllBooks;
