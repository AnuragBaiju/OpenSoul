import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authInstance } from "../config/axiosConfig";

// Check authentication on page load
export const checkAuthStatus = createAsyncThunk("auth/checkStatus", async (role, { rejectWithValue }) => {
    try {
        const response = await authInstance.get(`/me`);
        console.log(response);
        if (response.data.role !== role) {
            if (role === "User") {
                return window.location.replace("/login");
            }
            return window.location.replace("/admin");
        }
        return response.data;
    } catch (error) {
        return rejectWithValue("Not authenticated");
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(checkAuthStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkAuthStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(checkAuthStatus.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.payload;
            });
    },
});

export default authSlice.reducer;
