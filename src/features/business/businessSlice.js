import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    access_token: null,
    refresh_token: null,
    user: { role: null, isAuthenticated: false,user: {} },
    global: null,
};

/**
 * Creates a slice for handling business state using Redux Toolkit.
 * @param {string} name - The name of the slice.
 * @param {object} initialState - The initial state of the slice.
 * @param {object} reducers - An object containing reducer functions for login, signup, and logout actions.
 * @returns An auth slice object with login, signup, and logout actions.
 */
const BusinessSlice = createSlice({
    name: 'business',
    initialState,
    reducers: {
        loginBsAction: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        signupBsAction: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logoutBsAction: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        }
    }
})

export const { loginBsAction,signupBsAction, logoutBsAction } = BusinessSlice.actions;

export default BusinessSlice.reducer; // Ensure this is correctly exported
