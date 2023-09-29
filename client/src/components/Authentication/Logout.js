import { Link, useNavigate } from "react-router-dom";
import Loader from "../../ui/Loader";
import "./Logout.css";
import Button from "../../ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { logoutApi } from "../../utils/api";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../utils/auth-context";
import ModalDiv from "../../ui/ModalDiv";

function Logout({ onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const ctx = useContext(AuthContext);
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
        ctx.setRefresh((el) => !el);
      }
    }, 1000);
  };

  return (
    <>
      <div className="modal">
        <div className="overlay" onClick={() => onClose(false)}></div>
        <div className="modal-content">
          <ModalDiv type="grid2">
            <div>
              <Link to={""}>
                <button
                  className="editModal__closebtn"
                  onClick={() => onClose(false)}
                >
                  <FontAwesomeIcon icon={faX} />
                </button>
              </Link>
              <h3>Are you sure you want to log out?</h3>
              <p>This will permanently remove the selected item.</p>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button type="cancelbtn" onClick={() => onClose(false)}>
                Cancel
              </Button>
              <form method="post" onSubmit={submitHandler}>
                <Button type="authbtn">
                  {isLoading ? <Loader /> : "Log Out"}
                </Button>
              </form>
            </div>
          </ModalDiv>
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
