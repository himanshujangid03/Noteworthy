import { Form, Link, redirect } from "react-router-dom";
import "./form.css";
import { signupApi } from "../../utils/api";

function Signup() {
  return (
    <div className="form">
      <Link to={"/"}>
        <p>← back to home page</p>
      </Link>
      <div>
        <Form method="post">
          <h1>Create a new account</h1>
          <input name="name" type="text" placeholder="Enter your name" />
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
    name: data.get("name"),
    email: data.get("email"),
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
