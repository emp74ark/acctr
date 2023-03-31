import { OmniHintProps } from './OmniHint.types';
import style from './style.module.css';
import { OmniActionType } from '../OmniBar/OmniBar.types';

export const OmniHint = ({ type, cb }: OmniHintProps) => {
  return (
      <div className={ `${ style.hint } ${ style[type] }` } onClick={ cb }>
        { OmniActionType[type] }
      </div>
  );
};
