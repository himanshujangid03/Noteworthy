import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import ModalDiv from "../../ui/ModalDiv";

function NotAuthModal(props) {
  return (
    <div className="modal">
      <div className="overlay" style={{ backgroundColor: "#000" }}></div>
      <div className="modal-content">
        {" "}
        <ModalDiv type="grid2">
          <div>
            <Heading as={"h3"}>You are not logged In!</Heading>
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
