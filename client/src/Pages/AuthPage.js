import { Link } from "react-router-dom";
import "./AuthPage.css";

function AuthPage() {
  return (
    <>
      <div className="AuthPage">
        <div>
          <h1>
            Welcome to <strong>Noteworthy</strong> Notes
          </h1>
          <p>Discover a World of Note-Taking Convenience</p>

          <p className="get-started">Get Started</p>
          <div>
            <Link to={"/login"}>
              <button>Login</button>
            </Link>
            <Link to={"/signup"}>
              <button>Signup</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthPage;
