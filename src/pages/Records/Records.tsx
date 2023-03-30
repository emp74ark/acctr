import style from './style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { removeRecord } from '../../store/recordsSlice';
import { IRecord } from '../../entities';
import { useState } from 'react';

export const Records = () => {
  const { records } = useSelector((state: RootState) => state.records);
  const dispatch = useDispatch();
  const [editable, setEditable] = useState<{id: number; editable: boolean}>();

  const onRemove = (id: number) => {
    dispatch(removeRecord(id));
  };

  return (
      <>
        <h2>Records</h2>
        <div className={ style.records }>
          {
            records.map(({ id, label, amount, date, tags }) => (
                <div key={ id } className={ style.record }>
                  <span>{ date.toISOString().slice(0,10) }</span>
                  <span>{ label }</span>
                  <span>{ amount }</span>
                  <span>{ tags.join(', ') }</span>
                  <button onClick={ () => onRemove(id) }>Remove</button>
                </div>
            ))
          }
        </div>
      </>
  );
};
