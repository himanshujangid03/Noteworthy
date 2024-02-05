import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { signupApi } from "../../../utils/api";

export const clientId =
  "322552807460-uome1uj2c3hcp77v8m4u2dqlq358e78d.apps.googleusercontent.com";

function GoogleSIgnIn() {
  const [credential, setCredential] = useState({});
  const submitHandler = async () => {
    const data = {
      name: credential.name,
      email: credential.email,
    };
    console.log(data);
    const res = await fetch(signupApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(res);
  };
  return (
    <div>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            setCredential(jwtDecode(credentialResponse.credential));
            submitHandler();
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </GoogleOAuthProvider>
      <h1>{credential.name}</h1>
    </div>
  );
}

export default GoogleSIgnIn;
