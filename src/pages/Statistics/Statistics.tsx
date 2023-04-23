import style from "./style.module.css";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {useCallback, useState} from "react";
import {Group, GroupEditor, TagsList} from "../../components";
import {useTranslation} from "react-i18next";

export const Statistics = () => {
  const {t} = useTranslation()
  const {groups: {groups}} = useSelector((state: RootState) => state);
  const [current, setCurrent] = useState<string>();

  const openAddGroupModal = useCallback(() => setCurrent("New group"), []);

  const closeAddGroupModal = useCallback(() => setCurrent(undefined), []);

  return (
      <>
        <h2>{t('statisticsHeader')}</h2>
        <div className={style.page__wrapper}>
          <div>
            <div className={style.groups}>
              {groups.map(group => <Group key={group.id} {...group}/>)}
            </div>
          </div>
          <aside>
            <button
                className="btn btn__large btn__primary"
                onClick={openAddGroupModal}>
              {t('addGroup')}
            </button>
            <TagsList/>
          </aside>
        </div>
        {
            current &&
            <GroupEditor
                type="add"
                cancel={closeAddGroupModal}
                group={{id: Date.now(), name: current}}
            />
        }
      </>
  );
};
