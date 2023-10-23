import { useNavigate } from "react-router-dom";
import Loader from "../../ui/Loader";
import "./Logout.css";
import Button from "../../ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { logoutApi } from "../../utils/api";
import ModalDiv from "../../ui/ModalDiv";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Logout({ onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch(logoutApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    setTimeout(() => {
      if (response.ok) {
        navigate("/");
        onClose(false);
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <>
      <div className="modal">
        <div className="overlay" onClick={() => onClose(false)}></div>
        <div className="modal-content">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="logout_modal"
            >
              <ModalDiv type="grid2">
                <div>
                  <button
                    className="editModal__closebtn"
                    onClick={() => onClose(false)}
                  >
                    <FontAwesomeIcon icon={faX} />
                  </button>
                  <h3>Are you sure you want to log out?</h3>
                  <p>This will permanently remove the selected item.</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "baseline",
                  }}
                >
                  <Button type="cancelbtn" onClick={() => onClose(false)}>
                    Cancel
                  </Button>
                  <form method="post" onSubmit={submitHandler}>
                    <Button
                      className={`${isLoading ? "loading" : ""}`}
                      style={{ cursor: `${isLoading ? "not-allowed" : ""}` }}
                      type="authbtn"
                    >
                      {isLoading ? "processing..." : "Log Out"}
                    </Button>
                  </form>
                </div>
              </ModalDiv>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

export default Logout;

export async function logoutLoader({ request, params }) {
  const response = await fetch(logoutApi, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return response;
  }
}
