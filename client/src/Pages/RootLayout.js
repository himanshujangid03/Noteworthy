import { Outlet } from "react-router-dom";
import AuthPage from "./AuthPage";
import { usernameApi } from "../utils/api";

function RootLayout() {
  return (
    <>
      <AuthPage />
      <Outlet />
    </>
  );
}

export default RootLayout;

export async function userLoader({ request, params }) {
  const response = await fetch(usernameApi, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok) {
    return response;
  }
  const resData = await response.json();

  return resData;
}
