import { IRecord } from '../../entities';
import { useDispatch } from 'react-redux';
import { editRecord } from '../../store/recordsSlice';
import { ChangeEvent, useState } from 'react';

export const RecordEditor = ({ record, cb }: { record: IRecord, cb: () => void }) => {
  const { label, amount } = record;
  const dispatch = useDispatch();
  const [field, setField] = useState<Record<string, string | number>>();

  const onSave = () => {
    if (field) {
      dispatch(editRecord({
        ...record,
        ...field,
      }));
      cb()
    }
  };

  const onCancel = () => {
    cb();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    setField({
      [name]: e.currentTarget.value,
    });
  };

  return (
      <div className="shadow">
        <div className="modal">
          <label>Label
            <input
                type="text"
                defaultValue={ label }
                onChange={ (e) => onChange(e, 'label') }
            />
          </label>
          <label>Amount
            <input
                type="text"
                defaultValue={ amount }
                onChange={ (e) => onChange(e, 'amount') }
            />
          </label>
          <button disabled={!field} onClick={ onSave }>Save</button>
          <button onClick={ onCancel }>Cancel</button>
        </div>
      </div>
  );
};
