import { Link, useNavigate } from "react-router-dom";
import { editNotesApi } from "../../utils/api";
import "./NewNote.css";
import Loader from "../../ui/Loader";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Button from "../../ui/Button";

function EditNoteModal({ closeModal, item }) {
  const [title, setTitle] = useState(item.title);
  const [content, setContent] = useState(item.content);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
          <div className="new-note editModal">
            <Link to={""}>
              <button
                className="editModal__closebtn"
                onClick={() => closeModal(false)}
              >
                <FontAwesomeIcon icon={faX} />
              </button>
            </Link>
            <form method="patch" onSubmit={submitHandler}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                type="text"
                rows={"13"}
                name="content"
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <Button
                style={{ margin: "1rem", padding: "0.8rem" }}
                type="editbtn"
              >
                {isLoading ? <Loader /> : "Save"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditNoteModal;
