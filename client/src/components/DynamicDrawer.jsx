import { useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

const DynamicDrawer = ({
  triggerElement,
  triggerBtnCls,
  children,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <>
      <button onClick={toggleDrawer} className={triggerBtnCls}>
        {triggerElement}
      </button>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="bottom"
        duration={200}
        {...props}
      >
        <div className="w-full h-full" onClick={toggleDrawer}>
          {children}
        </div>
      </Drawer>
    </>
  );
};

export default DynamicDrawer;
