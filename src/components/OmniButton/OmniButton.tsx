import {OmniButtonProps} from "./OmniButton.types";
import {OmniActionType} from "../OmniBar/OmniBar.types";
import style from "./style.module.css";
import {useTranslation} from "react-i18next";

export const OmniButton = ({type, cb, disabled}: OmniButtonProps) => {
  const {t} = useTranslation();
  return (
      <button className={style.omniButton} onClick={cb} disabled={disabled}>
        {t(OmniActionType[type])}
      </button>
  );
};
