import { Outlet, Link } from "react-router-dom";
import CosmicNavbar from "../../components/home/CosmicNavbar";
import CosmicFooter from "../../components/home/CosmicFooter";

const RootLayout = () => {
  return (
    <div className="app">
      <CosmicNavbar />
      <Outlet />
      <CosmicFooter />
    </div>
  );
};

export default RootLayout;
