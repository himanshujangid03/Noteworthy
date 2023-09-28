import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faHouse,
  faNoteSticky,
  faPenToSquare,
  faPlus,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import "./SidePanel.css";
import Logo from "../../assets/NoteWorthy-logos_black.png";
import Modal from "../../ui/Modal";
import { useContext } from "react";
import AuthContext from "../../utils/auth-context";
import Logout from "../Authentication/Logout";

function SidePanel() {
  const ctx = useContext(AuthContext);
  const NavLinkClass = ({ isActive }) => {
    return isActive ? "active" : "";
  };

  const logOutHandler = () => {
    ctx.setToggleModal(true);
  };

  return (
    <>
      <Modal>
        <Logout />
      </Modal>
      <div className="side-panel">
        <div className="side-panel__info">
          <img className="logo" src={Logo} alt={Logo} />
          <Link to={"/home/new"}>
            <button className="create-note-btn">
              <FontAwesomeIcon icon={faPlus} style={{ marginRight: "1rem" }} />
              Create
            </button>
          </Link>
          <div className="hl"></div>
        </div>
        <div className="side-panel__navlinks">
          <NavLink className={NavLinkClass} to={"/home/"}>
            <p>
              <FontAwesomeIcon icon={faHouse} style={{ marginRight: "1rem" }} />
              Dashboard
            </p>
          </NavLink>
          <NavLink className={NavLinkClass} to={"/home/get-notes"}>
            <p>
              <FontAwesomeIcon
                icon={faNoteSticky}
                style={{ marginRight: "1rem" }}
              />
              All Notes
            </p>
          </NavLink>

          <NavLink className={NavLinkClass} to={"/home/edit"}>
            <p>
              <FontAwesomeIcon
                icon={faPenToSquare}
                style={{ marginRight: "1rem" }}
              />
              Edit Notes
            </p>
          </NavLink>
          <NavLink className={NavLinkClass} to={"/home/fav"}>
            <p>
              <FontAwesomeIcon
                icon={faBookmark}
                style={{ marginRight: "1rem" }}
              />
              Favourites
            </p>
          </NavLink>
          <p className="log-out-btn" onClick={logOutHandler}>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              style={{ marginRight: "1rem" }}
            />
            Logout
          </p>
        </div>
      </div>
    </>
  );
}

export default SidePanel;
