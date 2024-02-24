/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit'
import {
  AppliedLeaveDetails,
  ApplyLeaveDetailsAction,
  GetChatComment,
  PostChatComment,
} from '../actions/ApplyLeaveDetailsAction'

const initialState = {
  isLoading: false,
  leaveDetailsList: [],
  getComment: [],
  postComment: {},
  appliedLeave:[]
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
      state.leaveDetailsList = actions.payload
    })
    builder.addCase(ApplyLeaveDetailsAction.rejected, (state, actions) => {
      state.isLoading = false
      state.leaveDetailsList = []
    })
    //get-comments
    builder.addCase(GetChatComment.pending, (state, actions) => {
      //state.isLoading = true
    })
    builder.addCase(GetChatComment.fulfilled, (state, actions) => {
      state.isLoading = false
      state.getComment = actions.payload
    })
    builder.addCase(GetChatComment.rejected, (state, actions) => {
      state.isLoading = false
      state.getComment = []
    })
    //post-comments
    builder.addCase(PostChatComment.pending, (state, actions) => {
      state.isLoading = true
    })
    builder.addCase(PostChatComment.fulfilled, (state, actions) => {
      state.isLoading = false
      state.postComment = actions.payload
    })
    builder.addCase(PostChatComment.rejected, (state, actions) => {
      state.isLoading = false
      state.postComment = {}
    })
    //applied-leave
    builder.addCase(AppliedLeaveDetails.pending, (state, actions) => {
      state.isLoading = true
    })
    builder.addCase(AppliedLeaveDetails.fulfilled, (state, actions) => {
      state.isLoading = false
      state.appliedLeave = actions.payload
    })
    builder.addCase(AppliedLeaveDetails.rejected, (state, actions) => {
      state.isLoading = false
      state.appliedLeave = []
    })
  },
})
export default ApplyLeaveDetailsSlice.reducer
