import { Form, Link, useNavigation } from "react-router-dom";
import Loader from "../../ui/Loader";

function Logout() {
  const navigation = useNavigation();
  const isLogin = navigation.state === "submitting";
  return (
    <div className="form">
      <Link to={"/"}>
        <p>← back to home page</p>
      </Link>
      <Form>
        <button className={`${isLogin ? "loading" : ""}`}>
          {isLogin ? <Loader /> : "Submit"}
        </button>
      </Form>
    </div>
  );
}

export default Logout;
