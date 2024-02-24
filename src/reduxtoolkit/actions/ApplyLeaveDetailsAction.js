/* eslint-disable prettier/prettier */

import { createAsyncThunk } from '@reduxjs/toolkit'
import leaveBaseUrl from 'src/RootApi'

export const ApplyLeaveDetailsAction = createAsyncThunk("leave/employee-details", async()=>{
    const res = await leaveBaseUrl.get('/wp-jwt/v1/apply-leave-details')
    //console.log('res',res)
    return res.data.data.reverse()
  })

  export const GetChatComment = createAsyncThunk('employee/get-comment', async({emId})=>{
    //console.log('emId=>',emId)
    const res = await leaveBaseUrl.get(`/wp-jwt/v1/get-comment/${emId}`)
    //console.log(res.data.data)
    return res.data.data
  })

  export const PostChatComment = createAsyncThunk('employee/post-comment', async({pId, pData})=>{
    console.log('pId=>', pId)
    console.log('pData=>', pData)
    const res = await leaveBaseUrl.post(`/wp-jwt/v1/comment/${pId}`, pData)
    console.log("postdata", res.data)
    return res.data
  })

  export const AppliedLeaveDetails = createAsyncThunk("applied-leave/details", async()=>{
    const res = await leaveBaseUrl.get('/wp-jwt/v1/applied-leave-details')
    //console.log('res',res)
    return res.data.data.reverse()
  })