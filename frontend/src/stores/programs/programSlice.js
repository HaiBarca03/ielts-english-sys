import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    programsList: [],
    programDetails: [],
    loading: false,
    error: null,
    response: null,
};

const programSlice = createSlice({
    name: 'programs',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        doneSuccess: (state, action) => {
            state.programDetails = action.payload;
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        getSuccess: (state, action) => {
            state.programsList = action.payload;
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
            state.programsList = state.programsList.filter(
                (item) => item.program_id !== action.payload
            );
            state.loading = false;
            state.error = null;
            state.response = "Deleted successfully";
        },
        createSuccess: (state, action) => {
            state.programsList.push(action.payload);
            state.loading = false;
            state.error = null;
            state.response = "Created successfully";
        },
        updateSuccess: (state, action) => {
            if (Array.isArray(state.programsList)) {
              const index = state.programsList.findIndex(
                (item) => item.program_id === action.payload.program_id
              );
              if (index !== -1) {
                state.programsList[index] = action.payload;
              }
            } else {
              console.warn("programsList is not an array!", state.programsList);
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
} = programSlice.actions;

export const programReducer = programSlice.reducer;
