import { OmniButtonProps } from './OmniButton.types';
import { OmniActionType } from '../OmniBar/OmniBar.types';
import style from './style.module.css'

export const OmniButton = ({ type }: OmniButtonProps) => {
  return (
      <button className={style.omniButton}>
        { OmniActionType[type] }
      </button>
  );
};
