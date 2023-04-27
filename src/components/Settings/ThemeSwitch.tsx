import style from "./style.module.css";
import {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {toggleTheme} from "../../store/settingsSlice";

export const ThemeSwitch = () => {
  const {theme} = useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch();

  const root = document.querySelector("body") as HTMLElement;
  const themeToggle = useCallback(() => {
    dispatch(toggleTheme(theme === "light" ? "dark" : "light"));
  }, [theme]);

  useEffect(() => {
    root.className = theme;
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
