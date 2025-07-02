import { HiHandRaised } from "react-icons/hi2";
import { FaCalendarDays } from "react-icons/fa6";

const NewsLetter = () => {
  return (
    <div className="relative isolate overflow-hidden text-black py-16 sm:py-24 lg:py-32">
      <div className="mx-auto container px-2 ">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-4xl font-semibold tracking-tight ">
              Subscribe to our newsletter
            </h2>
            <p className="mt-4 text-lg text-gray-700">
              Subscribe to get every updates from us whether a new book update
              and weekly book competition result
            </p>
            <div className="mt-6 flex max-w-md gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                autoComplete="email"
                className="min-w-0 flex-auto rounded-md border border-gray-300 shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1  hover:shadow-lg hover:border-blue-300 bg-gray-100 px-3.5 py-2 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
              <button
                type="submit"
                className="my-custom-btn shadow-custom-shadow bg-primary-blue"
              >
                Subscribe
              </button>
            </div>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <FaCalendarDays
                  aria-hidden="true"
                  className="size-6 text-2xl text-black"
                />
              </div>
              <dt className="mt-4 text-base font-semibold text-black">
                Weekly articles
              </dt>
              <dd className="mt-2 text-base/7 text-gray-700">
                You can participate and win monthly top book prize and have your
                name in the top books section
              </dd>
            </div>
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <HiHandRaised
                  aria-hidden="true"
                  className="size-6 text-2xl text-black"
                />
              </div>
              <dt className="mt-4 text-base font-semibold text-black">
                No spam
              </dt>
              <dd className="mt-2 text-base/7 text-gray-700">
                Stay away from spams and maintain privacy and rules for better
                service
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
