import { IRecord } from '../entities';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RecordsState {
  records: IRecord[];
}

const initialState: RecordsState = {
  records: [],
};

export const recordsSlice = createSlice({
  name: 'records',
  initialState,
  reducers: {
    addRecord: (state, action: PayloadAction<IRecord>) => {
      state.records = [...state.records, action.payload];
    },
    removeRecord: (state, action: PayloadAction<number>) => {
      state.records = state.records.filter(record => record.id !== action.payload);
    },
    editRecord: (state, action: PayloadAction<IRecord>) => {
      const filteredList = state.records.filter(record => record.id !== action.payload.id);
      state.records = [...filteredList, action.payload];
    },
  }
});

export const {
  addRecord,
  removeRecord,
  editRecord,
} = recordsSlice.actions;
export default recordsSlice.reducer;
