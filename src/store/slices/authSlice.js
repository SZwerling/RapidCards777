import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: { name: null, email: null, password: null, token: null },
    reducers: {
        setCredentials: (state, action) => {
            const { name, email, password, token } = action.payload
            state.name = name
            state.email = email
            state.password = password
            state.token = token
        },
    },
})


export const { setCredentials  } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state) => state.auth.name
export const selectCurrentToken = (state) => state.auth.token