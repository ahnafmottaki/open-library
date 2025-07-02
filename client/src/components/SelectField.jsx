const SelectField = ({ label, id, children, ...props }) => {
  return (
    <div className="max-w-sm">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <select
        className="text-sm  custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform  focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
        id={id}
        {...props}
      >
        {children}
      </select>
    </div>
  );
};

export default SelectField;
