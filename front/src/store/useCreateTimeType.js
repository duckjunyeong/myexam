import { configureStore, createSlice } from "@reduxjs/toolkit";

const createTimeType = createSlice({
  name: "createTimeType",
  initialState: {
    categoryName: "",
    categoryColor: "",
    categoryId: "",
    timeTypeName: "",
    timeTypeColor: "",
  },
  reducers: {
    setCategoryName: (state, action) => {
      state.categoryName = action.payload;
    },
    setCategoryColor: (state, action) => {
      state.categoryColor = action.payload;
    },
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    setTimeTypeName: (state, action) => {
      state.timeTypeName = action.payload;
    },
    setTimeTypeColor: (state, action) => {
      state.timeTypeColor = action.payload;
    },
    // 필요하다면, resetUser와 같은 액션을 추가할 수 있습니다.
    resetUser: (state) => {
      state.categoryName = "";
      state.categoryColor = "";
      state.categoryId = "";
      state.timeTypeName = "";
      state.timeTypeColor = "";
    },
  },
});

export const {
  setCategoryName,
  setCategoryColor,
  setCategoryId,
  setTimeTypeColor,
  setTimeTypeName,
  resetUser,
} = createTimeType.actions;

export default createTimeType.reducer;
