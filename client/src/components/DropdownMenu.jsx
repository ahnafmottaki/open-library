const DropdownMenu = ({ triggerElement, children }) => {
  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <div tabIndex={0} role="button">
        <div className=" select-none">{triggerElement}</div>
      </div>
      <div tabIndex={0} className="dropdown-content z-1  shadow-sm">
        {children}
      </div>
    </div>
  );
};

export default DropdownMenu;
