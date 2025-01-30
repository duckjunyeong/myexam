import { createSlice } from "@reduxjs/toolkit";

const curDate = createSlice({
  name: "curDate",
  initialState: {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  },
  reducers: {
    setYear: (state, action) => {
      state.year = action.payload;
    },
    setMonth: (state, action) => {
      state.month = action.payload;
    },

    goToPreviousMonth: (state) => {
      if (state.month === 0) {
        state.month = 11;
        state.year -= 1;
      } else {
        state.month -= 1;
      }
    },

    goToNextMonth: (state) => {
      if (state.month === 11) {
        state.month = 0;
        state.year += 1;
      } else {
        state.month += 1;
      }
    },
  },
});

export const { setYear, setMonth, goToPreviousMonth, goToNextMonth } =
  curDate.actions;

export default curDate.reducer;
