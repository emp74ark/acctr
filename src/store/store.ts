import {configureStore} from "@reduxjs/toolkit";
import recordsSlice from "./recordsSlice";
import groupsSlice from "./groupsSlice";
import settingsSlice from "./settingsSlice";

export const store = configureStore({
  reducer: {
    records: recordsSlice,
    groups: groupsSlice,
    settings: settingsSlice,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
