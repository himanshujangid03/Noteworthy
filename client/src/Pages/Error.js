import { Link } from "react-router-dom";
import "./Error.css";
import Heading from "../ui/Heading";

function Error() {
  return (
    <>
      <div className="error__div">
        <div>
          <Heading as={"h1"} style={{ color: "white" }}>
            404 Page not found!
          </Heading>
          <p>
            <Link to={"/home"} style={{ color: "white" }}>
              back to home page
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Error;
