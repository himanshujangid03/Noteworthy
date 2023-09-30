import "./EditNote.css";
import { useContext } from "react";
import AuthContext from "../../utils/auth-context";
import FavNote from "./FavNote";
import CenterDiv from "../../ui/CenterDiv";
import Heading from "../../ui/Heading";
import { Link } from "react-router-dom";
import Button from "../../ui/Button";

function Favourites() {
  const ctx = useContext(AuthContext);
  const localNotesData = JSON.parse(localStorage.getItem("favourites"));

  const filteredNotes = ctx.query
    ? localNotesData.filter((item) =>
        item.title.toLowerCase().includes(ctx.query.toLowerCase())
      )
    : localNotesData;

  return (
    <>
      <div>
        {filteredNotes.length > 0 ? (
          <>
            <ul className="notes">
              {filteredNotes.map((item) => (
                <FavNote key={item._id} item={item} />
              ))}
            </ul>
          </>
        ) : (
          <CenterDiv>
            <Heading style={{ color: "white" }} as="h2">
              No notes found in your collection.
            </Heading>
            <Link to={"/home/note"}>
              <Button type="createbtn">Add New</Button>
            </Link>
          </CenterDiv>
        )}
      </div>
    </>
  );
}

export default Favourites;
