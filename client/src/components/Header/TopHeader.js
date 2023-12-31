import { useContext, useEffect } from "react";
import "./TopHeader.css";
import AuthContext from "../../utils/auth-context";
import { useRouteLoaderData } from "react-router-dom";
import UserSvg from "../../ui/UserSvg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Theme from "../../ui/Theme";

function TopHeader() {
  const ctx = useContext(AuthContext);
  const data = useRouteLoaderData("loginData");

  useEffect(() => {
    if (data) {
      ctx.setUser(data);
    }
  }, [data]);

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
            <FontAwesomeIcon icon={faBars} color="white" size="2xl" />
          </button>
        </div>
        <div className="user-info">
          <Theme />
          <UserSvg />
          <p>Hello, {data && data.name}</p>
        </div>
      </div>
    </>
  );
}

export default TopHeader;
