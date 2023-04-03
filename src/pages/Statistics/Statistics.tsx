import style from './style.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useState } from 'react';
import { AddGroup } from '../../components/AddGroup';
import { Group } from '../../components/Group';

export const Statistics = () => {
  const { records: { records }, groups: { groups } } = useSelector((state: RootState) => state);
  const [current, setCurrent] = useState<string>();

  const openAddGroupModal = () => {
    setCurrent('New group');
  };

  const closeAddGroupModal = () => {
    setCurrent(undefined);
  };

  const getTags = () => { // todo: create redux slice
    const tagsSet: Set<string> = new Set();
    records.forEach(({ tags }) => tags.forEach(tag => tagsSet.add(tag)));
    return Array.from(tagsSet);
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
            { getTags().map(tag => (
                <span key={ tag } className="tag">{ tag }</span>
            )) }
          </div>
        </div>
        { current && <AddGroup cb={ closeAddGroupModal }/> }
      </>
  );
};
