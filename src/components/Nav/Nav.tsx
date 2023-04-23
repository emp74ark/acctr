import {NavLink} from "react-router-dom";
import style from "./style.module.css";
import {useState} from "react";
import {navItems} from "./Nav.items";
import {useTranslation} from "react-i18next";
import {SettingsBar} from "../Settings";

export const Nav = () => {
  const {t} = useTranslation();
  const [burger, setBurger] = useState<boolean>(false);

  const onBurger = () => {
    setBurger(!burger)
  }

  return (
      <nav className={style.nav}>
        <ul>
          {navItems.map(({name, path}) =>
              <li key={name}><NavLink to={path}>{t(name)}</NavLink></li>
          )}
          <SettingsBar/>
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
                <li key={name}><NavLink to={path}>{t(name)}</NavLink></li>
            )}
          </ul>
          <SettingsBar/>
        </div>
        {burger && <div onClick={onBurger} className="shadow"/>}
      </nav>
  );
};
