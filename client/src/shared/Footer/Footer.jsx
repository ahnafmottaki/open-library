import Divider from "../../components/Divider";
import DynamicSection from "./DynamicSection";

const DUMMY_FOOTER_SECTIONS = [
  {
    title: "About Open Library",
    links: [
      "Privacy Policy",
      "Terms of Use",
      "About Cookies",
      "Manage Cookies",
      "Accessibility",
      " Publishing Policies",
      "Developing World Access",
    ],
  },
  {
    title: "Help & Support",
    links: ["Contact Us", "Training and Support", "DMCA & Reporting Piracy"],
  },
  {
    title: "Opportunities",
    links: ["Subscription Agents", "Advertisers & Corporate Partners"],
  },
  {
    title: "Connect With Us",
    links: ["The Open Library Network", "Our Press Room"],
  },
];

export default function Footer() {
  return (
    <div className="bg-black pt-10 pb-11">
      <footer className="container mx-auto  ">
        <div className="flex justify-between flex-wrap gap-x-4 gap-y-10 px-6 sm:px-3 pb-10">
          {DUMMY_FOOTER_SECTIONS.map((section) => (
            <DynamicSection
              key={section.title}
              title={section.title}
              links={section.links}
            />
          ))}
        </div>
        <Divider />
        <div className="flex justify-between mt-10 gap-y-3 sm:gap-0 flex-wrap sm:px-3 px-6">
          <span className="text-white font-bold text-2xl sm:text-3xl font-serif">
            Open <br />
            Library
          </span>
          <p className="text-footer-text-color max-w-[340px] text-xs sm:text-sm ">
            Copyright © 1999-2025 John Wiley & Sons, Inc or related companies.
            All rights reserved, including rights for text and data mining and
            training of artificial intelligence technologies or similar
            technologies.
          </p>
        </div>
      </footer>
    </div>
  );
}
