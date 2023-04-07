import { IGroup } from "../../entities";

export interface GroupEditorProps {
  group: IGroup;
  type: "add" | "edit";
  cancel: () => void;
}
