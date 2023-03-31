import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import recordsSlice from './recordsSlice';

export const store = configureStore({
  reducer: {
    records: recordsSlice,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
