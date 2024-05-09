import { createSlice } from "@reduxjs/toolkit";

export const detailSlice = createSlice({
  name: "detail",
  initialState: {
    detail: {},
  },
  reducers: {
    toDetail: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { toDetail } = detailSlice.actions;

export const detailData = (state) => state.detail;

export default detailSlice.reducer;
