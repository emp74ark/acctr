import { OmniHintProps } from './OmniHint.types';
import style from './style.module.css'
import { OmniActionType } from '../OmniBar/OmniBar.types';

export const OmniHint = ({ type }: OmniHintProps) => {
  return (
      <div className={ `${ style.hint } ${ style[type] }` }>
        { OmniActionType[type] }
      </div>
  );
};
