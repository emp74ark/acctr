import {OmniActionType} from "../OmniBar/OmniBar.types";

export interface OmniHintProps {
  type: OmniActionType;
  cb: () => void;
}
