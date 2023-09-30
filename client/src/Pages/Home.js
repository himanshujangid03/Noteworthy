import { Outlet, useRouteLoaderData } from "react-router-dom";
import SidePanel from "../components/Notes/SidePanel";
import "./Home.css";
import TopHeader from "../components/Header/TopHeader";
import NotAuthModal from "../components/Authentication/NotAuthModal";

function Home() {
  const data = useRouteLoaderData("loginData");

  //const ctx = useContext(AuthContext);
  return (
    <>
      {data && !data.name && <NotAuthModal />}
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
