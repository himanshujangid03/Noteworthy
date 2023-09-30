import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faNoteSticky } from "@fortawesome/free-solid-svg-icons";
import "./Note.css";
import { useContext } from "react";
import AuthContext from "../../utils/auth-context";

function Note({ item, removeFavourites }) {
  const ctx = useContext(AuthContext);
  const dateString = item.createdAt;
  const date = new Date(dateString);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formatDate = date.toLocaleString("en-US", options);
  const addToFavouritesHandler = (item) => {
    const noteItemId = ctx.favourites.some((el) => {
      if (el._id === item._id) return true;
      else return false;
    });
    if (!noteItemId) {
      ctx.setFavourites((el) => {
        return [...el, item];
      });
    } else {
      alert("This note is already to favourites!");
    }
    localStorage.setItem("favourites", JSON.stringify(ctx.favourites));
  };

  function favouritesNotesHandler(item) {
    addToFavouritesHandler(item);
    removeFavourites(item);
  }

  return (
    <div className="note">
      <div className="note__div1">
        <li className="note__title">
          <FontAwesomeIcon
            icon={faNoteSticky}
            size="xl"
            style={{ color: "#ffc800", margin: "0 1rem 0rem 0" }}
          />{" "}
          {item.title}
        </li>
        <span
          onClick={() => favouritesNotesHandler(item)}
          type="favbtn"
          responsive="isMobile"
        >
          <FontAwesomeIcon icon={faBookmark} size="lg" />
        </span>
      </div>
      <li className="note__content">{item.content}</li>
      <li className="note__date">{formatDate}</li>
    </div>
  );
}

export default Note;
