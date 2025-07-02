import { Suspense, useRef } from "react";
import PacManSpinner from "../../components/PacManSpinner";
import { Await, useLoaderData } from "react-router";
import { StarRating } from "react-flexible-star-rating";
import { AiFillAccountBook } from "react-icons/ai";
import CustomModal from "../../components/CustomModal";
import BorrowForm from "./sub-compos/BorrowForm";
import { useAuthContext } from "../../contexts/Auth/AuthContext";
import useTitle from "../../hooks/useTitle";
import Error from "../../components/Error";

const BookDetail = () => {
  const { bookPromise } = useLoaderData();
  const modalRef = useRef(null);
  const { user } = useAuthContext();
  const handleModalOpen = () => {
    modalRef.current.open();
  };

  return (
    <Suspense fallback={<PacManSpinner />}>
      <Await resolve={bookPromise} errorElement={<Error />}>
        {(response) => {
          useTitle(response.data.name + " | Open Library");
          const {
            name,
            description,
            image_url,
            category,
            rating,
            author,
            quantity,
            borrowers,
          } = response.data;

          const isBookBorrowed =
            borrowers.findIndex((borrower) => borrower.email === user.email) !==
            -1;
          const isButtonDisabled = quantity === 0 || isBookBorrowed;
          return (
            <>
              <CustomModal ref={modalRef}>
                <BorrowForm book={response.data} />
              </CustomModal>
              <section className="container mx-auto px-2 py-15 min-h-[calc(100vh-100px)] flex flex-col justify-center">
                <div className="shadow-sm grid md:grid-cols-[300px_1fr] lg:grid-cols-[400px_1fr] gap-5 p-5 relative">
                  <figure className=" sm:flex justify-center">
                    <img
                      src={image_url}
                      alt="Shoes"
                      className="sm:max-w-sm sm:h-80 md:h-100 w-full object-cover"
                    />
                  </figure>
                  <div className="flex flex-col justify-between">
                    <div>
                      <h2 className="flex items-center gap-2 text-3xl font-semibold my-5">
                        {name}
                        <div className="badge badge-secondary">{category}</div>
                      </h2>
                      <p className=" my-6">{description}</p>
                      <div>
                        <StarRating
                          initialRating={rating}
                          starsLength={5}
                          isReadOnly={true}
                          isHalfRatingEnabled={true}
                          dimension={8}
                          isHoverEnabled={false}
                          color="hsla(54, 67%, 61%, 1)"
                        />
                      </div>
                      <span className="font-medium absolute top-0 left-0  px-3 text-center py-2 bg-gradient-to-r from-[#ef745c] to-[#34073d] text-white text-sm rounded-sm">
                        {quantity === 0 ? "Not" : quantity} Available
                      </span>
                    </div>
                    <div className="card-actions mt-10 md:mt-0 items-center justify-between">
                      <div className=" text-base sm:text-lg font-extrabold italic">
                        by {author}
                      </div>
                      <button
                        disabled={isButtonDisabled}
                        onClick={handleModalOpen}
                        className={`my-custom-btn bg-blue-700 ${
                          isButtonDisabled ? " opacity-40 " : ""
                        }`}
                      >
                        <AiFillAccountBook className="text-xl text-white" />
                        {isBookBorrowed ? "Borrowed" : "Borrow"}
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default BookDetail;
