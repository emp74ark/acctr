import style from './style.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useState } from 'react';
import { AddGroup } from '../../components/AddGroup';
import { Group } from '../../components/Group';

export const Statistics = () => {
  const { records: { records, tags }, groups: { groups } } = useSelector((state: RootState) => state);
  const [current, setCurrent] = useState<string>();

  const openAddGroupModal = () => {
    setCurrent('New group');
  };

  const closeAddGroupModal = () => {
    setCurrent(undefined);
  };

  return (
      <>
        <h2>Statistics</h2>
        <div className={ style.page__wrapper }>
          <div>
            <h3>Groups</h3>
            <button onClick={ openAddGroupModal }>Add group</button>
            <div className={ style.groups }>
              { groups.map(group => <Group key={ group.id } { ...group }/>) }
            </div>
          </div>
          <div className={ style.tags }>
            <h3>Tags</h3>
            { tags.map(tag => (
                <span key={ tag } className="tag">{ tag }</span>
            )) }
          </div>
        </div>
        { current && <AddGroup cb={ closeAddGroupModal }/> }
      </>
  );
};
