import { configureStore } from "@reduxjs/toolkit";
import { uiReducer } from "../features/ui/uiSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
