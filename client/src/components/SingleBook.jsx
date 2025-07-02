import { StarRating } from "react-flexible-star-rating";
import { Link } from "react-router";
import { PiKeyReturnFill } from "react-icons/pi";
import { FaEdit } from "react-icons/fa";
import { BiDetail } from "react-icons/bi";
import { useAuthContext } from "../contexts/Auth/AuthContext";

function RenderButton({ btnType, _id, children }) {
  const btn = btnType.toLowerCase();
  if (btn === "update") {
    return (
      <Link to={"/edit/" + _id}>
        <button className="my-custom-btn  bg-[oklch(52.5%_0.223_3.958)]">
          <FaEdit className="text-lg text-white" />
          Update
        </button>
      </Link>
    );
  }
  if (btn === "details") {
    return (
      <Link to={"/bookdetail/" + _id}>
        <button className="my-custom-btn bg-[oklch(52.5%_0.223_3.958)]">
          <BiDetail className="text-lg text-white" />
          Details
        </button>
      </Link>
    );
  }
  if (btn === "return") {
    return children;
  }
}

function SingleBook({ book, btnType, onReturn = null }) {
  const { user } = useAuthContext();
  let status =
    book.quantity === 0 ? "Not Available" : `${book.quantity} Available`;
  if (btnType === "return") status = "Borrowed";
  const borrower = book.borrowers.find(
    (borrower) => borrower.email === user.email
  );
  return (
    <div
      key={book._id}
      className="relative card-side flex flex-col  shadow-sm  max-sm:w-full max-w-100 max-sm:mx-auto"
    >
      <figure className="h-45 md:h-50 lg:h-55 xl:h-60">
        <img src={book.image_url} alt={book.name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {book.name}
          <div className="badge badge-secondary">{book.category}</div>
        </h2>
        <p className="grow">{book.description}</p>
        <StarRating
          initialRating={book.rating}
          starsLength={5}
          isReadOnly={true}
          isHalfRatingEnabled={true}
          dimension={8}
          isHoverEnabled={false}
          color="hsla(54, 67%, 61%, 1)"
        />
        {btnType === "return" && (
          <p className="text-black font-bold flex items-center gap-1 mt-2">
            <PiKeyReturnFill className="text-2xl " />
            Return Date: &nbsp;
            {borrower.return_date}
          </p>
        )}
        <span className="font-medium absolute top-0 right-0  px-3 text-center py-2 bg-gradient-to-r from-[#ef745c] to-[#34073d] text-white text-sm rounded-sm">
          {status}
        </span>
        <div className="flex flex-row justify-between items-center">
          <p className="font-bold italic">by {book.author}</p>
          <RenderButton btnType={btnType} _id={book._id}>
            <button
              onClick={() => onReturn(book._id)}
              className="my-custom-btn shadow-custom-shadow bg-primary-blue"
            >
              Return
            </button>
          </RenderButton>
        </div>
      </div>
    </div>
  );
}

export default SingleBook;
