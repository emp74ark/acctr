import { IGroup } from "../../entities";
import style from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { removeGroup } from "../../store/groupsSlice";
import { getAmountByTag } from "../../utils";
import { RootState } from "../../store/store";
import { useCallback, useState } from "react";
import { GroupEditor } from "../GroupEditor";
import { Tag } from "../Tags";
import { useDrop } from "react-dnd";
import { TagRemover } from "../Tags/TagRemover";
import { AmountChart, TimeChart } from "../Chart";

enum GroupView {
  "pieChart" = "pieChart",
  "timeChart" = "timeChart",
  "text" = "text",
}

export const Group = (group: IGroup) => {
  const { records } = useSelector((state: RootState) => state.records);
  const [view, setView] = useState<GroupView>(GroupView.pieChart);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState<boolean>(false);
  const [{ isOver }, dropRef] = useDrop({
    accept: "tag",
    drop: () => ({ group }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    })
  });

  const onRemove = useCallback(() => dispatch(removeGroup(group.id)), [dispatch, group.id]);

  const onEdit = useCallback(() => setEdit(!edit), [edit]);

  const onGroupView = useCallback((type: GroupView) => {
    setView(type)
  }, [])

  return (
      <div className={style.group}>
        <h4>{group.name}</h4>
        <button
            onClick={() => onGroupView(GroupView.text)}
            disabled={view === GroupView.text}>
          Text
        </button>
        <button
            onClick={() => onGroupView(GroupView.pieChart)}
            disabled={view === GroupView.pieChart}>
          Amount
        </button>
        <button
            onClick={() => onGroupView(GroupView.timeChart)}
            disabled={view === GroupView.timeChart}>
          Time
        </button>
        <div
            className={isOver ? `${style.tags} ${style.tags_over}` : style.tags}
            ref={dropRef}
        >
          {group.tags?.map(tag => (
              <TagRemover key={tag} group={group} tag={tag}>
                <Tag tag={tag}/>
              </TagRemover>
          ))}
        </div>
        {
            view === GroupView.text &&
            <ul>
              {group.tags?.map(tag => (
                  <li key={tag}>{tag}: {getAmountByTag(tag, records)}</li>
              ))}
            </ul>
        }
        {view === GroupView.pieChart && <AmountChart group={group}/>}
        {view === GroupView.timeChart && <TimeChart group={group}/>}

        <button onClick={onRemove}>Remove</button>
        <button onClick={onEdit}>Edit</button>
        {edit && <GroupEditor type="edit" cancel={onEdit} group={group}/>}
      </div>
  );
};
