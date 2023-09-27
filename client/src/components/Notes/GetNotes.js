import { Await, useRouteLoaderData } from "react-router-dom";
import { getNotesApi } from "../../utils/api";
import { Suspense, useEffect, useState } from "react";
import Note from "./Note";
import Loader from "../../ui/Loader";
import "./GetNote.css";

function GetNotes() {
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
      <Suspense fallback={<Loader />}>
        <Await>
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
                Either you are not logged In or You did not create notes till
                now!
              </p>
            )}
          </div>
        </Await>
      </Suspense>
    </>
  );
}

export default GetNotes;

export async function loader({ request, params }) {
  const response = await fetch(getNotesApi, {
    method: "GET",
    credentials: "include",
  });
  const resData = await response.json();
  return resData;
}
