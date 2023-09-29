import { Outlet } from "react-router-dom";
import SidePanel from "../components/Notes/SidePanel";
import "./Home.css";
import TopHeader from "../components/Header/TopHeader";

function Home() {
  return (
    <>
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
