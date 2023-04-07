import { IRecord } from "../entities";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RecordsState {
  records: IRecord[];
  tags: string[];
  search: IRecord[];
}

const savedData = JSON.parse(localStorage.getItem("acctr") || "{}");

const initialState: RecordsState = {
  records: savedData.records || [],
  tags: savedData.tags || [],
  search: [],
};

const getTags = (records: IRecord[]) => {
  const tagsSet: Set<string> = new Set();
  records.forEach(({ tags }) => tags.forEach(tag => tagsSet.add(tag)));
  return Array.from(tagsSet);
};

export const recordsSlice = createSlice({
  name: "records",
  initialState,
  reducers: {
    addRecord: (state, action: PayloadAction<IRecord>) => {
      state.records = [...state.records, action.payload];
      state.tags = getTags(state.records);
    },
    removeRecord: (state, action: PayloadAction<number>) => {
      state.records = state.records.filter(record => record.id !== action.payload);
      state.tags = getTags(state.records);
    },
    editRecord: (state, action: PayloadAction<IRecord>) => {
      const filteredList = state.records.filter(record => record.id !== action.payload.id);
      state.records = [...filteredList, action.payload];
      state.tags = getTags(state.records);
    },
    findRecords: (state, action: PayloadAction<string>) => {
      if (action.payload) {
        const clearedQuery = action.payload.replaceAll(/[*,#]/g, "").split(" ");
        state.search = state.records.filter(record => {
          return (record.label.split(" ").some(word => clearedQuery.includes(word)))
              ||
              (record.tags.some(tag => clearedQuery.includes(tag)));
        });
      } else {
        state.search = [];
      }
    }
  }
});

export const {
  addRecord,
  removeRecord,
  editRecord,
  findRecords,
} = recordsSlice.actions;
export default recordsSlice.reducer;
