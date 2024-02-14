import { Form, Link, redirect, useNavigation } from "react-router-dom";
import "./form.css";
import { signupApi } from "../../utils/api";
import Loader from "../../ui/Loader";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Signup() {
  const [showPass, setShowPass] = useState(false);
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
            name="name"
            id="name"
            type="text"
            placeholder="Enter your email address"
            required
          />
          <input
            name="email"
            type="email"
            id="email"
            placeholder="Enter your email address"
            required
          />
          <div className="input-pass">
            <input
              name="password"
              id="password"
              type={`${showPass ? "text" : "password"}`}
              placeholder="Enter your password"
            />
            <span onClick={() => setShowPass((el) => !el)}>
              {showPass ? (
                <FontAwesomeIcon icon={faEye} size="lg" />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} size="lg" />
              )}
            </span>
          </div>
          <button className={`${isLogin ? "loading" : ""}`}>
            {isLogin ? <Loader /> : "Create my Account"}
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
    name: data.get("name"),
    email: data.get("email"),
    password: data.get("password"),
  };
  const response = await fetch("http://localhost:4000/user/signup", {
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
