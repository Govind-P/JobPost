import { createSlice } from '@reduxjs/toolkit'

export const recruiterSlice = createSlice({
  name: 'recruiter',
  initialState: {
    recruiter:null,
    token:'',
    isLoggedIn:false
  },
  reducers: {
    setRecruiterDetails: (state, action) => {
        state.recruiter=action.payload;
    },
    setToken: (state, action) => {
        state.token=action.payload;
    },
    setLoggedIn: (state, action) => {
      state.isLoggedIn=action.payload;
  },
  },
})

// Action creators are generated for each case reducer function
export const { setRecruiterDetails,setToken,setLoggedIn} = recruiterSlice.actions

export default recruiterSlice.reducer