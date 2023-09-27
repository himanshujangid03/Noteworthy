import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import "./Note.css";

const iconStyle = {
  cursor: "pointer",
  color: "white",
};

function Note({ item }) {
  const dateString = item.createdAt;
  const date = new Date(dateString);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    //hour: "2-digit",
    //minute: "2-digit",
  };
  const formatDate = date.toLocaleString("en-US", options);
  return (
    <div className="note">
      <div className="note__div1">
        <li className="note__title">🌟 {item.title}</li>
        <span>
          <FontAwesomeIcon icon={faBookmark} style={iconStyle} />
        </span>
      </div>
      <li className="note__content">{item.content}</li>
      <li className="note__date">{formatDate}</li>
    </div>
  );
}

export default Note;
