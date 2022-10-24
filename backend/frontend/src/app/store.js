import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import categoryReducer from '../features/categorySlice';
import posterReducer from '../features/posterSlice';
import userReducer from '../features/userSlice';

export default configureStore({
   reducer: {
      poster: posterReducer,
      auth:authReducer,
      user:userReducer,
      category:categoryReducer
   }
})