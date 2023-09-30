import { Outlet, useRouteLoaderData } from "react-router-dom";
import SidePanel from "../components/Notes/SidePanel";
import "./Home.css";
import TopHeader from "../components/Header/TopHeader";
import NotAuthModal from "../components/Authentication/NotAuthModal";
import { useContext } from "react";
import AuthContext from "../utils/auth-context";

function Home() {
  const data = useRouteLoaderData();

  //const ctx = useContext(AuthContext);
  return (
    <>
      {data && data.name && <NotAuthModal />}
      <div className="home">
        <SidePanel />
        <div className="home__right">
          <div>
            <TopHeader />
          </div>
          <div className="note-content">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
