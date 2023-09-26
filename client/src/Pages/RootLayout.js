import { Outlet } from "react-router-dom";
import AuthPage from "./AuthPage";

function RootLayout() {
  const token = localStorage.getItem("token");
  return (
    <>
      {!token && <AuthPage />}
      <Outlet />
    </>
  );
}

export default RootLayout;
