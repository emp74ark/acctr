import {IGroup} from "../../entities";
import style from "./style.module.css";
import {useDispatch, useSelector} from "react-redux";
import {removeGroup} from "../../store/groupsSlice";
import {getAmountByTag} from "../../utils";
import {RootState} from "../../store/store";
import {useCallback, useState} from "react";
import {GroupEditor} from "../GroupEditor";
import {Tag} from "../Tags";
import {useDrop} from "react-dnd";
import {TagRemover} from "../Tags/TagRemover";
import {AmountChart, TimeChart} from "../Chart";
import {useTranslation} from "react-i18next";

enum GroupView {
  "pieChart" = "pieChart",
  "timeChart" = "timeChart",
  "text" = "text",
}

export const Group = (group: IGroup) => {
  const {t} = useTranslation()
  const {records} = useSelector((state: RootState) => state.records);
  const [view, setView] = useState<GroupView>(GroupView.pieChart);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState<boolean>(false);
  const [{isOver}, dropRef] = useDrop({
    accept: "tag",
    drop: () => ({group}),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    })
  });

  const onRemove = useCallback(() => dispatch(removeGroup(group.id)), [dispatch, group.id]);

  const onEdit = useCallback(() => setEdit(!edit), [edit]);

  const onGroupView = useCallback((type: GroupView) => {
    setView(type);
  }, []);

  return (
      <div className={style.group}>
        <div>
          <div className={style.header}>
            <h4>{group.name}</h4>
            <div className={style.actions}>
              <button
                  className={`${style.action} ${style.action_text}`}
                  onClick={() => onGroupView(GroupView.text)}
                  disabled={view === GroupView.text}>
              </button>
              <button
                  className={`${style.action} ${style.action_pie}`}
                  onClick={() => onGroupView(GroupView.pieChart)}
                  disabled={view === GroupView.pieChart}>
              </button>
              <button
                  className={`${style.action} ${style.action_line}`}
                  onClick={() => onGroupView(GroupView.timeChart)}
                  disabled={view === GroupView.timeChart}>
              </button>
            </div>
          </div>
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
        </div>

        <div className="buttons">
          <button
              className="btn btn__small btn__primary"
              onClick={onRemove}>
            {t('remove')}
          </button>
          <button
              className="btn btn__small btn__secondary"
              onClick={onEdit}>
            {t('edit')}
          </button>
        </div>
        {edit && <GroupEditor type="edit" cancel={onEdit} group={group}/>}
      </div>
  );
};
