import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import style from "./style.module.css";
import { Tag } from "./Tag";

export const TagsList = () => {
  const { records: { tags } } = useSelector((state: RootState) => state);

  return (
      <div className={style.tags}>
        <h3>Tags</h3>
        <div className={style.tags__list}>
          {tags.map(tag => <Tag key={tag} tag={tag}/>)}
        </div>
      </div>
  );
};
