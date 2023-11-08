import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  threads: [],
};

export const threadSlice = createSlice({
  name: "thread",
  initialState,
  reducers: {
    getThreads: (state, action) => {
      state.threads = action.payload;
    },
  },
});

export const { getThreads } = threadSlice.actions;

export default threadSlice.reducer;
