import { Outlet } from "react-router-dom";
import AuthPage from "./AuthPage";

function RootLayout() {
  return (
    <>
      <AuthPage />
      <Outlet />
    </>
  );
}

export default RootLayout;
