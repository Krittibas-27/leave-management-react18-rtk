/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit'
import { ApplyLeaveAction, ManagerRelationAction } from '../actions/ManagerRelationAction'

const initialState = {
  isLoading: false,
  managerList: [],
  applyLive: {},
}
const EmployeeManagerSlice = createSlice({
  name: 'employee-manager-relation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ManagerRelationAction.pending, (state, actions) => {
      state.isLoading = true
    })
    builder.addCase(ManagerRelationAction.fulfilled, (state, actions) => {
      state.isLoading = false
      state.managerList = actions.payload
    })
    builder.addCase(ManagerRelationAction.rejected, (state, actions) => {
      state.isLoading = false
      state.managerList = []
    })
    //apply leave
    builder.addCase(ApplyLeaveAction.pending, (state, actions) => {
      state.isLoading = true
    })
    builder.addCase(ApplyLeaveAction.fulfilled, (state, actions) => {
      state.isLoading = false
      state.applyLive = actions.payload
    })
    builder.addCase(ApplyLeaveAction.rejected, (state, actions) => {
      state.isLoading = false
      state.applyLive = {}
    })
  },
})
export default EmployeeManagerSlice.reducer
