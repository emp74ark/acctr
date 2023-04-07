import { IRecord } from "../entities";

export function getAmountByTag(tag: string, records: IRecord[]) {
  return records
      .filter(({ tags }) => tags.includes(tag))
      .reduce((acc, record) => acc + record.amount, 0)
}
