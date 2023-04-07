import { IRecord } from "../../entities";
import { useDispatch } from "react-redux";
import { editRecord } from "../../store/recordsSlice";
import { ChangeEvent, useCallback, useState } from "react";
import { shortDate } from "../../utils";

enum FieldName {
    label = "label",
    amount = "amount",
    tags = "tags",
    date = "date"
}

export const RecordEditor = ({ record, cb }: { record: IRecord, cb: () => void }) => {
    const { label, amount, tags, date } = record;
    const dispatch = useDispatch();
    const [field, setField] = useState<Record<string, string | number | string[]>>();

    const onSave = useCallback(() => {
        if (field) {
            dispatch(editRecord({
                ...record,
                ...field,
            }));
            cb()
        }
    }, [field, dispatch, record, cb]);

    const onCancel = useCallback(() => cb(), [cb]);

    const onChange = (e: ChangeEvent<HTMLInputElement>, name: FieldName) => {
        switch (name) {
            case FieldName.tags:
                setField({
                    [name]: e.currentTarget.value.split(", "),
                });
                break;
            case FieldName.date:
                setField({
                    [name]: Date.parse(e.currentTarget.value)
                });
                break;
            default:
                setField({
                    [name]: e.currentTarget.value,
                });
                break;
        }
    };

    return (
            <div className="shadow">
                <div className="modal">
                    <label>Label
                        <input
                                type="text"
                                defaultValue={label}
                                onChange={(e) => onChange(e, FieldName.label)}
                        />
                    </label>
                    <label>Tags
                        <input
                                type="text"
                                defaultValue={tags.join(", ")}
                                onChange={(e) => onChange(e, FieldName.tags)}
                        />
                    </label>
                    <label>Amount
                        <input
                                type="text"
                                defaultValue={amount}
                                onChange={(e) => onChange(e, FieldName.amount)}
                        />
                    </label>
                    <label>Amount
                        <input
                                type="date"
                                defaultValue={shortDate(date)}
                                onChange={(e) => onChange(e, FieldName.date)}
                        />
                    </label>
                    <button disabled={!field} onClick={onSave}>Save</button>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </div>
    );
};
