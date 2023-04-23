import style from "./style.module.css";
import React from "react";
import {useTranslation} from "react-i18next";

export const OmniHelp = () => {
  const {t} = useTranslation()
  return (
      <div className={style.help}>
        <p>
          {t('omniHelpIdea')}
        </p>
        <p>
          {t('omniHelpMandatory')}
        </p>
        <p>
          {t('omniHelpAmount')}
        </p>
        <p>
          {t('omniHelpHotkey')}
        </p>
      </div>
  );
};
