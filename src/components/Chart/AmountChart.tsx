import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import * as uniqolor from "uniqolor";
import { IGroup } from "../../entities";
import { getAmountByTag } from "../../utils";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

ChartJS.register(ArcElement, Tooltip, Legend);

export const AmountChart = ({group}:{group: IGroup}) => {
    const { records } = useSelector((state: RootState) => state.records);

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

    return <Pie data={data}/>
};
