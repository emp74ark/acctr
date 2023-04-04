import {IGroup} from '../entities';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface GroupsState {
    groups: IGroup[];
}

const savedData = JSON.parse(localStorage.getItem('acctr') || '{}')

const initialState: GroupsState = {
    groups: savedData.groups || [],
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
        editGroup: (state, action: PayloadAction<IGroup>) => {
            const filteredGroups = state.groups.filter(group => group.id !== action.payload.id);
            state.groups = [...filteredGroups, action.payload];
        }
    }
});

export const {
    addGroup,
    removeGroup,
    editGroup,
} = groupsSlice.actions;

export default groupsSlice.reducer;
