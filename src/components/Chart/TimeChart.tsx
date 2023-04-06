import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { IGroup, IRecord } from "../../entities";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import uniqolor from "uniqolor";

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

    const findByTags = (): IRecord[] => {
        return records.filter(record => {
            return record.tags.some(tag => group.tags?.includes(tag))
        })
    }

    const findByTag = (tag: string) => {
        return {
            label: tag,
            data: records.filter(record => record.tags.includes(tag)).map(record => record.amount),
            backgroundColor: uniqolor.random().color,
        }
    }

    const getTimePoints = () => {
        const dates = findByTags().map(record => (new Date(record.date)).toISOString().slice(0, 10));
        return Array.from(new Set(dates))
    }

    const data = {
        labels: getTimePoints(),
        datasets: group.tags?.map(tag => findByTag(tag)) || [],
    };

    return <Line data={data}/>
};
