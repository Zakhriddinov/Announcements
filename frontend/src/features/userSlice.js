import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const user = JSON.parse(localStorage.getItem('user'));
const initialState = {
   users: user ? user : null,
   loading: false,
   status: "",
   error: ""
}

export const getMe = createAsyncThunk(
   'user/me',
   async (id) => {
      const { data } = await axios.get(`/users/me/${id}`)
      return data
   }
)
export const updateUser = createAsyncThunk(
   'user/update',
   async (formData) => {
      const { name, lastName, phone } = formData
      const { data } = await axios.put(`/users/profile`, { ...formData })
      localStorage.setItem("user", JSON.stringify({ name, lastName, phone, email: initialState.users.email, _id: initialState.users._id }))
      document.location.href = "/profile"
      return data
   }
)

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      reset: (state) => {
         state.loading = false
         state.status = ""
         state.error = ""
      }
   },
   extraReducers: {
      [getMe.pending]: (state) => {
         state.loading = true
         state.status = "pending"
      },
      [getMe.fulfilled]: (state, action) => {
         state.loading = false
         state.status = "fulfilled"
         state.users = action.payload
      },
      [getMe.rejected]: (state, action) => {
         state.loading = false
         state.status = "rejected"
         state.error = action.payload
      },
      // [updateUser.pending]: (state) => {
      //    state.loading = true
      //    state.status = "pending"
      // },
      [updateUser.fulfilled]: (state, action) => {
         state.loading = false
         state.status = "update"
      },
      [updateUser.rejected]: (state, action) => {
         state.loading = false
         state.status = "rejected"
         state.error = action.payload
      }
   }
})
export const { reset } = userSlice.actions;
export default userSlice.reducer;