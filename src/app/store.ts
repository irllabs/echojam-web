import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import experimentStateReducer from '../features/experiment-state/experiment-state-slice';

export const store = configureStore({
  reducer: {
    experimentState: experimentStateReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
