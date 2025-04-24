import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    schedulesList: [],
    scheduleDetails: [],
    loading: false,
    error: null,
    response: null,
};

const scheduleSlice = createSlice({
    name: 'schedules',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        doneSuccess: (state, action) => {
            state.scheduleDetails = action.payload;
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        getSuccess: (state, action) => {
            state.schedulesList = action.payload;
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
            state.schedulesList = state.schedulesList.filter(
                (item) => item.schedule_id !== action.payload
            );
            state.loading = false;
            state.error = null;
            state.response = "Deleted successfully";
        },
        createSuccess: (state, action) => {
            state.schedulesList.push(action.payload);
            state.loading = false;
            state.error = null;
            state.response = "Created successfully";
        },
        updateSuccess: (state, action) => {
            if (Array.isArray(state.schedulesList)) {
              const index = state.schedulesList.findIndex(
                (item) => item.schedule_id === action.payload.schedule_id
              );
              if (index !== -1) {
                state.schedulesList[index] = action.payload;
              }
            } else {
              console.warn("schedulesList is not an array!", state.schedulesList);
            }
          
            state.loading = false;
            state.error = null;
            state.response = "Updated successfully";
        }
                  
    },
});

export const {
    getRequest,
    doneSuccess,
    getSuccess,
    getFailed,
    getError,
    postDone,
    deleteSuccess,
    createSuccess,
    updateSuccess
} = scheduleSlice.actions;

export const scheduleReducer = scheduleSlice.reducer;
