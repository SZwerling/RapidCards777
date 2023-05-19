import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: { name: null, email: null, _id: null, token: null, avatar: null },
    reducers: {
        setCredentials: (state, action) => {
            const { name, email, _id, token, avatar } = action.payload
            state.name = name
            state.email = email
            state._id = _id
            state.token = token
            state.avatar = avatar
        },
    },
})


export const { setCredentials  } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state) => state.auth.name
export const selectCurrentToken = (state) => state.auth.token