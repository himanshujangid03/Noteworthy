import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "./Note.css";
import { useContext, useState } from "react";
import AuthContext from "../../utils/auth-context";
import Modal from "../../ui/Modal";
import EditNoteModal from "./EditNoteModal";
import { Link } from "react-router-dom";

const iconStyle = {
  margin: "0rem 1rem 0 0",
};

function Note({ item }) {
  const dateString = item.createdAt;
  const date = new Date(dateString);
  const [toggleEditModal, setToggleEditModal] = useState(false);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formatDate = date.toLocaleString("en-US", options);

  const editNoteHandler = () => {
    setToggleEditModal(true);
  };
  const deleteNoteHandler = () => {
    setToggleEditModal(true);
  };
  return (
    <>
      {toggleEditModal && (
        <EditNoteModal item={item} closeModal={setToggleEditModal} />
      )}
      <div className="edit-note">
        <div className="edit-note__div1">
          <li className="edit-note__title">🌟 {item.title}</li>
          <li className="edit-note__date">{formatDate}</li>
          <li>
            <Link to={`${item._id}`}>
              <button className="edit-note__editbtn" onClick={editNoteHandler}>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  style={iconStyle}
                  size="sm"
                />
                Edit
              </button>
            </Link>

            <button
              className="edit-note__deletebtn"
              onClick={deleteNoteHandler}
            >
              <FontAwesomeIcon icon={faTrashCan} style={iconStyle} size="sm" />
              Delete
            </button>
          </li>
        </div>
      </div>
    </>
  );
}

export default Note;
