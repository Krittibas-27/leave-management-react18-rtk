/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit'
const { employeeInfoAction, leaveChartAction, profileImageAction } = require('../actions/EmployDetailsAction')

const initialState = {
  isLoading: false,
  empInfo: {},
  leavechart:[],
  profilePicture: {}
}

const EmployeeInfoSlice = createSlice({
  name: 'employee-info',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(employeeInfoAction.pending, (state, actions) => {
      state.isLoading = true
    })
    builder.addCase(employeeInfoAction.fulfilled, (state, actions) => {
      state.isLoading = false
      state.empInfo = actions.payload
    })
    builder.addCase(employeeInfoAction.rejected, (state, actions) => {
      state.isLoading = false
      state.empInfo = {}
    })
    //chart
    builder.addCase(leaveChartAction.pending, (state, actions) => {
      state.isLoading = true
    })
    builder.addCase(leaveChartAction.fulfilled, (state, actions) => {
      state.isLoading = false
      state.leavechart = actions.payload
    })
    builder.addCase(leaveChartAction.rejected, (state, actions) => {
      state.isLoading = false
      state.leavechart = []
    })
    //Profile image
    builder.addCase(profileImageAction.pending, (state, actions) => {
      state.isLoading = true
    })
    builder.addCase(profileImageAction.fulfilled, (state, actions) => {
      state.isLoading = false
      state.profilePicture = actions.payload
    })
    builder.addCase(profileImageAction.rejected, (state, actions) => {
      state.isLoading = false
      state.profilePicture = {}
    })
  },
})
export default EmployeeInfoSlice.reducer