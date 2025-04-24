import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    contentsList: [],
    contentDetails: [],
    loading: false,
    error: null,
    response: null,
};

const contentSlice = createSlice({
    name: 'contents',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        doneSuccess: (state, action) => {
            state.contentDetails = action.payload;
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        getSuccess: (state, action) => {
            state.contentsList = action.payload;
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
            state.contentsList = state.contentsList.filter(
                (item) => item.content_id !== action.payload
            );
            state.loading = false;
            state.error = null;
            state.response = "Deleted successfully";
        },
        createSuccess: (state, action) => {
            state.contentsList.push(action.payload);
            state.loading = false;
            state.error = null;
            state.response = "Created successfully";
        },
        updateSuccess: (state, action) => {
            const index = state.contentsList.findIndex(
                (item) => item.content_id === action.payload.content_id
            );
            if (index !== -1) {
                state.contentsList[index] = action.payload;
            }
            state.loading = false;
            state.error = null;
            state.response = "Updated successfully";
        },
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
} = contentSlice.actions;

export const contentReducer = contentSlice.reducer;
