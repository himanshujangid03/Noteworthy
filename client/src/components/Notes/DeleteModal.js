import { Link, useNavigate} from "react-router-dom";
import { deleteNotesApi} from "../../utils/api";
import "./NewNote.css";
import Loader from "../../ui/Loader";
import { useState } from "react";
import "./DeleteModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Button from "../../ui/Button";
import ModalDiv from "../../ui/ModalDiv";

function EditNoteModal({ closeModal, item }) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const id = item._id;

    const response = await fetch(deleteNotesApi + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    setTimeout(() => {
      if (response.ok) {
        navigate("");
        closeModal(false);
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <>
      <div id="edit-modal" className="modal">
        <Link to={""}>
          <div className="overlay" onClick={() => closeModal(false)}></div>
        </Link>
        <div className="modal-content">
          <ModalDiv type="grid3">
            <div>
              <Link to={""}>
                <button
                  className="editModal__closebtn"
                  onClick={() => closeModal(false)}
                >
                  <FontAwesomeIcon icon={faX} />
                </button>
              </Link>
              <h3>Are you sure you want to delete this item?</h3>
              <p style={{ marginTop: "0.5rem" }}>
                This will permanently remove the selected item.
              </p>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button type="cancelbtn" onClick={() => closeModal(false)}>
                Cancel
              </Button>
              <form method="delete" onSubmit={submitHandler}>
                <Button type="deletebtn">
                  {isLoading ? <Loader /> : "Delete"}
                </Button>
              </form>
            </div>
          </ModalDiv>
        </div>
      </div>
    </>
  );
}

export default EditNoteModal;
