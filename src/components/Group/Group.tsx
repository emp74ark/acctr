import { IGroup } from '../../entities';
import style from './style.module.css';
import { useDispatch } from 'react-redux';
import { removeGroup } from '../../store/groupsSlice';

export const Group = ({ id, name, tags }: IGroup) => {
  const dispatch = useDispatch();

  const onRemove = () => {
    dispatch(removeGroup(id));
  };

  return (
      <div className={ style.group }>
        <h4>{ name }</h4>
        <div className={ style.tags }>
          { tags?.map(tag => (<span className="tag">{ tag }</span>)) }
        </div>
        <button onClick={ onRemove }>Remove</button>
      </div>
  );
};
