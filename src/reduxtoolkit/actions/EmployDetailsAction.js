/* eslint-disable prettier/prettier */
import { createAsyncThunk } from '@reduxjs/toolkit'
import { leaveBaseUrl } from 'src/RootApi'


export const employeeInfoAction = createAsyncThunk("get-employee/details", async()=>{
   const res =  await leaveBaseUrl.get('/wp-jwt/v1/get-user-info')
   //console.log('res=>', res)
   return res.data
})

export const leaveChartAction = createAsyncThunk("get-employee/chart", async()=>{
   const res =  await leaveBaseUrl.get('/wp-jwt/v1/employee-leave-list')
   //console.log('res chat=>', res.data.data[0].casual_leave)
   return res.data.data
})

export const profileImageAction = createAsyncThunk("get-employee/profileimage", async()=>{
   const res =  await leaveBaseUrl.get('/wp-jwt/v1/get-profile-image')
   //console.log('res=>', res)
   return res.data
})