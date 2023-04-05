import {useDispatch} from "react-redux";
import {editGroup} from "../../store/groupsSlice";
import {IGroup} from "../../entities";
import style from './style.module.css'

export const TagRemover = ({group, tag, children}: { group: IGroup, tag: string, children: JSX.Element }) => {
    const dispatch = useDispatch()

    const onRemove = () => {
        dispatch(editGroup({...group, tags: group.tags?.filter(el => el !== tag)}))
    }
    return (
        <div className={style.remover}>
            <button onClick={onRemove}>-</button>
            {children}
        </div>
    );
};
