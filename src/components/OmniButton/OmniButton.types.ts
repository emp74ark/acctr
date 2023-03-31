import { OmniActionType } from '../OmniBar/OmniBar.types';

export interface OmniButtonProps {
  type: OmniActionType;
  cb: () => void;
  disabled: boolean;

}
