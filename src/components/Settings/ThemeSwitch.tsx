import style from "./style.module.css";
import {useCallback, useEffect, useState} from "react";

export const ThemeSwitch = () => {
  const [theme, setTheme] = useState<string>("light");

  const root = document.querySelector("body") as HTMLElement;
  const themeToggle = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme]);

  useEffect(() => {
    root.className = theme
  }, [theme]);

  const iconStyle = () => {
    return theme === "light"
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