import { useRouteLoaderData } from "react-router-dom";
import "./EditNote.css";
import { useContext, useEffect, useState } from "react";
import Note from "./Note";
import AuthContext from "../../utils/auth-context";

function Favourites() {
  const ctx = useContext(AuthContext);
  const localNotesData = JSON.parse(localStorage.getItem("favourites"));
  console.log(localNotesData);

  const sortedNotes = localNotesData.sort((a, b) => {
    const timestampA = new Date(a.createdAt);
    const timestampB = new Date(b.createdAt);
    return timestampB - timestampA;
  });
  const localData = localStorage.getItem("favourites");

  const removeToFavouritesHandler = (id) => {
    ctx.setFavourites((item) => item.filter((el) => el._id !== id));
  };

  return (
    <>
      <div>
        {sortedNotes.length > 0 ? (
          <>
            <ul className="notes">
              {sortedNotes.map((item) => (
                <Note
                  key={item._id}
                  item={item}
                  removeFavourites={removeToFavouritesHandler}
                />
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
