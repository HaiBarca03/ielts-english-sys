import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  attendanceList: [],
  attendanceDetails: [],
  loading: false,
  error: null,
  response: null,
};

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    getRequest: (state) => {
      state.loading = true;
    },
    doneSuccess: (state, action) => {
      state.attendanceDetails = action.payload;
      state.loading = false;
      state.error = null;
      state.response = null;
    },
    getSuccess: (state, action) => {
      state.attendanceList = action.payload;
      state.loading = false;
      state.error = null;
      state.response = null;
    },
    getFailed: (state, action) => {
      state.response = action.payload;
      state.loading = false;
      state.error = null;
    },
    getError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    postDone: (state) => {
      state.loading = false;
      state.error = null;
      state.response = null;
    },
    deleteSuccess: (state, action) => {
      state.attendanceList = state.attendanceList.filter(
        (item) => item.attendance_id !== action.payload
      );
      state.loading = false;
      state.error = null;
      state.response = "Deleted successfully";
    },
    createSuccess: (state, action) => {
      state.attendanceList.push(action.payload);
      state.loading = false;
      state.error = null;
      state.response = "Created successfully";
    },
    updateSuccess: (state, action) => {
      const index = state.attendanceList.findIndex(
        (item) => item.attendance_id === action.payload.attendance_id
      );
      if (index !== -1) {
        state.attendanceList[index] = action.payload;
      }
      state.loading = false;
      state.error = null;
      state.response = "Updated successfully";
    }
  },
});

export const attendanceActions = attendanceSlice.actions;
export const attendanceReducer = attendanceSlice.reducer;