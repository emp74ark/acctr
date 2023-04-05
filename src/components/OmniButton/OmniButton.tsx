import { OmniButtonProps } from "./OmniButton.types";
import { OmniActionType } from "../OmniBar/OmniBar.types";
import style from "./style.module.css";

export const OmniButton = ({ type, cb, disabled }: OmniButtonProps) => {
    return (
            <button className={style.omniButton} onClick={cb} disabled={disabled}>
                {OmniActionType[type]}
            </button>
    );
};
