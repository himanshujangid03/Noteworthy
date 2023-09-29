import { Link, useRouteLoaderData } from "react-router-dom";
import { getNotesApi } from "../../utils/api";
import { useContext, useEffect, useState } from "react";
import Note from "./Note";
import "./GetNote.css";
import AuthContext from "../../utils/auth-context";
import CenterDiv from "../../ui/CenterDiv";
import noDataImage from "../../assets/no-data.svg";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";

function GetNotes() {
  const data = useRouteLoaderData("get-notes");
  const [notesData, setNotesData] = useState([]);
  const ctx = useContext(AuthContext);

  useEffect(() => {
    if (data) {
      setNotesData(data);
    } else {
      setNotesData(null);
    }
  }, [data]);

  const sortedNotes = notesData
    ? notesData.sort((a, b) => {
        const timestampA = new Date(a.createdAt);
        const timestampB = new Date(b.createdAt);
        return timestampB - timestampA;
      })
    : "";

  const filteredNotes = sortedNotes
    ? sortedNotes.filter((item) =>
        item.title.toLowerCase().includes(ctx.query.toLowerCase())
      )
    : sortedNotes;

  return (
    <>
      <div>
        {filteredNotes.length > 0 ? (
          <>
            <ul className="notes">
              {filteredNotes.map((item) => (
                <Note key={item._id} item={item} />
              ))}
            </ul>
          </>
        ) : (
          <CenterDiv>
            <img
              style={{
                width: "20rem",
                opacity: "0.5",
                position: "absolute",
                zIndex: "-1",
              }}
              src={noDataImage}
              alt={noDataImage}
            />
            <Heading as="h2">No notes found in your collection.</Heading>
            <Link to={"/home/new"}>
              <Button type="createbtn">Create New</Button>
            </Link>
          </CenterDiv>
        )}
      </div>
    </>
  );
}

export default GetNotes;

export async function loader({ request, params }) {
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
