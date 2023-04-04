import {IRecord} from '../entities';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface RecordsState {
  records: IRecord[];
  tags: string[];
}

const savedData = JSON.parse(localStorage.getItem('acctr') || '{}')

const initialState: RecordsState = {
  records: savedData.records || [],
  tags: savedData.tags || [],
};

const getTags = (records: IRecord[]) => {
  const tagsSet: Set<string> = new Set();
  records.forEach(({tags}) => tags.forEach(tag => tagsSet.add(tag)));
  return Array.from(tagsSet);
};

export const recordsSlice = createSlice({
  name: 'records',
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
    }
  }
});

export const {
  addRecord,
  removeRecord,
  editRecord,
} = recordsSlice.actions;
export default recordsSlice.reducer;
