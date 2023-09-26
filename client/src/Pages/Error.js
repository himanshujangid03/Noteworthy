import { Link } from "react-router-dom";
import "./Error.css";

function Error() {
  return (
    <>
      <div className="error__div">
        <div>
          <h3>404 Page not found!</h3>
          <p>
            <Link to={"/home"}>back to home page</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Error;
