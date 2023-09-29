import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNoteSticky,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import "./Note.css";
import { useState } from "react";

import EditNoteModal from "./EditNoteModal";
import DeleteModal from "./DeleteModal";
import { Link, useSearchParams } from "react-router-dom";
import Button from "../../ui/Button";

const iconStyle = {
  margin: "0rem 1rem 0 0",
};

function Note({ item }) {
  const dateString = item.createdAt;
  const date = new Date(dateString);
  const [toggleEditModal, setToggleEditModal] = useState(false);
  const [toggleDeleteModal, setToggleDeleteModal] = useState(false);

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
    setToggleDeleteModal(true);
  };
  return (
    <>
      {toggleEditModal && (
        <EditNoteModal item={item} closeModal={setToggleEditModal} />
      )}
      {toggleDeleteModal && (
        <DeleteModal item={item} closeModal={setToggleDeleteModal} />
      )}

      <div className="edit-note">
        <div className="edit-note__div1">
          <li className="edit-note__title">
            <FontAwesomeIcon
              icon={faNoteSticky}
              size="xl"
              style={{ color: "#ffc800", margin: "0 1rem 0rem 0" }}
            />{" "}
            {item.title}
          </li>
          <li className="edit-note__date">{formatDate}</li>
          <li>
            <Link to={`${item._id}`}>
              <Button
                onClick={editNoteHandler}
                bg="#2c5191"
                darkbg="#2c5191"
                txt="white"
              >
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  style={iconStyle}
                  size="sm"
                />
                Edit
              </Button>
            </Link>

            <Button
              onClick={deleteNoteHandler}
              bg="#ae445a"
              darkbg="#813241"
              txt="white"
            >
              <FontAwesomeIcon icon={faTrashCan} style={iconStyle} size="sm" />
              Delete
            </Button>
          </li>
        </div>
      </div>
    </>
  );
}

export default Note;
