import { Form, Link, redirect, useNavigation } from "react-router-dom";
import "./form.css";
import { signupApi } from "../../utils/api";
import Loader from "../../ui/Loader";

function Signup() {
  const navigation = useNavigation();
  const isLogin = navigation.state === "submitting";
  return (
    <div className="form">
      <Link to={"/"}>
        <p>← back to home page</p>
      </Link>
      <div>
        <Form method="post">
          <h1>Create a new account</h1>
          <input
            name="username"
            type="email"
            placeholder="Enter your email address"
          />
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
          />
          <button className={`${isLogin ? "loading" : ""}`}>
            {isLogin ? <Loader /> : "Create my account"}
          </button>
          <p>
            Already have an account! <Link to={"/login"}>Login</Link>
          </p>
        </Form>
      </div>
    </div>
  );
}

export default Signup;

export async function action({ request, params }) {
  const data = await request.formData();

  const userData = {
    username: data.get("username"),
    password: data.get("password"),
  };
  const response = await fetch(signupApi, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    return response;
  }

  return redirect("/login");
}
