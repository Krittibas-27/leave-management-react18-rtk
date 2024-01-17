/* eslint-disable prettier/prettier */

import { createAsyncThunk } from '@reduxjs/toolkit'
import leaveBaseUrl from 'src/RootApi'

export const ApplyLeaveDetailsAction = createAsyncThunk("leave/employee-details", async()=>{
    const res = await leaveBaseUrl.get('/wp-jwt/v1/apply-leave-details')
    //console.log('res',res)
    return res.data.data.reverse()
  })