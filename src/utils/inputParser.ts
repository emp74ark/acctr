import {IRecord} from "../entities";

export function inputParser(text: string): IRecord {
  const elements = text.split(" ");
  const result: IRecord = {
    id: Date.now(),
    label: "",
    tags: [],
    amount: 1,
    date: Date.now(),
  };
  elements.forEach(el => {
    if (el.startsWith("#")) result.tags.push(el.substring(1));
    else if (el.startsWith("*")) result.amount = Number(el.substring(1));
    else result.label += el + " ";
  });
  return result;
}
