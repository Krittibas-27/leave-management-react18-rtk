/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit'
import { ApplyLeaveDetailsAction } from '../actions/ApplyLeaveDetailsAction'

const initialState = {
  isLoading: false,
  allLeaveDetails: [{}],
}
const ApplyLeaveDetailsSlice = createSlice({
  name: 'leaveDetailsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ApplyLeaveDetailsAction.pending, (state, actions) => {
      state.isLoading = true
    })
    builder.addCase(ApplyLeaveDetailsAction.fulfilled, (state, actions) => {
      state.isLoading = false
      state.allLeaveDetails = actions.payload
    })
    builder.addCase(ApplyLeaveDetailsAction.rejected, (state, actions) => {
      state.isLoading = false
      state.allLeaveDetails = [{}]
    })
  },
})
export default ApplyLeaveDetailsSlice.reducer
