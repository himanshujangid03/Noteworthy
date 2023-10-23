import { Link, useRouteLoaderData } from "react-router-dom";
import { getNotesApi } from "../../utils/api";
import { useContext, useEffect, useReducer, useState } from "react";
import Note from "./Note";
import "./GetNote.css";
import AuthContext from "../../utils/auth-context";
import CenterDiv from "../../ui/CenterDiv";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import Loader from "../../ui/Loader";
import NoteLoader from "../../ui/NoteLoader";

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

function GetNotes() {
  const data = useRouteLoaderData("get-notes");
  const [refresh, setRefresh] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
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

  const filteredNotes = ctx.query
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
      {state.status === "loading" ? (
        <NoteLoader />
      ) : (
        <div>
          {filteredNotes.length > 0 ? (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  marginBottom: "1rem",
                }}
              >
                <Heading as={"h2"} style={{ color: "white" }}>
                  Explore Your Notes
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
              <motion.div
                layout
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                <motion.ul
                  initial={{ transition: { staggerChildren: 0.05 } }}
                  className="notes"
                >
                  {filteredNotes.map((item) => (
                    <Note key={item._id} item={item} />
                  ))}
                </motion.ul>
              </motion.div>
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

export default GetNotes;

export async function loader({ req, params }) {
  const response = await fetch(getNotesApi, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    return response;
  }
  const resData = await response.json();

  return resData;
}
