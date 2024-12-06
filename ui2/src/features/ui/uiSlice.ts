import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface uiState {
  showLoading: boolean;
}

const initialState: uiState = {
  showLoading: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setShowLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.showLoading = payload;
    },
  },
});

export const { setShowLoading } = uiSlice.actions;

export const selectShowLoading = (state: RootState) => state.ui.showLoading;

export const { reducer: uiReducer } = uiSlice;
