import {ThemeSwitch} from "./ThemeSwitch";
import {LanguageSwitch} from "./LanguageSwitch";
import style from './style.module.css'

export const SettingsBar = () => {
  return (
      <div className={style.settings}>
        <LanguageSwitch/>
        <ThemeSwitch/>
      </div>
  );
};
