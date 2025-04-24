import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    usersList: [],
    userDetails: [],
    loading: false,
    error: null,
    response: null,
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        doneSuccess: (state, action) => {
            state.userDetails = action.payload;
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        getSuccess: (state, action) => {
            state.usersList = action.payload;
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
            state.usersList = state.usersList.filter(
                (item) => item.user_id !== action.payload
            );
            state.loading = false;
            state.error = null;
            state.response = "Deleted successfully";
        },
        createSuccess: (state, action) => {
            if (!Array.isArray(state.usersList)) {
                state.usersList= [];
              }
            state.usersList.push(action.payload);
            state.loading = false;
            state.error = null;
            state.response = "Created successfully";
        },
        updateSuccess: (state, action) => {
            if (Array.isArray(state.usersList)) {
              const index = state.usersList.findIndex(
                (item) => item.user_id === action.payload.user_id
              );
              if (index !== -1) {
                state.usersList[index] = action.payload;
              }
            } else {
              console.warn("usersList is not an array!", state.usersList);
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
} = userSlice.actions;

export const userReducer = userSlice.reducer;
