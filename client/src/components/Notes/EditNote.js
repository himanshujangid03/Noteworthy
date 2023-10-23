import { Link, useRouteLoaderData } from "react-router-dom";
import "./EditNote.css";
import { useContext, useEffect, useReducer, useState } from "react";
import EditSingleNote from "./EditSingleNote";
// eslint-disable-next-line
import Modal from "../../ui/Modal";
import AuthContext from "../../utils/auth-context";
import CenterDiv from "../../ui/CenterDiv";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import NoteLoader from "../../ui/NoteLoader";
import MessageModal from "../../ui/MessageModal";

const initialState = {
  notesData: [],
  status: "loading",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "notes-recieved":
      return { ...state, notesData: action.payload, status: "ready" };
    default:
      return initialState;
  }
};

function EditNote() {
  const data = useRouteLoaderData("get-notes");
  const [state, dispatch] = useReducer(reducer, initialState);
  const [refresh, setRefresh] = useState(false);
  const ctx = useContext(AuthContext);

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        dispatch({ type: "notes-recieved", payload: data });
      }, 500);
    }
  }, [data]);

  const sortedNotes = state.notesData.sort((a, b) => {
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
      {ctx.messageModal && <MessageModal />}
      {state.status === "loading" ? (
        <NoteLoader />
      ) : (
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
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{
                      transition: { type: "spring", stiffness: 500 },
                      scale: 1.1,
                    }}
                  >
                    <Button type="refreshbtn" onClick={refreshBtnHandler}>
                      <FontAwesomeIcon icon={faArrowsRotate} spin={refresh} />
                    </Button>
                  </motion.div>
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
      )}
    </>
  );
}

export default EditNote;
