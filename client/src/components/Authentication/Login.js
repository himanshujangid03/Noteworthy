import { Form, Link, redirect } from "react-router-dom";
import "./form.css";
import { loginApi } from "../../utils/api";

function Login() {
  return (
    <div className="form">
      <Link to={"/"}>
        <p>← back to home page</p>
      </Link>
      <div>
        <Form method="post">
          <h1>Login to your account</h1>
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
          <button>Submit</button>
          <p>
            Don't have an account! <Link to={"/signup"}>Signup</Link>
          </p>
        </Form>
      </div>
    </div>
  );
}

export default Login;

export async function action({ res, request, params }) {
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

  return redirect("/");
}
