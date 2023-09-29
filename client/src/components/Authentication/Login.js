import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import "./form.css";
import { loginApi } from "../../utils/api";
import Loader from "../../ui/Loader";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../utils/auth-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import ModalDiv from "../../ui/ModalDiv";

function Login() {
  const navigation = useNavigation();
  const isLogin = navigation.state === "submitting";
  const [error, setError] = useState(false);
  const data = useActionData();

  const setErrorHandler = () => {
    if (data) {
      setError(true);
      ctx.setRefresh(true);
    }
  };

  useEffect(() => {
    setErrorHandler();
    setTimeout(() => {
      setError(false);
      ctx.setRefresh(true);
    }, 1000);
  }, [isLogin]);

  const ctx = useContext(AuthContext);

  return (
    <div className="form">
      <>
        <Link to={"/"}>
          <p>← back to home page</p>
        </Link>
        <div>
          <Form method="post">
            <h1>Login to your account</h1>
            {error && <ModalDiv data={data} />}
            <input
              name="email"
              type="email"
              placeholder="Enter your email address"
            />
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
            />
            <button className={`${isLogin ? "loading" : ""}`}>
              {isLogin ? <Loader /> : "Submit"}
            </button>
            <p>
              Don't have an account! <Link to={"/signup"}>Signup</Link>
            </p>
          </Form>
        </div>
      </>
    </div>
  );
}

export default Login;

export async function action({ request, params }) {
  const data = await request.formData();

  const userData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch(loginApi, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
    credentials: "include",
  });

  if (!response.ok) {
    return response;
  }
  return redirect("/home");
}
