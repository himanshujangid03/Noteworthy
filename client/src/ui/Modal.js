import { useContext } from "react";
import "./Modal.css";
import AuthContext from "../utils/auth-context";

function Modal(props) {
  const ctx = useContext(AuthContext);

  if (ctx.toggleModal) {
    return null;
  }
  return (
    <div className="modal">
      <div className="overlay" onClick={() => ctx.setToggleModal(true)}></div>
      <div className="modal-content">asdlkvjnwero</div>
    </div>
  );
}

export default Modal;
