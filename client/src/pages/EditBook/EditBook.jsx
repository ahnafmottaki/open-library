import { Suspense, use, useState } from "react";
import useAxiosSecure from "../../hooks/interceptorsHooks/useAxios";
import PacManSpinner from "../../components/PacManSpinner";
import { useAuthContext } from "../../contexts/Auth/AuthContext";
import { useNavigate, useParams } from "react-router";
import fireToast from "../../utils/toastRelated/toastFn";
import { hasMinLength } from "../../utils/inputValidation/inputValidation";
import BOOK_CATEGORIES from "../../dummyData/dummyBookCategories.js";
import InputField from "../../components/InputField.jsx";
import SelectField from "../../components/SelectField.jsx";
import useTitle from "../../hooks/useTitle.js";

function EditBookSecure({ promise }) {
  const { data: book } = use(promise);
  const [submitting, setSubmitting] = useState();
  useTitle(book.name + " | EditBook");
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { axiosApi: editAxiosApi } = useAxiosSecure(
    "/edit/" + book._id,
    "post"
  );
  const handleEditBook = async (event) => {
    event.preventDefault();
    const formDetails = Object.fromEntries(
      new FormData(event.target).entries()
    );
    const bookDetails = Object.fromEntries(
      Object.entries(formDetails).map(([key, value]) => [key, value.trim()])
    );

    bookDetails.rating = +bookDetails.rating;

    const { name, author, category, image_url, rating } = bookDetails;

    if (!hasMinLength(name, 3))
      return fireToast("Name must be at least 3 characters", "warning");
    if (!hasMinLength(author, 3))
      return fireToast("Author Name must be at least 3 characters", "warning");
    if (!hasMinLength(image_url, 15))
      return fireToast("Image Url must be at least 12 characters", "warning");
    if (rating < 1 || rating > 5)
      return fireToast("Rating must be between 1 to 5", "warning");
    if (!BOOK_CATEGORIES.includes(category))
      return fireToast("Category must be from the list", "warning");
    setSubmitting(true);
    try {
      const res = await editAxiosApi(
        { params: { email: user.email } },
        bookDetails
      );
      if (res?.data?.modifiedCount) {
        fireToast("Book Edited Successfully", "success");
        navigate("/allbooks");
      }
    } catch (err) {
      fireToast("Book Update Failed ", "error");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div>
      <section className="min-h-[calc(100vh-100px)] container p-2 pt-11 pb-13 mx-auto flex flex-col justify-center items-center">
        <form
          action=""
          className="flex flex-col mx-auto gap-4 w-full max-w-[385px]"
          onSubmit={handleEditBook}
        >
          <div className="flex gap-2 sm:items-center sm:flex-row flex-col w-full">
            <InputField
              id={"name"}
              label={"Book Name"}
              type="text"
              required
              name="name"
              placeholder="Your Book Name"
              defaultValue={book.name}
            />
            <InputField
              id={"author"}
              label={"Author Name"}
              type="text"
              required
              name="author"
              placeholder="Author Name"
              defaultValue={book.author}
            />
          </div>
          <InputField
            id={"image"}
            label={"Image Url"}
            type="url"
            required
            name="image_url"
            placeholder="Your Image Url"
            defaultValue={book.image_url}
          />
          <SelectField
            label={"Book Rating"}
            id={"rating"}
            name="rating"
            defaultValue={book.rating}
            required
          >
            <option value={""} disabled>
              Select Rating
            </option>
            {[1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating}>
                {rating}
              </option>
            ))}
          </SelectField>

          <SelectField
            label={"Book Category"}
            id={"category"}
            name="category"
            defaultValue={book.category}
            required
          >
            <option value={""} disabled>
              Select Category
            </option>
            {BOOK_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </SelectField>

          <button
            disabled={submitting}
            type="submit"
            className={`bg-primary-blue my-custom-btn w-full ${
              submitting ? " opacity-40 " : ""
            }`}
          >
            Edit Book
          </button>
        </form>
      </section>
    </div>
  );
}

const EditBook = () => {
  const { bookId } = useParams();
  const { axiosApi: editBookApi } = useAxiosSecure("/edit/" + bookId, "get");
  const { user } = useAuthContext();
  return (
    <Suspense fallback={<PacManSpinner />}>
      <EditBookSecure
        promise={editBookApi({
          params: {
            email: user.email,
          },
        })}
      />
    </Suspense>
  );
};

export default EditBook;
