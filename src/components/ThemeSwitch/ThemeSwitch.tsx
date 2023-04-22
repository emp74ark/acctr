import style from "./style.module.css";
import {useState} from "react";

export const ThemeSwitch = () => {
  const [theme, setTheme] = useState<string>("light");

  const themeToggle = () => {
    const root = document.querySelector("body") as HTMLElement;
    setTheme(theme === "light" ? "dark" : "light");
    root.className = theme;
  };

  const iconStyle = () => {
    return theme === "dark"
        ? `${style.theme} ${style.theme_rotate}`
        : style.theme;
  };

  return (
      <div
          className={iconStyle()}
          onClick={themeToggle}
      >
        <div className={style.theme__light}></div>
        <div className={style.theme__dark}></div>
      </div>
  );
};
