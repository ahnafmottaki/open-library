import { Link } from "react-router";

const DynamicSection = ({ title, links }) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold uppercase text-footer-text-color">{title}</h1>
      {links.map((link) => (
        <Link
          key={link}
          className="text-footer-text-color hover:text-white transition-colors"
        >
          {link}
        </Link>
      ))}
    </div>
  );
};

export default DynamicSection;
