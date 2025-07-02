import { Suspense } from "react";
import { Await, useLoaderData, useParams } from "react-router";
import PacManSpinner from "../../components/PacManSpinner";
import ShowListedBooks from "../../components/ShowListedBooks";
import SectionWrapper from "../../components/SectionWrapper";
import useTitle from "../../hooks/useTitle";
import Error from "../../components/Error";

const CategorizedBook = () => {
  const { categoryPromise } = useLoaderData();
  const { categoryName } = useParams();
  useTitle(categoryName + " | Open Library");
  return (
    <Suspense fallback={<PacManSpinner />}>
      <Await resolve={categoryPromise} errorElement={<Error />}>
        {(resolvedResponse) => (
          <SectionWrapper title={categoryName}>
            <ShowListedBooks
              books={resolvedResponse.data}
              btnType={"details"}
            />
          </SectionWrapper>
        )}
      </Await>
      -
    </Suspense>
  );
};

export default CategorizedBook;
