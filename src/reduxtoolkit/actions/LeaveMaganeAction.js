/* eslint-disable prettier/prettier */
import { createAsyncThunk } from '@reduxjs/toolkit'
import { leaveBaseUrl } from '../../RootApi'

export const rigisterManagement = createAsyncThunk("employee/register", async({regisData})=>{
  const res = await leaveBaseUrl.post('/wp-jwt/v1/create-new-user', regisData)
  return res.data
})

export const empLogin = createAsyncThunk("employee/login", async({loginData})=>{
  const res = await leaveBaseUrl.post('/jwt-auth/v1/token', loginData)
  return res.data
})
export const forgetPass = createAsyncThunk("employee/forgetpass", async({forgetPassDataa})=>{
  const res = await leaveBaseUrl.post('/wp-jwt/v1/forgot-password', forgetPassDataa)
  return res.data
})

