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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const navigation = useNavigation();
  const isLogin = navigation.state === "submitting";
  const data = useActionData();

  return (
    <div className="form">
      <>
        <Link to={"/"}>
          <p>← back to home page</p>
        </Link>
        <div>
          <Form method="post">
            <h1>Login to your account</h1>
            {data && (
              <p className="error">
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                  style={{ marginRight: "1rem" }}
                  size="lg"
                />
                {data && data.message}
              </p>
            )}
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
  console.log(response);

  if (!response.ok) {
    return response;
  }
  return redirect("/home");
}
