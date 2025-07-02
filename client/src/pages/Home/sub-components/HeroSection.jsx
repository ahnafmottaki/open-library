import { IoSearch } from "react-icons/io5";
import Divider from "../../../components/Divider";
import * as motion from "motion/react-client";

const HeroSection = () => {
  return (
    <section className="pt-20 bg-[url('/large-bg.jpg')] bg-no-repeat  bg-center">
      <div className="container mx-auto mb-12 px-3 sm:px-2">
        <p className="text-xl text-white mb-3 max-[600px]:text-base">
          Accelerating research discovery to shape a better future
        </p>
        <h1 className="text-white max-[400px]:text-3xl text-4xl text-shadow-2xs font-extrabold max-w-[700px]">
          Today's research, tomorrow's innovation
        </h1>
        <div className="mt-5 max-w-[685px]">
          <div className="relative">
            <input
              type="text"
              className="bg-white border-none w-full text-base p-4 block -outline-offset-2 text-hero-input-text"
              placeholder="Search books, journals etc"
            />
            <button className="absolute right-[1px] top-1/2 -translate-y-1/2 h-[98%] cursor-pointer hover:bg-indigo-700 transition-colors px-5 bg-whitey-blue text-white">
              <IoSearch className="text-2xl" />
            </button>
          </div>
          <div className="text-white text-right mt-2 font-medium cursor-pointer">
            Advanced Search
          </div>
        </div>
      </div>
      <Divider />
      <div className="sm:px-2 px-4 max-[620px]:flex-col  container mx-auto flex justify-between items-center text-white font-bold py-8 text-lg md:text-xl">
        <span>2,000+ Journals</span>
        <span>260+ Reference Works</span>
        <span>27,000+ Online Books</span>
      </div>
    </section>
  );
};

export default HeroSection;
