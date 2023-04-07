import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Tooltip, } from "chart.js";
import { Line } from "react-chartjs-2";
import { IGroup } from "../../entities";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import uniqolor from "uniqolor";
import { shortDate } from "../../utils";
import { useCallback, useMemo } from "react";

ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Tooltip,
        Legend
);

export const TimeChart = ({ group }: { group: IGroup }) => {
    const { records } = useSelector((state: RootState) => state.records);

    const findByTags = useCallback(() => {
        return records.filter(record => {
            return record.tags.some(tag => group.tags?.includes(tag))
        })
    }, [])

    const findByTag = useCallback((tag: string) => {
        return {
            label: tag,
            data: records.filter(record => record.tags.includes(tag)).map(record => record.amount),
            backgroundColor: uniqolor.random().color,
        }
    }, [])

    const getTimePoints = useCallback(() => {
        return Array.from(new Set(findByTags().map(record => shortDate(record.date))))
    }, [])

    const getData = useMemo(() => {
        return group.tags?.map(tag => findByTag(tag)) || []
    }, [group.tags]);

    const data = {
        labels: getTimePoints(),
        datasets: getData,
    };

    return <Line data={data}/>
};
