import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    classesList: [],
    classDetails: {},
    loading: false,
    error: null,
    response: null,
};

const classSlice = createSlice({
    name: 'class',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        doneSuccess: (state, action) => {
            state.classDetails = action.payload
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        getSuccess: (state, action) => {
            state.classesList = action.payload;
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
            state.classesList = state.classesList.filter(
                (item) => item.class_id !== action.payload
            );
            state.loading = false;
            state.error = null;
            state.response = "Deleted successfully";
        },
        createSuccess: (state, action) => {
            if (!Array.isArray(state.classesList)) {
                state.classesList = [];
              }
            state.classesList.push(action.payload);
            state.loading = false;
            state.error = null;
            state.response = "Created successfully";
            state.classDetails = action.payload; 
          },
        updateSuccess: (state, action) => {
            const index = state.classesList.findIndex(
                (item) => item.class_id === action.payload.class_id
            );
            if (index !== -1) {
                state.classesList[index] = action.payload;
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
} = classSlice.actions;

export const classReducer = classSlice.reducer;
