import React from "react";

const InputField = ({
  label,
  id,
  labelClasses = "text-gray-700 ",
  ...props
}) => {
  return (
    <div className="max-w-sm">
      <label
        className={"block  text-sm font-bold mb-2 " + labelClasses}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
        id={id}
        {...props}
      />
    </div>
  );
};

export default InputField;
