import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  scoresList: [],
  scoreDetails: [],
  loading: false,
  error: null,
  response: null,
};

const scoreSlice = createSlice({
  name: 'scores',
  initialState,
  reducers: {
    getRequest: (state) => {
      state.loading = true;
    },
    getSuccess: (state, action) => {
      state.scoresList = action.payload;
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
    createSuccess: (state, action) => {
      if (!Array.isArray(state.scoresList)) {
        state.scoresList = [];
      }
      state.scoresList.push(action.payload);
      state.loading = false;
      state.error = null;
      state.response = 'Created successfully';
    },
    updateSuccess: (state, action) => {
      if (Array.isArray(state.scoresList)) {
        const index = state.scoresList.findIndex(
          (item) => item.score_id === action.payload.score_id
        );
        if (index !== -1) {
          state.scoresList[index] = action.payload;
        }
      } else {
        console.warn('scoresList is not an array!', state.scoresList);
      }
      state.loading = false;
      state.error = null;
      state.response = 'Updated successfully';
    },
    deleteSuccess: (state, action) => {
      state.scoresList = state.scoresList.filter(
        (item) => item.score_id !== action.payload
      );
      state.loading = false;
      state.error = null;
      state.response = 'Deleted successfully';
    },
  },
});

export const scoreActions = scoreSlice.actions;
export const scoreReducer = scoreSlice.reducer;