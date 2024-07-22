import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  
};

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginAction: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        }
    }
})

export const {  } = UserSlice.actions;

export default UserSlice.reducer; 
