import {OmniHintProps} from "./OmniHint.types";
import style from "./style.module.css";
import {OmniActionType} from "../OmniBar/OmniBar.types";
import {useTranslation} from "react-i18next";

export const OmniHint = ({type, cb}: OmniHintProps) => {
  const {t} = useTranslation()
  return (
      <div className={`${style.hint} ${style[type]}`} onClick={cb}>
        {t(OmniActionType[type])}
      </div>
  );
};
