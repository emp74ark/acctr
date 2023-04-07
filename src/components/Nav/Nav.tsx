import { NavLink } from "react-router-dom";
import style from "./style.module.css"

export const Nav = () => {
  return (
      <nav className={style.nav}>
        <ul>
          <li><NavLink to="/">home</NavLink></li>
          <li><NavLink to="/records">records</NavLink></li>
          <li><NavLink to="/statistics">statistics</NavLink></li>
        </ul>
      </nav>
  );
};
