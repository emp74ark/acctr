import {ArcElement, Chart as ChartJS, Legend, Tooltip} from "chart.js";
import {Pie} from "react-chartjs-2";
import * as uniqolor from "uniqolor";
import {IGroup} from "../../entities";
import {getAmountByTag} from "../../utils";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {useMemo} from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

export const AmountChart = ({group}: { group: IGroup }) => {
  const {records} = useSelector((state: RootState) => state.records);

  const getData = useMemo(() => {
    return group.tags?.map(tag => getAmountByTag(tag, records));
  }, [records, group.tags]);

  const data = {
    labels: group.tags,
    datasets: [
      {
        label: "amount",
        data: getData,
        backgroundColor: group.tags?.map(() => uniqolor.random().color),
        borderColor: group.tags?.map(() => "#fff"),
        borderWidth: 3,
      },
    ],
  };

  return <Pie data={data}/>;
};
