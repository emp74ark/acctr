import style from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { removeRecord } from "../../store/recordsSlice";
import React, { useCallback, useState } from "react";
import { IRecord } from "../../entities";
import { RecordEditor } from "../../components";
import { shortDate } from "../../utils";
import {RecordHeader} from "./RecordHeader";

export const Records = () => {
  const { records } = useSelector((state: RootState) => state.records);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState<IRecord>();

  const onRemove = useCallback((id: number) => dispatch(removeRecord(id)), [dispatch]);

  const onEdit = useCallback((record: IRecord) => setEdit(record), []);

  const onCancel = useCallback(() => setEdit(undefined), []);

  const dateDecorator = useCallback((date: number) => shortDate(date), []);

  return (
      <>
        <h2>Records</h2>
        <div className={style.records}>
          <RecordHeader/>
          {
            records.map(({ id, label, amount, date, tags }) => (
                <div key={id} id={id.toString()} className={style.row}>
                  <RecordHeader/>
                  <div className={style.record}>
                    <span>{dateDecorator(date)}</span>
                    <span>{label}</span>
                    <span>{amount}</span>
                    <span>{tags.join(", ")}</span>
                    <div className="buttons">
                      <button className="btn btn__small btn__primary"
                          onClick={() => onEdit({ id, label, amount, date, tags })}>
                        Edit
                      </button>
                      <button
                          className="btn btn__small btn__secondary"
                          onClick={() => onRemove(id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
            ))
          }
        </div>
        {edit && <RecordEditor record={edit} cb={onCancel}/>}
      </>
  );
};
