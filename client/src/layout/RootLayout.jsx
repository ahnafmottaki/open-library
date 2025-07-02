import { Outlet } from "react-router";
import Navbar from "../shared/Navbar/Navbar";
import Footer from "../shared/Footer/Footer";
import ToastContainerModified from "../components/ToastContainerModified";

export default function RootLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
      <ToastContainerModified />
    </div>
  );
}
