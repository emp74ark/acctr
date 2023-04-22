import style from "./style.module.css";
import { Nav } from "../Nav";
import { useNavigate } from "react-router-dom";
import {useCallback} from "react";
import {ThemeSwitch} from "../ThemeSwitch";

export const Header = () => {
  const navigate = useNavigate()

  const onLogo = useCallback(() => navigate("/"), [])
  return (
      <header className={style.header}>
        <h1 onClick={onLogo}>acctr</h1>
        <ThemeSwitch/>
        <Nav/>
      </header>
  );
};
