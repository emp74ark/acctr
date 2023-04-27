import {useCallback} from "react";
import style from "./style.module.css";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {toggleLanguage} from "../../store/settingsSlice";

export const LanguageSwitch = () => {
  const {language} = useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch();

  const languageToggle = useCallback(() => {
    dispatch(toggleLanguage(language === "en" ? "ru" : "en"));
  }, [language]);

  return (
      <div
          className={style.language}
          onClick={languageToggle}>
        <span>{language}</span>
      </div>
  );
};
