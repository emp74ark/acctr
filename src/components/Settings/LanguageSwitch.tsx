import {useCallback, useState} from "react";
import i18n from "../../i18n";
import style from './style.module.css'

export const LanguageSwitch = () => {
  const [language, setLanguage] = useState<string>('en');

  const languageToggle = useCallback(() => {
    setLanguage(language === 'en' ? 'ru' : 'en')
    i18n.changeLanguage(language)
  }, [language, i18n])

  return (
      <div
          className={style.language}
          onClick={languageToggle}>
        <span>{language}</span>
      </div>
  );
};
