import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import ModalDiv from "../../ui/ModalDiv";

function NotAuthModal(props) {
  return (
    <div className="modal">
      <div className="overlay" style={{ backgroundColor: "#000" }}></div>
      <div className="modal-content">
        <ModalDiv type="grid2">
          <div>
            <h3
              style={{
                color: "#000",
                fontSize: "2.3rem",
                fontFamily: "Montserrat",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              You are not logged In!
            </h3>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link to={"/login"}>
              <Button type="authbtn">Login</Button>
            </Link>
          </div>
        </ModalDiv>
      </div>
    </div>
  );
}

export default NotAuthModal;
