import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
   category: [],
   loading: false,
   status: "",
   error: ""
}

export const getCategories = createAsyncThunk(
   'category/get',
   async () => {
      const { data } = await axios.get("/api/categories");
      return data
   }
)
const categorySlice = createSlice({
   name: "category",
   initialState,
   extraReducers: {
      [getCategories.pending]: (state) => {
         state.loading = true
         state.status = "pending"
      },
      [getCategories.fulfilled]: (state, action) => {
         state.loading = false
         state.status = "fulfilled"
         state.category = action.payload
      },
      [getCategories.rejected]: (state, action) => {
         state.loading = false
         state.status = "rejected"
         state.error = state.action
      }
   }
})

export default categorySlice.reducer