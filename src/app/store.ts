import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import tripsReducer from "../features/trips/tripSlice";

export const store = configureStore({
  reducer: {
    trips: tripsReducer,
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