import { useRouteLoaderData } from "react-router-dom";
import "./EditNote.css";
import { useEffect, useState } from "react";
import Note from "./Note";

function Favourites() {
  const data = useRouteLoaderData("get-notes");
  const [notesData, setNotesData] = useState([]);

  useEffect(() => {
    setNotesData(data);
  }, [data]);

  const sortedNotes = notesData.sort((a, b) => {
    const timestampA = new Date(a.createdAt);
    const timestampB = new Date(b.createdAt);
    return timestampB - timestampA;
  });
  return (
    <>
      <div>
        {sortedNotes.length > 0 ? (
          <>
            <ul className="notes">
              {notesData.map((item) => (
                <Note key={item._id} item={item} />
              ))}
            </ul>
          </>
        ) : (
          <p>
            Either you are not logged In or You did not create notes till now!
          </p>
        )}
      </div>
    </>
  );
}

export default Favourites;
