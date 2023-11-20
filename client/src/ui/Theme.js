import { useContext, useEffect } from "react";
import Button from "./Button";
import AuthContext from "../utils/auth-context";
import lightMode from "../assets/light_mode.svg";
import darkMode from "../assets/dark_mode.svg";

function Theme() {
  const IsMobile = window.matchMedia("(max-width: 500px)");
  if (IsMobile.matches) {
    document.documentElement.classList.remove("dark-mode");
  }
  const ctx = useContext(AuthContext);

  localStorage.setItem("theme", "light");

  const changeThemeHandler = () => {
    ctx.setMode((el) => !el);
    if (ctx.mode) {
      localStorage.setItem("theme", "dark");
    }
  };

  useEffect(() => {
    if (ctx.mode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  }, [ctx.mode]);
  return (
    <div>
      <Button
        type="themeBtn"
        onClick={changeThemeHandler}
        style={{ marginRight: "2rem" }}
      >
        <span class="material-symbols-outlined">
          {ctx.mode ? "light_mode" : "dark_mode"}
        </span>
      </Button>
    </div>
  );
}

export default Theme;
