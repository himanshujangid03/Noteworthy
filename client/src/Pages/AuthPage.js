import { Link } from "react-router-dom";
import "./AuthPage.css";
import { useContext, useState } from "react";
import AuthContext from "../utils/auth-context";
import Logo from "../assets/NoteWorthy-logos_black.png";

function AuthPage() {
  const ctx = useContext(AuthContext);

  useState(() => {}, [ctx]);
  return (
    <>
      <div className="AuthPage">
        <div className="AuthPage__info">
          <img src={Logo} alt={Logo} />
          <h1>
            Welcome to <strong>Noteworthy</strong>
          </h1>
          <p className="p-tagline">
            Discover a World of Note-Taking Convenience
          </p>

          <p className="p-get-started">Get Started</p>
          <div className="AuthPage__btns">
            {ctx.user ? (
              <Link to={"/home"}>
                <button>Go to Dashboard</button>
              </Link>
            ) : (
              <>
                <Link to={"/login"}>
                  <button>Login</button>
                </Link>
                <Link to={"/signup"}>
                  <button>Signup</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthPage;
