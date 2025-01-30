import { createSlice } from "@reduxjs/toolkit";

const timeTable = createSlice({
  name: "timeTable",
  initialState: {
    selectedType: {
      id: "",
      name: "",
      color: "",
    },
  },
  reducers: {
    setSelectedType: (state, action) => {
      state.selectedType = action.payload;
    },
    // 필요하다면, resetUser와 같은 액션을 추가할 수 있습니다.
    resetUser: (state) => {
      state.selectedType = { id: "", name: "", color: "" };
    },
  },
});

export const { setSelectedType, resetTimeTable } = timeTable.actions;

export default timeTable.reducer;
