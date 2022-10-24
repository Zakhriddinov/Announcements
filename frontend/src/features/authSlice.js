import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk(
   'auth/register',
   async (userData) => {
      const { data } = await axios.post("/users", userData)
      if (data) {
         localStorage.setItem("user", JSON.stringify(data))
      }
      return data
   }
)

export const loginUser = createAsyncThunk(
   'auth/login',
   async (userData) => {
      const { data } = await axios.post("/users/login", userData)
      if (data) {
         localStorage.setItem("user", JSON.stringify(data))
      }
      return data
   }
)

export const logoutUser = createAsyncThunk(
   'auth/logout',
   async () => {
      await axios.get("/logout");
      localStorage.removeItem("user");
   }
);
// Get user from Localstorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
   user: user ? user : null,
   loading: false,
   status: "",
   error: ""
}

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      reset: (state) => {
         state.loading = false
         state.status = ""
         state.error = ""
      }
   },
   extraReducers: {
      [registerUser.pending]: (state) => {
         state.loading = true
         state.status = "pending"
      },
      [registerUser.fulfilled]: (state, action) => {
         state.loading = false
         state.status = "fulfilled"
         state.user = action.payload
      },
      [registerUser.rejected]: (state, action) => {
         state.loading = false
         state.status = "rejected"
         state.error = action.payload
         state.user = null
      },
      [loginUser.pending]: (state) => {
         state.loading = true
         state.status = "pending"
      },
      [loginUser.fulfilled]: (state, action) => {
         state.loading = false
         state.status = "fulfilled"
         state.user = action.payload
      },
      [loginUser.rejected]: (state, action) => {
         state.loading = false
         state.status = "rejected"
         state.error = action.payload
         state.user = null
      },
      [logoutUser.fulfilled]: (state) => {
         state.status = "fulfilled"
         state.user = null
      }
   }
})
export const { reset } = authSlice.actions;
export default authSlice.reducer;