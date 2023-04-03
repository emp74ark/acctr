import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addGroup } from '../../store/groupsSlice';

export const AddGroup = ({ cb }: { cb: () => void }) => {
  const [name, setName] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const dispatch = useDispatch();

  const onName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value.trim());
  };

  const onTags = (e: ChangeEvent<HTMLInputElement>) => {
    setTags(e.currentTarget.value.split(', '));
  };

  const onSave = () => {
    dispatch(addGroup({
      id: Date.now(),
      name,
      tags,
    }));
    setName('');
    setTags([])
    cb();
  };

  const onCancel = () => {
    cb();
  };

  return (
      <>
        <div className="shadow">
          <div className="modal">
            <label>Group name
              <input
                  type="text"
                  onChange={ onName }
              />
            </label>
            <label>Tags
              <input
                  type="text"
                  onChange={ onTags }
              />
            </label>
            <button disabled={ !name } onClick={ onSave }>Save</button>
            <button onClick={ onCancel }>Cancel</button>
          </div>
        </div>
      </>
  );
};
