// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import timeTableReducer from "./useTimeTable"; // timeTableSlice import
import createTimeTypeReducer from "./useCreateTimeType"; // createTimeTypeSlice import
import curDateReducer from "./useCurDate";

const store = configureStore({
  reducer: {
    timeTable: timeTableReducer,
    createTimeType: createTimeTypeReducer,
    curDate: curDateReducer,
  },
});

export default store;
