import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    access_token: null,
    refresh_token: null,
    user: { userRole: null, isAuthenticated: false,user: {} },
    global: null,
};

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
