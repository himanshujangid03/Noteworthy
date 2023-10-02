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
import Logo from "../../assets/NoteWorthy-logos_black.png";
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
            <img className="logo" src={Logo} alt={Logo} />
            <Link to={"/home/note"} onClick={() => ctx.setShowSidePanel(false)}>
              <motion.button
                className="create-note-btn"
                animate={{ opacity: 1 }}
              >
                <FontAwesomeIcon
                  icon={faPlus}
                  style={{ marginRight: "1rem" }}
                />
                Create
              </motion.button>
            </Link>
            <div className="hl"></div>
          </div>
          <div className="side-panel__navlinks">
            <motion.ul
              layout
              animate={{ opacity: 1, translateX: 0 }}
              initial={{ opacity: 0, translateY: -10 }}
              transition={{ delay: 0.2 }}
              style={{ listStyle: "none", padding: 0 }}
            >
              <motion.li>
                <NavLink
                  className={NavLinkClass}
                  to={"/home/"}
                  onClick={() => ctx.setShowSidePanel(false)}
                >
                  <p>
                    <FontAwesomeIcon
                      icon={faHouse}
                      style={{ marginRight: "1rem" }}
                    />
                    Dashboard
                  </p>
                </NavLink>
              </motion.li>
              <motion.li>
                <NavLink
                  className={NavLinkClass}
                  to={"/home/note/get-notes"}
                  onClick={() => ctx.setShowSidePanel(false)}
                >
                  <p>
                    <FontAwesomeIcon
                      icon={faNoteSticky}
                      style={{ marginRight: "1rem" }}
                    />
                    All Notes
                  </p>
                </NavLink>
              </motion.li>
              <motion.li>
                <NavLink
                  className={NavLinkClass}
                  to={"/home/note/edit"}
                  onClick={() => ctx.setShowSidePanel(false)}
                >
                  <p>
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      style={{ marginRight: "1rem" }}
                    />
                    Edit Notes
                  </p>
                </NavLink>
              </motion.li>
              <motion.li>
                <NavLink
                  className={NavLinkClass}
                  to={"/home/note/fav"}
                  onClick={() => ctx.setShowSidePanel(false)}
                >
                  <p>
                    <FontAwesomeIcon
                      icon={faBookmark}
                      style={{ marginRight: "1rem" }}
                    />
                    Favourites
                  </p>
                </NavLink>
              </motion.li>
              <motion.li>
                <p className="log-out-btn" onClick={logoutbtnHandler}>
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    style={{ marginRight: "1rem" }}
                  />
                  Logout
                </p>
              </motion.li>
            </motion.ul>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default SidePanel;
