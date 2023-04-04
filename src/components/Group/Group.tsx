import {IGroup} from '../../entities';
import style from './style.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {removeGroup} from '../../store/groupsSlice';
import {getAmountByTag} from "../../utils";
import {RootState} from "../../store/store";
import {useState} from "react";
import {GroupEditor} from "../GroupEditor";

export const Group = (group: IGroup) => {
    const {records} = useSelector((state: RootState) => state.records)
    const dispatch = useDispatch();
    const [edit, setEdit] = useState<boolean>(false);

    const onRemove = () => {
        dispatch(removeGroup(group.id));
    };

    const onEdit = () => {
        setEdit(!edit)
    };

    return (
        <div className={style.group}>
            <h4>{group.name}</h4>
            <div className={style.tags}>
                <ul>
                    {group.tags?.map(tag => (
                        <li>{tag}: {getAmountByTag(tag, records)}</li>
                    ))}
                </ul>
            </div>
            <button onClick={onRemove}>Remove</button>
            <button onClick={onEdit}>Edit</button>
            {edit && <GroupEditor type='edit' cancel={onEdit} group={group}/>}
        </div>
    );
};
