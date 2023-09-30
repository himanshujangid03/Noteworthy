import { Link, useRouteLoaderData } from "react-router-dom";
import "./EditNote.css";
import { useContext, useEffect, useState } from "react";
import EditSingleNote from "./EditSingleNote";
import Modal from "../../ui/Modal";
import AuthContext from "../../utils/auth-context";
import CenterDiv from "../../ui/CenterDiv";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

function EditNote() {
  const data = useRouteLoaderData("get-notes");
  const [notesData, setNotesData] = useState([]);
  const [refresh, setRefresh] = useState(false);
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

  function refreshBtnHandler() {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {filteredEditNotes.length > 0 ? (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                marginBottom: "1rem",
              }}
            >
              <Heading as={"h2"} style={{ color: "white" }}>
                Edit the Notes
              </Heading>
              <Link to={""}>
                <Button type="refreshbtn" onClick={refreshBtnHandler}>
                  <FontAwesomeIcon icon={faArrowsRotate} spin={refresh} />
                </Button>
              </Link>
            </div>
            <ul className="edit-notes">
              {filteredEditNotes.map((item) => (
                <EditSingleNote key={item._id} item={item} />
              ))}
            </ul>
          </>
        ) : (
          <CenterDiv>
            <Heading style={{ color: "white" }} as="h2">
              No notes found in your collection.
            </Heading>
            <Link to={"/home/note"}>
              <Button type="createbtn">Create New</Button>
            </Link>
          </CenterDiv>
        )}
      </div>
    </>
  );
}

export default EditNote;
