import { useContext, useEffect } from "react";
import "./TopHeader.css";
import AuthContext from "../../utils/auth-context";
import { Link, useRouteLoaderData } from "react-router-dom";
import UserSvg from "../../ui/UserSvg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function TopHeader() {
  const ctx = useContext(AuthContext);
  const data = useRouteLoaderData("loginData");

  return (
    <>
      <div className="topheader">
        <div>
          <input
            type="text"
            placeholder="Search for your notes..."
            value={ctx.query}
            onChange={(e) => ctx.setQuery(e.target.value)}
          />
          <button
            className="offcanvas-btn"
            onClick={() => ctx.setShowSidePanel((el) => !el)}
          >
            <FontAwesomeIcon icon={faBars} size="xl" />
          </button>
        </div>
        <div className="user-info">
          <UserSvg />
          <p>Hello, {data && data.name}</p>
        </div>
      </div>
    </>
  );
}

export default TopHeader;
