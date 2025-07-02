import { useState } from "react";
import InputField from "../../components/InputField";
import SelectField from "../../components/SelectField";
import TextAreaField from "../../components/TextAreaField";
import TypeWriter from "../../components/TypeWriter";
import { hasMinLength } from "../../utils/inputValidation/inputValidation";
import fireToast from "../../utils/toastRelated/toastFn";
import { useAuthContext } from "../../contexts/Auth/AuthContext";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/interceptorsHooks/useAxios";
import BOOK_CATEGORIES from "../../dummyData/dummyBookCategories.js";
import useTitle from "../../hooks/useTitle.js";

export default function AddBook() {
  useTitle("Add Book | Open Library");
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuthContext();
  const { axiosApi: addBookApi } = useAxiosSecure("/addbook", "post");
  const navigate = useNavigate();

  const handleAddBook = async (event) => {
    event.preventDefault();
    const formDetails = Object.fromEntries(
      new FormData(event.target).entries()
    );
    const bookDetails = Object.fromEntries(
      Object.entries(formDetails).map(([key, value]) => [key, value.trim()])
    );

    bookDetails.quantity = +bookDetails.quantity;
    bookDetails.rating = +bookDetails.rating;

    const {
      name,
      author,
      category,
      content,
      description,
      image_url,
      quantity,
      rating,
    } = bookDetails;

    if (!hasMinLength(name, 3))
      return fireToast("Name must be at least 3 characters", "warning");
    if (!hasMinLength(author, 3))
      return fireToast("Author Name must be at least 3 characters", "warning");
    if (!hasMinLength(image_url, 15))
      return fireToast("Image Url must be at least 12 characters", "warning");
    if (quantity < 1 || quantity > 5)
      return fireToast("Quantity must be between 1 to 5", "warning");
    if (rating < 1 || rating > 5)
      return fireToast("Rating must be between 1 to 5", "warning");
    if (!BOOK_CATEGORIES.includes(category))
      return fireToast("Category must be from the list", "warning");
    if (!hasMinLength(description, 10))
      return fireToast("Description is Too Short", "warning");
    if (!hasMinLength(content, 10))
      return fireToast("Content is Too Short", "warning");

    try {
      setSubmitting(true);

      const res = await addBookApi(
        {
          params: { email: user.email },
        },
        bookDetails
      );
      if (res.data?.insertedId) {
        fireToast("Book Added Successfully", "success");
        navigate("/allbooks");
      }
    } catch (err) {
      if (err.status === 401 || err.status === 403) return;
      fireToast("Failed To Add Book, Try again", "error");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="min-h-[calc(100vh-100px)]  ">
      <section className="container p-2 pt-11 pb-13 mx-auto flex flex-col items-center">
        <TypeWriter
          elementStyles={"text-4xl font-bold mb-6"}
          elementWhereToShow={"h1"}
          wordToShow={["Add A Book"]}
        />
        <form
          action=""
          className="flex flex-col mx-auto gap-4 w-full max-w-[385px]"
          onSubmit={handleAddBook}
        >
          <div className="flex gap-2 sm:items-center sm:flex-row flex-col w-full">
            <InputField
              id={"name"}
              label={"Book Name"}
              type="text"
              required
              name="name"
              placeholder="Your Book Name"
            />
            <InputField
              id={"author"}
              label={"Author Name"}
              type="text"
              required
              name="author"
              placeholder="Author Name"
            />
          </div>
          <InputField
            id={"image"}
            label={"Image Url"}
            type="url"
            required
            name="image_url"
            placeholder="Your Image Url"
          />

          <div className="flex gap-2 sm:items-center sm:flex-row flex-col w-full">
            <InputField
              id={"quantity"}
              label={"Book Quantity"}
              type="number"
              min="3"
              required
              name="quantity"
              placeholder="Book Quantity"
            />
            <InputField
              id={"rating"}
              label={"Book Rating"}
              type="number"
              required
              min="1"
              name="rating"
              placeholder="Book Quantity"
            />
          </div>
          <SelectField
            label={"Book Category"}
            id={"category"}
            name="category"
            defaultValue=""
            required
          >
            <option value={""} disabled>
              Select One
            </option>
            {BOOK_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </SelectField>
          <TextAreaField
            label={"Description"}
            name="description"
            required
            placeholder="Your description goes here"
          />
          <TextAreaField
            label={"Content"}
            name="content"
            required
            placeholder="Your Book Content goes here"
          />

          <button
            disabled={submitting}
            type="submit"
            className={`bg-primary-blue my-custom-btn w-full ${
              submitting ? " opacity-40 " : ""
            }`}
          >
            Add Book
          </button>
        </form>
      </section>
    </div>
  );
}
