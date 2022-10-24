import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPosters = createAsyncThunk(
   'poster/getAll',
   async (url) => {
      const { data } = await axios.get(url);
      return data;
   }
)

export const getPoster = createAsyncThunk(
   'poster/get',
   async (id) => {
      const { data } = await axios.get(`/api/posters/${id}`);
      return data;
   }
)
export const newPoster = createAsyncThunk(
   'poster/new',
   async () => {
      const { data } = await axios.get("/api/posters/new")
      return data
   }
)
export const createPoster = createAsyncThunk(
   'poster/create',
   async (posterData) => {
      const config = {
         headers: {
            ContentType: 'multipart/form-data'
         }
      }
      const { data } = await axios.post("/posters", posterData, config)
      return data
   }
)

export const updatePoster = createAsyncThunk(
   'poster/update',
   async (id, formData) => {
      try {
         const config = {
            headers: {
               ContentType: 'multipart/form-data'
            }
         }
         const { data } = await axios.put(`/posters/${id}`, formData, config)
         return data
      } catch (error) {
         console.log(error);
      }
   }
)

export const deletePoster = createAsyncThunk(
   'poster/delete',
   async (id) => {
      const { data } = await axios.delete(`/posters/${id}`);
      return data;
   }
)

const initialState = {
   posters: [],
   poster: {},
   newposter: [],
   error: "",
   status: "",
   loading: false
}

const posterSlice = createSlice({
   name: "poster",
   initialState,
   extraReducers: {
      [getPosters.pending]: (state) => {
         state.loading = true
         state.status = "pending"
      },
      [getPosters.fulfilled]: (state, action) => {
         state.loading = false
         state.status = "fulfilled"
         state.posters = action.payload
      },
      [getPosters.rejected]: (state, action) => {
         state.loading = false
         state.status = "rejected"
         state.error = action.payload
      },
      [getPoster.pending]: (state) => {
         state.loading = true
         state.status = "pending"
      },
      [getPoster.fulfilled]: (state, action) => {
         state.loading = false
         state.status = "fulfilled"
         state.poster = action.payload
      },
      [createPoster.pending]: (state) => {
         state.loading = true
         state.status = "pending"
      },
      [createPoster.fulfilled]: (state, action) => {
         state.loading = false
         state.status = "fulfilled"
      },
      [createPoster.rejected]: (state, action) => {
         state.loading = false
         state.status = "rejected"
         state.error = action.payload
      },
      [updatePoster.pending]: (state) => {
         state.loading = true
         state.status = "pending"
      },
      [updatePoster.fulfilled]: (state, action) => {
         state.loading = false
         state.status = "fulfilled"
      },
      [updatePoster.rejected]: (state, action) => {
         state.loading = false
         state.status = "rejected"
         state.error = action.payload
      },
      [newPoster.pending]: (state) => {
         state.loading = true
         state.status = "pending"
      },
      [newPoster.fulfilled]: (state, action) => {
         state.loading = false
         state.status = "fulfilled"
         state.newposter = action.payload
      },
      [newPoster.rejected]: (state, action) => {
         state.loading = false
         state.status = "rejected"
         state.error = action.payload
      },
      [deletePoster.fulfilled]: (state, action) => {
         state.loading = false
         state.status = "fulfilled"
         state.poster = action.payload
      }
   }
})

export default posterSlice.reducer