import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    access_token: null,
    refresh_token: null,
    user: { role: null, isAuthenticated: false,user: {} },
    global: null,
};

/**
 * Creates a slice for handling authentication state using Redux Toolkit.
 * @param {string} name - The name of the slice.
 * @param {object} initialState - The initial state of the slice.
 * @param {object} reducers - An object containing reducer functions for login, signup, and logout actions.
 * @returns An auth slice object with login, signup, and logout actions.
 */
const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginAction: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        signupAction: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logoutAction: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        }
    }
})

export const { loginAction,signupAction, logoutAction } = AuthSlice.actions;

export default AuthSlice.reducer; // Ensure this is correctly exported
