import BOOK_CATEGORIES from "../../../dummyData/dummyBookCategories.js";
import * as motion from "motion/react-client";
import { Link } from "react-router";
import { Slide } from "react-awesome-reveal";
const styles = [
  { gradient: " from-[#30c5d2] via-[#f36364] to-[#471069] ", to: "left" },
  { gradient: " from-[#ff1b6b] via-[#45caff] to-[#bf0fff] ", to: "down" },
  { gradient: " from-[#9bafd9] via-[#103783] to-[#d3f3f1] ", to: "up" },
  { gradient: " from-[#243748] via-[#4b749f] to-[#7d7cf9]", to: "right" },
];

const BookCategories = () => {
  return (
    <section className="container p-2 pt-11 pb-13 mx-auto">
      <h1 className="text-4xl font-semibold mb-6">Top Visited Categories</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 ">
        {BOOK_CATEGORIES.slice(0, 4).map((cat, index) => {
          return (
            <Slide key={cat} direction={styles[index].to} triggerOnce cascade>
              <Link to={"/category/" + cat}>
                <motion.div
                  whileHover={{
                    backgroundPositionX: "50%",
                    backgroundPositionY: "100%",
                    rotate: "-6deg",
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  //  hover:animate-[gradientMove_300ms_ease-in-out_forwards] transition-all duration-300 hover:scale-105 hover:-rotate-1
                  className={` h-40 sm:h-50 w-full bg-gradient-to-br  bg-[length:200%_200%] bg-[0%_50%]
                 text-white  flex justify-center items-center rounded-sm font-bold text-lg sm:text-xl ${styles[index].gradient}`}
                >
                  {cat}
                </motion.div>
              </Link>
            </Slide>
          );
        })}
      </div>
    </section>
  );
};

export default BookCategories;
