import { Link, useNavigate } from "react-router-dom";
import { editNotesApi } from "../../utils/api";
import "./NewNote.css";
import Loader from "../../ui/Loader";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Button from "../../ui/Button";
import { AnimatePresence, motion } from "framer-motion";
import AuthContext from "../../utils/auth-context";

function EditNoteModal({ closeModal, item }) {
  const [title, setTitle] = useState(item.title);
  const [content, setContent] = useState(item.content);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const noteData = {
      title: title,
      content: content,
    };
    const id = item._id;

    const response = await fetch(editNotesApi + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(noteData),
    });
    if (!response.ok) {
      return response;
    }
    setTimeout(() => {
      if (response.ok) {
        navigate("/home/note/edit");
        closeModal(false);
        setIsLoading(false);
        setTimeout(() => {
          ctx.setMessageModal(true);
        }, 1000);
        setTimeout(() => {
          ctx.setMessageModal(false);
        }, 3000);
      }
    }, 1000);
  };

  return (
    <>
      <div id="edit-modal" className="modal">
        <Link to={""}>
          <div className="overlay" onClick={() => closeModal(false)}></div>
        </Link>
        <div className="modal-content">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className=" editModal"
            >
              <Link to={""}>
                <button
                  className="editModal__closebtn"
                  onClick={() => closeModal(false)}
                >
                  <FontAwesomeIcon icon={faX} />
                </button>
              </Link>
              <form method="patch" onSubmit={submitHandler}>
                <label>Title :</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <label>Content :</label>
                <textarea
                  type="text"
                  rows={"13"}
                  name="content"
                  placeholder="Content"
                  value={content}
                  style={{ resize: "vertical" }}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
                <Button
                  style={{
                    marginTop: "1rem",
                    padding: "0.8rem",
                    width: "10rem",
                  }}
                  type="editbtn"
                >
                  {isLoading ? <Loader /> : "Save"}
                </Button>
              </form>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

export default EditNoteModal;
