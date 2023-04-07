import style from "./style.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useCallback, useState } from "react";
import { Group, GroupEditor, TagsList } from "../../components";

export const Statistics = () => {
  const { records: { records }, groups: { groups } } = useSelector((state: RootState) => state);
  const [current, setCurrent] = useState<string>();

  const openAddGroupModal = useCallback(() => setCurrent("New group"), []);

  const closeAddGroupModal = useCallback(() => setCurrent(undefined), []);

  return (
      <>
        <h2>Statistics</h2>
        <div className={style.page__wrapper}>
          <div>
            <h3>Groups</h3>
            <button onClick={openAddGroupModal}>Add group</button>
            <div className={style.groups}>
              {groups.map(group => <Group key={group.id} {...group}/>)}
            </div>
          </div>
          <TagsList/>
        </div>
        {
            current &&
            <GroupEditor
                type="add"
                cancel={closeAddGroupModal}
                group={{ id: Date.now(), name: current }}
            />
        }
      </>
  );
};
