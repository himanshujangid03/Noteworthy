import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faNoteSticky } from "@fortawesome/free-solid-svg-icons";
import "./Note.css";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../utils/auth-context";
import { AnimatePresence, motion } from "framer-motion";

function Note({ item, removeFavourites }) {
  const ctx = useContext(AuthContext);
  const [addedToFav, setAddedToFav] = useState("");
  const color = addedToFav;
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
        setAddedToFav("#3866ff");
        setTimeout(() => {
          setAddedToFav("");
        }, 1000);
        return [...el, item];
      });
    } else {
      alert("This note is already to favourites!");
    }
  };

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(ctx.favourites));
  }, [ctx.favourites]);

  return (
    <motion.div
      layout
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.8 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.2 }}
    >
      <AnimatePresence>
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

            <motion.div
              initial={{ scale: 1 }}
              whileHover={{
                transition: { type: "spring", stiffness: 500 },
                scale: 1.1,
              }}
              style={{ cursor: "pointer" }}
              onClick={() => addToFavouritesHandler(item)}
            >
              <FontAwesomeIcon icon={faBookmark} size="lg" color={color} />
            </motion.div>
          </div>
          <li className="note__content">{item.content}</li>
          <li className="note__date">{formatDate}</li>
        </div>
      </AnimatePresence>
    </motion.div>
  );
}

export default Note;
