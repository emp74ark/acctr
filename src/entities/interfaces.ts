export interface IRecord {
    id: number;
    date: number;
    label: string;
    tags: string[];
    amount: number;
}

export interface IGroup {
    id: number;
    name: string;
    tags?: string[];
}
