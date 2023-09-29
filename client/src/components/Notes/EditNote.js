import { useRouteLoaderData } from "react-router-dom";
import "./EditNote.css";
import { useContext, useEffect, useState } from "react";
import EditSingleNote from "./EditSingleNote";
import Modal from "../../ui/Modal";
import AuthContext from "../../utils/auth-context";

function EditNote() {
  const data = useRouteLoaderData("get-notes");
  const [notesData, setNotesData] = useState([]);
  const ctx = useContext(AuthContext);

  useEffect(() => {
    setNotesData(data);
  }, [data]);

  const sortedNotes = notesData.sort((a, b) => {
    const timestampA = new Date(a.createdAt);
    const timestampB = new Date(b.createdAt);
    return timestampB - timestampA;
  });

  const filteredEditNotes = sortedNotes
    ? sortedNotes.filter((item) =>
        item.title.toLowerCase().includes(ctx.query.toLowerCase())
      )
    : sortedNotes;
  return (
    <>
      <div>
        {filteredEditNotes ? (
          <>
            <ul className="edit-notes">
              {filteredEditNotes.map((item) => (
                <EditSingleNote key={item._id} item={item} />
              ))}
            </ul>
          </>
        ) : (
          <p>Could not find the notes with this name</p>
        )}
      </div>
    </>
  );
}

export default EditNote;
