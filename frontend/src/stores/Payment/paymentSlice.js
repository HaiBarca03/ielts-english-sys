import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentList: [],
  paymentDetails: {},
  loading: false,
  error: null,
  response: null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    getRequest: (state) => {
      state.loading = true;
    },
    doneSuccess: (state, action) => {
      state.paymentDetails = action.payload;
      state.loading = false;
      state.error = null;
      state.response = null;
    },
    getSuccess: (state, action) => {
      state.paymentList = action.payload;
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
      state.paymentList = state.paymentList.filter(
        (item) => item.paymentId !== action.payload
      );
      state.loading = false;
      state.error = null;
      state.response = "Deleted successfully";
    },
    createSuccess: (state, action) => {
      state.paymentList.push(action.payload);
      state.loading = false;
      state.error = null;
      state.response = "Created successfully";
    },
    updateSuccess: (state, action) => {
      const index = state.paymentList.findIndex(
        (item) => item.paymentId === action.payload.paymentId
      );
      if (index !== -1) {
        state.paymentList[index] = action.payload;
      }
      state.loading = false;
      state.error = null;
      state.response = "Updated successfully";
    }
  },
});

export const paymentActions = paymentSlice.actions;
export const paymentReducer = paymentSlice.reducer;