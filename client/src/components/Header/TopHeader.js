import { useContext } from "react";
import "./TopHeader.css";
import AuthContext from "../../utils/auth-context";

function TopHeader() {
  const ctx = useContext(AuthContext);
  console.log(ctx.user);
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
          <button>Add New</button>
        </div>
        <div>
          <p>Hello, {ctx.user ? name.split(" ")[0] : ""}</p>
        </div>
      </div>
    </>
  );
}

export default TopHeader;
