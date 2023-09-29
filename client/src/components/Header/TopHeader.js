import { useContext } from "react";
import "./TopHeader.css";
import AuthContext from "../../utils/auth-context";
import { Link } from "react-router-dom";
import UserSvg from "../../ui/UserSvg";

function TopHeader() {
  const ctx = useContext(AuthContext);
  const { name } = ctx.user;
  return (
    <>
      <div className="topheader">
        <div>
          <input
            type="text"
            placeholder="Search for your notes..."
            style={{ fontStyle: "italic" }}
          />
        </div>
        <div className="user-info">
          <UserSvg />
          <p>Hello, {name}</p>
        </div>
      </div>
    </>
  );
}

export default TopHeader;
