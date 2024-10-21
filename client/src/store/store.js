import { configureStore } from '@reduxjs/toolkit'
import  recruiterReducer  from './recruiterSlice';

export default configureStore({
  reducer: {
    recruiter: recruiterReducer,
  },
})