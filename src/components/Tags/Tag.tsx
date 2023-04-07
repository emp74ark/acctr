import { useDrag } from "react-dnd";
import { IGroup } from "../../entities";
import { useDispatch } from "react-redux";
import { editGroup } from "../../store/groupsSlice";

interface DropResults {
    dropEffect: string;
    group: IGroup
}

export const Tag = ({ tag }: { tag: string }) => {
    const dispatch = useDispatch()
    const [{ isDragging }, dragRef] = useDrag({
        type: "tag",
        item: { name: tag },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult<DropResults>()
            if (dropResult) {
                const { group } = dropResult
                dispatch(editGroup({
                    ...group,
                    tags: [...group.tags || [], item.name],
                }))
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
            <span
                    ref={dragRef}
                    className="tag"
                    style={{ opacity: isDragging ? ".5" : "1" }}
            >
            {tag}
        </span>
    );
};
