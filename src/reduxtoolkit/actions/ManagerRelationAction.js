/* eslint-disable prettier/prettier */
import { createAsyncThunk } from '@reduxjs/toolkit'
import leaveBaseUrl from 'src/RootApi'

export const ManagerRelationAction = createAsyncThunk('manager/employee-relation', async()=>{
    const res = await leaveBaseUrl.get('/wp-jwt/v1/employee-projectmanager-relation')
    //console.log(res)
    return res.data.data
})

export const ApplyLeaveAction = createAsyncThunk('employee/apply-leave', async({applyLeaveData})=>{
    const res = await leaveBaseUrl.post('/wp-jwt/v1/apply-leave', applyLeaveData)
    //console.log(res)
    return res.data.data
})