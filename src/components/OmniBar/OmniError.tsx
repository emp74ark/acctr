import style from "./style.module.css";
import {useTranslation} from "react-i18next";

export const OmniError = ({error}: { error?: Record<string, string> }) => {
  const {t} = useTranslation();
  return (
      <div className={style.error}>
        <span>{t(error?.amount ?? "")}</span>
        <span>{t(error?.label ?? "")}</span>
      </div>
  );
};
