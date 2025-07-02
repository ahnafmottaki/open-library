import { Suspense, use } from "react";
import PacManSpinner from "../../../components/PacManSpinner";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import axios from "axios";
import Slider from "react-slick";
import { StarRating } from "react-flexible-star-rating";
import { Link } from "react-router";

const booksPromise = axios
  .get("https://open-library-ten.vercel.app/allbooks")
  .then((res) => res.data);

const MyHomeSlider = ({ booksPromise }) => {
  const books = use(booksPromise);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className=" container  py-10 mx-auto px-2">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-800">
        Top Rated Books
      </h1>
      <div>
        <Slider {...settings}>
          {books
            .filter((book) => book.rating > 3)
            .slice(0, 6)
            .map((book) => (
              <div key={book._id} className="p-4 h-full">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col sm:flex-row gap-4 items-center sm:items-start h-full w-full">
                  <img
                    src={book.image_url}
                    alt={book.name}
                    className="w-full sm:w-48 h-64 object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-t-none"
                  />
                  <div className="p-4 flex-1">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      {book.name}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {book.description}
                    </p>
                    <StarRating
                      initialRating={book.rating}
                      starsLength={5}
                      isReadOnly={true}
                      isHalfRatingEnabled={true}
                      dimension={8}
                      isHoverEnabled={false}
                      color="hsla(54, 67%, 61%, 1)"
                    />
                    <Link to={"/bookdetail/" + book._id}>
                      <button className="my-custom-btn shadow-custom-shadow bg-primary-blue mt-4">
                        Get Book
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </section>
  );
};

const HomeSlider = () => {
  return (
    <Suspense fallback={<PacManSpinner />}>
      <MyHomeSlider booksPromise={booksPromise} />
    </Suspense>
  );
};

export default HomeSlider;
