/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit'
import { empLogin, forgetPass, getEmpRole, rigisterManagement } from '../actions/LeaveMaganeAction'

const initialState = {
  isLoading: false,
  isError: false,
  rigisterList: {},
  loginUser: {},
  message: '',
  userRole: {},
}
const leaveManagemwntSlice = createSlice({
  name: 'managementSlice',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(rigisterManagement.pending, (state, actions) => {
      state.isLoading = true
    })
    builder.addCase(rigisterManagement.fulfilled, (state, actions) => {
      state.isLoading = false
      state.rigisterList = actions.payload
      state.message = 'Register Successful'
    })
    builder.addCase(rigisterManagement.rejected, (state, actions) => {
      state.isLoading = false
      state.isError = true
      state.rigisterList = {}
      state.message = 'Somting went wrong'
    })
    //login
    builder.addCase(empLogin.pending, (state, actions) => {
      state.isLoading = true
    })
    builder.addCase(empLogin.fulfilled, (state, actions) => {
      state.isLoading = false
      state.loginUser = actions.payload
      state.message = 'Login Successful'
    })
    builder.addCase(empLogin.rejected, (state, actions) => {
      state.isLoading = false
      state.isError = true
      state.loginUser =  {}
      state.message = 'Somting went wrong'
    })
    //forgetpass
    builder.addCase(forgetPass.pending, (state, actions) => {
      state.isLoading = true
    })
    builder.addCase(forgetPass.fulfilled, (state, actions) => {
      state.isLoading = false
      state.rigisterList = actions.payload
      state.message = 'Password reset Successful'
    })
    builder.addCase(forgetPass.rejected, (state, actions) => {
      state.isLoading = false
      state.isError = true
      state.message = 'Somting went wrong'
    })
    //get role
    builder.addCase(getEmpRole.pending, (state, actions) => {
      state.isLoading = true
    })
    builder.addCase(getEmpRole.fulfilled, (state, actions) => {
      state.isLoading = false
      state.userRole = actions.payload
    })
    builder.addCase(getEmpRole.rejected, (state, actions) => {
      state.isLoading = false
      state.userRole = {}
    })
  },
})

export default leaveManagemwntSlice.reducer
