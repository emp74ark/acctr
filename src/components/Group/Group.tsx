import { IGroup } from "../../entities";
import style from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { removeGroup } from "../../store/groupsSlice";
import { getAmountByTag } from "../../utils";
import { RootState } from "../../store/store";
import { useState } from "react";
import { GroupEditor } from "../GroupEditor";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import * as uniqolor from "uniqolor";
import { Tag } from "../Tags";
import { useDrop } from "react-dnd";
import { TagRemover } from "../Tags/TagRemover";

ChartJS.register(ArcElement, Tooltip, Legend);

enum GroupView {
    "pieChart" = "pieChart",
    "text" = "text",
}

export const Group = (group: IGroup) => {
    const { records } = useSelector((state: RootState) => state.records);
    const [view, setView] = useState<GroupView>(GroupView.pieChart);
    const dispatch = useDispatch();
    const [edit, setEdit] = useState<boolean>(false);
    const [{ canDrop, isOver }, dropRef] = useDrop({
        accept: "tag",
        drop: () => ({ group }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        })
    });

    const onRemove = () => {
        dispatch(removeGroup(group.id));
    };

    const onEdit = () => {
        setEdit(!edit);
    };

    const onGroupView = (type: GroupView) => {
        setView(type)
    }

    const data = {
        labels: group.tags,
        datasets: [
            {
                label: "amount",
                data: group.tags?.map(tag => getAmountByTag(tag, records)),
                backgroundColor: group.tags?.map(tag => uniqolor.random().color),
                borderColor: group.tags?.map(tag => "#fff"),
                borderWidth: 3,
            },
        ],
    };

    return (
            <div className={style.group}>
                <h4>{group.name}</h4>
                <button onClick={() => onGroupView(GroupView.text)} disabled={view === GroupView.text}>Text</button>
                <button onClick={() => onGroupView(GroupView.pieChart)} disabled={view === GroupView.pieChart}>
                    Pie Chart
                </button>
                <div
                        className={isOver ? `${style.tags} ${style.tags_over}` : style.tags}
                        ref={dropRef}
                >
                    {group.tags?.map(tag => (
                            <TagRemover group={group} tag={tag}>
                                <Tag tag={tag}/>
                            </TagRemover>
                    ))}
                </div>
                {
                        view === GroupView.text &&
                        <ul>
                            {group.tags?.map(tag => (
                                    <li>{tag}: {getAmountByTag(tag, records)}</li>
                            ))}
                        </ul>
                }
                {
                        view === GroupView.pieChart &&
                        <Pie data={data}/>
                }

                <button onClick={onRemove}>Remove</button>
                <button onClick={onEdit}>Edit</button>
                {edit && <GroupEditor type="edit" cancel={onEdit} group={group}/>}
            </div>
    );
};
