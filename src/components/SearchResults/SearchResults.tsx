import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import style from "./style.module.css"

export const SearchResults = () => {
  const { search } = useSelector((state: RootState) => state.records);
  return (
      <div className={style.search}>
        {
            search.length > 0 &&
            search.map(({ id, label, tags, amount }) => (
                <div className={style.row} key={id}>
                  <span>{label}</span>
                  <span>{tags.join(", ")}</span>
                  <span>{amount}</span>
                </div>
            ))
        }
      </div>
  );
};
