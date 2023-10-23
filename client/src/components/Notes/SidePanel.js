import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faHouse,
  faNoteSticky,
  faPenToSquare,
  faPlus,
  faRightFromBracket,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import "./SidePanel.css";
import lightLogo from "../../assets/NoteWorthy-logos_black.png";
import darkLogo from "../../assets/NoteWorthy-logos_white.png";
import Logout from "../Authentication/Logout";
import { useContext, useState } from "react";
import AuthContext from "../../utils/auth-context";
import { motion } from "framer-motion";

function SidePanel() {
  const [toggleModal, setToggleModal] = useState(false);
  const ctx = useContext(AuthContext);
  const NavLinkClass = ({ isActive }) => {
    return isActive ? "active" : "";
  };

  function logoutbtnHandler() {
    ctx.setShowSidePanel(false);
    setToggleModal(true);
  }

  return (
    <>
      {toggleModal && <Logout onClose={setToggleModal} />}
      <motion.div
        layout
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className={`side-panel ${ctx.showSidePanel ? "offcanvas" : ""}`}>
          <button
            className="editModal__closebtn offcanvas-btn"
            onClick={() => ctx.setShowSidePanel(false)}
          >
            <FontAwesomeIcon icon={faX} />
          </button>
          <div className="side-panel__info">
            <img
              className="logo"
              src={`${ctx.mode ? darkLogo : lightLogo}`}
              alt={"noteworthy"}
            />
            <Link
              style={{ outline: "none" }}
              to={"/home/note"}
              onClick={() => ctx.setShowSidePanel(false)}
            >
              <button className="create-note-btn" animate={{ opacity: 1 }}>
                <FontAwesomeIcon
                  icon={faPlus}
                  style={{ marginRight: "1rem" }}
                />
                Create
              </button>
            </Link>
            <div className="hl"></div>
          </div>
          <div className="side-panel__navlinks">
            <NavLink
              className={NavLinkClass}
              to={"/home/"}
              onClick={() => ctx.setShowSidePanel(false)}
            >
              <p>
                <label>
                  <FontAwesomeIcon
                    icon={faHouse}
                    style={{ marginRight: "1rem" }}
                  />
                </label>
                Dashboard
              </p>
            </NavLink>

            <NavLink
              className={NavLinkClass}
              to={"/home/note/get-notes"}
              onClick={() => ctx.setShowSidePanel(false)}
            >
              <p>
                <label>
                  <FontAwesomeIcon
                    icon={faNoteSticky}
                    style={{ marginRight: "1rem" }}
                  />
                </label>
                All Notes
              </p>
            </NavLink>

            <NavLink
              className={NavLinkClass}
              to={"/home/note/edit"}
              onClick={() => ctx.setShowSidePanel(false)}
            >
              <p>
                <label>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    style={{ marginRight: "1rem" }}
                  />
                </label>
                Edit Notes
              </p>
            </NavLink>

            <NavLink
              className={NavLinkClass}
              to={"/home/note/fav"}
              onClick={() => ctx.setShowSidePanel(false)}
            >
              <p>
                <label>
                  <FontAwesomeIcon
                    icon={faBookmark}
                    style={{ marginRight: "1rem" }}
                  />
                </label>
                Favourites
              </p>
            </NavLink>

            <p className="log-out-btn" onClick={logoutbtnHandler}>
              <FontAwesomeIcon
                icon={faRightFromBracket}
                style={{ marginRight: "1rem" }}
              />
              Logout
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default SidePanel;
