import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faHouse,
  faNoteSticky,
  faPenToSquare,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import "./SidePanel.css";
import Logo from "../../assets/NoteWorthy-logos_black.png";

function SidePanel() {
  const NavLinkClass = ({ isActive }) => {
    return isActive ? "active" : "";
  };
  return (
    <div className="side-panel">
      <div className="side-panel__info">
        <img className="logo" src={Logo} alt={Logo} />

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
        <NavLink className={`${NavLinkClass} logout`} to={"/login"}>
          <p>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              style={{ marginRight: "1rem" }}
            />
            Log out
          </p>
        </NavLink>
      </div>
    </div>
  );
}

export default SidePanel;
