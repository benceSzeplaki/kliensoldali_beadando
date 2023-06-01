import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    accessToken: "",
    user: {
        id: null,
        email: "",
        fullName: ""
    }
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, { payload }) => {
            state.user = payload.user;
            state.accessToken = payload.accessToken;
        },
        logout: (state) => {
            state.accessToken = "";
            state.user = {
                id: null,
                email: "",
                fullName: ""
            };
        }
    }
});

export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const selectUser = (state) => state.user;
export const selectAccessToken = (state) => state.accessToken;


