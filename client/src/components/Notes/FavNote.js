import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faNoteSticky } from "@fortawesome/free-solid-svg-icons";
import "./Note.css";
import { useContext, useEffect } from "react";
import AuthContext from "../../utils/auth-context";
import Button from "../../ui/Button";

function FavNote({ item }) {
  const ctx = useContext(AuthContext);
  const dateString = item.createdAt;
  const date = new Date(dateString);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formatDate = date.toLocaleString("en-US", options);

  const removeToFavouritesHandler = (id) => {
    const removedItem = ctx.favourites.filter((el) => el._id !== id);
    ctx.setFavourites(removedItem);
    localStorage.setItem("favourites", JSON.stringify(removedItem));
  };

  useEffect(() => {}, [ctx.favourites]);

  return (
    <div className="note">
      <div className="note__div1">
        <li className="note__title">
          <FontAwesomeIcon
            icon={faNoteSticky}
            size="xl"
            style={{ color: "#ffc800", margin: "0 1rem 0rem 0" }}
          />
          {item.title}
        </li>
        <Button
          onClick={() => removeToFavouritesHandler(item._id)}
          type="removeFavbtn"
        >
          <FontAwesomeIcon icon={faMinus} size="sm" />
        </Button>
      </div>
      <li className="note__content">{item.content}</li>
      <li className="note__date">{formatDate}</li>
    </div>
  );
}

export default FavNote;
