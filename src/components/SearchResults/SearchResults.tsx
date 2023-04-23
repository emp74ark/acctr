import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import style from "./style.module.css";
import {HashLink} from 'react-router-hash-link';

export const SearchResults = () => {
  const {search} = useSelector((state: RootState) => state.records);
  return (
      <div className={style.search}>
        {
            search.length > 0 &&
            search.map(({id, label, tags, amount}) => (
                <HashLink
                    key={id}
                    to={`/records#${id}`}
                    smooth
                    className={style.row}>
                  <span>{label}</span>
                  <span>{tags.join(", ")}</span>
                  <span>{amount}</span>
                </HashLink>
            ))
        }
      </div>
  );
};
