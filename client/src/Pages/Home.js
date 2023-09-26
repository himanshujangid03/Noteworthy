import NoteList from "../components/Notes/NoteList";
import SidePanel from "../components/Notes/SidePanel";
import "./Home.css";

function Home() {
  return (
    <>
      <div className="home">
        <SidePanel />
        <NoteList />
      </div>
    </>
  );
}

export default Home;
