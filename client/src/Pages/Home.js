import { Outlet } from "react-router-dom";
import SidePanel from "../components/Notes/SidePanel";
import "./Home.css";
import NoteComponent from "./NoteComponent";
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
          <NoteComponent>
            <Outlet />
          </NoteComponent>
        </div>
      </div>
    </>
  );
}

export default Home;
