import { StarRating } from "react-flexible-star-rating";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router";

const TableView = ({ books }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>quantity</th>
            <th>Name</th>
            <th>Author</th>
            <th>Rating</th>
            <th>Borrowed By</th>
            <th>More</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <th>{book.quantity}</th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={book.image_url} alt={book.name} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{book.name}</div>
                    <div className="text-sm opacity-50">{book.category}</div>
                  </div>
                </div>
              </td>
              <td className="font-medium italic">{book.author}</td>
              <td>
                <StarRating
                  initialRating={book.rating}
                  starsLength={5}
                  isReadOnly={true}
                  isHalfRatingEnabled={true}
                  dimension={8}
                  isHoverEnabled={false}
                  color="hsla(54, 67%, 61%, 1)"
                />
              </td>
              <td className="font-bold">
                {book.borrowers.length === 0
                  ? "No people"
                  : `${book.borrowers.length} people`}
              </td>
              <th>
                <Link to={"/edit/" + book._id}>
                  <button className="my-custom-btn  bg-[oklch(52.5%_0.223_3.958)]">
                    <FaEdit className="text-lg text-white" />
                    Update
                  </button>
                </Link>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
