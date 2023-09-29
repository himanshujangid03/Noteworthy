import ModalDiv from "../../ui/ModalDiv";
import "../../ui/Modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

function ErrorModal({ data }) {
  return (
    <div className="modal">
      <div className="overlay" style={{ backgroundColor: "#000" }}></div>
      <div className="modal-content">
        <ModalDiv>
          <div>
            <p className="error">
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                style={{ marginRight: "1rem" }}
                size="lg"
              />
              {data && data.message}
            </p>
          </div>
        </ModalDiv>
      </div>
    </div>
  );
}

export default ErrorModal;
