import {IGroup} from '../../entities';
import style from './style.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {removeGroup} from '../../store/groupsSlice';
import {getAmountByTag} from "../../utils";
import {RootState} from "../../store/store";
import {useState} from "react";
import {GroupEditor} from "../GroupEditor";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import * as uniqolor from "uniqolor";

ChartJS.register(ArcElement, Tooltip, Legend);

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

    const data = {
        labels: group.tags,
        datasets: [
            {
                label: 'amount',
                data: group.tags?.map(tag => getAmountByTag(tag, records)),
                backgroundColor: group.tags?.map(tag => uniqolor.random().color),
                borderColor: group.tags?.map(tag => '#fff'),
                borderWidth: 3,
            },
        ],
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
            <Pie data={data}/>
            <button onClick={onRemove}>Remove</button>
            <button onClick={onEdit}>Edit</button>
            {edit && <GroupEditor type='edit' cancel={onEdit} group={group}/>}
        </div>
    );
};
