import style from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { removeRecord } from "../../store/recordsSlice";
import React, { useState } from "react";
import { IRecord } from "../../entities";
import { RecordEditor } from "../../components";

export const Records = () => {
    const { records } = useSelector((state: RootState) => state.records);
    const dispatch = useDispatch();
    const [edit, setEdit] = useState<IRecord>();

    const onRemove = (id: number) => {
        dispatch(removeRecord(id));
    };

    const onEdit = (record: IRecord) => {
        setEdit(record);
    };

    const onCancel = () => {
        setEdit(undefined);
    };

    const dateDecorator = (date: number) => {
        return (new Date(date)).toISOString().slice(0, 10);
    };

    return (
            <>
                <h2>Records</h2>
                <div className={style.records}>
                    {
                        records.map(({ id, label, amount, date, tags }) => (
                                <div key={id} className={style.record}>
                                    <span>{dateDecorator(date)}</span>
                                    <span>{label}</span>
                                    <span>{amount}</span>
                                    <span>{tags.join(", ")}</span>
                                    <button onClick={() => onEdit({ id, label, amount, date, tags })}>Edit</button>
                                    <button onClick={() => onRemove(id)}>Remove</button>
                                </div>
                        ))
                    }
                </div>
                {edit && <RecordEditor record={edit} cb={onCancel}/>}
            </>
    );
};
