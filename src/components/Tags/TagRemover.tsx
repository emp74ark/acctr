import { useDispatch } from "react-redux";
import { editGroup } from "../../store/groupsSlice";
import { IGroup } from "../../entities";
import style from "./style.module.css"
import { useCallback } from "react";

export const TagRemover = ({ group, tag, children }: { group: IGroup, tag: string, children: JSX.Element }) => {
    const dispatch = useDispatch()

    const onRemove = useCallback(() => {
      dispatch(editGroup({ ...group, tags: group.tags?.filter(el => el !== tag) }));
    }, [dispatch, group, tag])

    return (
            <div className={style.remover}>
                <button onClick={onRemove}>-</button>
                {children}
            </div>
    );
};
