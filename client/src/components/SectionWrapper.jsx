const SectionWrapper = ({ title, children }) => {
  return (
    <section className="container min-h-[calc(100vh-100px)] p-2 pt-11 pb-13 mx-auto">
      <h1 className="text-4xl font-semibold mb-6">{title}</h1>
      {children}
    </section>
  );
};

export default SectionWrapper;
