import { IGroup } from '../entities';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GroupsState {
  groups: IGroup[];
}

const initialState: GroupsState = {
  groups: [],
};

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    addGroup: (state, action: PayloadAction<IGroup>) => {
      state.groups = [...state.groups, action.payload];
    },
    removeGroup: (state, action: PayloadAction<number>) => {
      state.groups = state.groups.filter(group => group.id !== action.payload);
    },
  }
});

export const {
  addGroup,
  removeGroup
} = groupsSlice.actions;

export default groupsSlice.reducer;
