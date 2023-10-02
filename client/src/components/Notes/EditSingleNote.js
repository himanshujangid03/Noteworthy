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
import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import IconOnlyButton from "../../ui/IconBtn";
import { AnimatePresence, motion } from "framer-motion";

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

      <motion.div
        layout
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.8 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.2 }}
      >
        <AnimatePresence>
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
                    type="editbtn"
                    responsive="isMobile"
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
                  type="deletebtn"
                  responsive="isMobile"
                >
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    style={iconStyle}
                    size="sm"
                  />
                  Delete
                </Button>

                <Link to={`${item._id}`}>
                  <IconOnlyButton
                    onClick={editNoteHandler}
                    type="editbtn"
                    responsive="isMobile"
                  >
                    <FontAwesomeIcon icon={faPenToSquare} size="sm" />
                  </IconOnlyButton>
                </Link>
                <IconOnlyButton
                  onClick={deleteNoteHandler}
                  type="deletebtn"
                  responsive="isMobile"
                >
                  <FontAwesomeIcon icon={faTrashCan} size="sm" />
                </IconOnlyButton>
              </li>
            </div>
          </div>
        </AnimatePresence>
      </motion.div>
    </>
  );
}

export default Note;
