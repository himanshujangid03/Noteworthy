import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faNoteSticky } from "@fortawesome/free-solid-svg-icons";
import "./Note.css";
import { useContext } from "react";
import AuthContext from "../../utils/auth-context";

const iconStyle = {
  cursor: "pointer",
  color: "white",
};

function Note({ item }) {
  const ctx = useContext(AuthContext);
  const dateString = item.createdAt;
  const date = new Date(dateString);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formatDate = date.toLocaleString("en-US", options);
  const addToFavouritesHandler = () => {
    const favorites = ctx.favorites.some((el) => {
      if (el._id === item._id) return true;
    });
    if (!favorites)
      ctx.setFavourites((el) => {
        return [...el, item];
      });
    localStorage.setItem("favourites", JSON.stringify(ctx.favorites));
  };

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
        <span onClick={addToFavouritesHandler}>
          <FontAwesomeIcon icon={faBookmark} style={iconStyle} />
        </span>
      </div>
      <li className="note__content">{item.content}</li>
      <li className="note__date">{formatDate}</li>
    </div>
  );
}

export default Note;
