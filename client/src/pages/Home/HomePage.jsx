import useTitle from "../../hooks/useTitle";
import BookCategories from "./sub-components/BookCategories";
import HeroSection from "./sub-components/HeroSection";
import HomeSlider from "./sub-components/HomeSlider";
import NewsLetter from "./sub-components/NewsLetter";

const HomePage = () => {
  useTitle("Home | Open Library");
  return (
    <div className="min-h-screen">
      <HeroSection />
      <BookCategories />
      <HomeSlider />
      <NewsLetter />
    </div>
  );
};

export default HomePage;
