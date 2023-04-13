import {NavLink} from "react-router-dom";
import style from "./style.module.css";
import {useState} from "react";
import {navItems} from "./Nav.items";

export const Nav = () => {
  const [burger, setBurger] = useState<boolean>(false);

  const onBurger = () => {
    setBurger(!burger)
  }

  return (
      <nav className={style.nav}>
        <ul>
          {navItems.map(({name, path}) =>
              <li key={name}><NavLink to={path}>{name}</NavLink></li>
          )}
        </ul>
        <div
            onClick={onBurger}
            className={burger ? `${style.burger} ${style.burger_active}` : `${style.burger}`}>
          <div className={style.burger__line}></div>
          <div className={style.burger__line}></div>
          <div className={style.burger__line}></div>
        </div>
        <div
            onClick={onBurger}
            className={burger ? `${style.mobile__nav} ${style.mobile__nav_active}` : `${style.mobile__nav}`}>
          <ul>
            {navItems.map(({name, path}) =>
                <li key={name}><NavLink to={path}>{name}</NavLink></li>
            )}
          </ul>
        </div>
        {burger && <div onClick={onBurger} className="shadow"/>}
      </nav>
  );
};
