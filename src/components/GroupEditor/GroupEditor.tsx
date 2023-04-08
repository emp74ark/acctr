import { ChangeEvent, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { addGroup, editGroup } from "../../store/groupsSlice";
import { GroupEditorProps } from "./GroupEditor.types";

export const GroupEditor = ({ group, cancel, type }: GroupEditorProps) => {
  const [name, setName] = useState<string>(group.name);
  const [tags, setTags] = useState<string[]>(group?.tags ? group.tags : []);
  const dispatch = useDispatch();

  const onName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value.trim());
  }, []);

  const onTags = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTags(e.currentTarget.value.split(", "));
  }, []);

  const onSave = useCallback(() => {
    const newData = { ...group, name, tags };
    switch (type) {
      case "add":
        dispatch(addGroup(newData));
        break;
      case "edit":
        dispatch(editGroup(newData));
        break;
    }
    setName("");
    setTags([]);
    cancel();
  }, [group, name, tags, type, dispatch, cancel]);

  const onCancel = useCallback(() => cancel(), [cancel]);

  return (
      <div className="shadow">
        <div className="modal">
          <label>Group name
            <input
                type="text"
                defaultValue={name}
                onChange={onName}
            />
          </label>
          <label>Tags
            <input
                type="text"
                defaultValue={tags.join(", ")}
                onChange={onTags}
            />
          </label>
          <div className="buttons">
            <button
                className="btn btn__large btn__primary"
                disabled={!name}
                onClick={onSave}>
              Save
            </button>
            <button
                className="btn btn__large btn__secondary"
                onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
  );
};
