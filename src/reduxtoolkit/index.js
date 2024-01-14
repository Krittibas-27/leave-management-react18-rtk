/* eslint-disable prettier/prettier */
import { configureStore } from '@reduxjs/toolkit'
import leaveManagemwntSlice from '../reduxtoolkit/slices/LeaveSlice'
import ApplyLeaveDetailsSlice from './slices/ApplyLeaveDetailsSlice'
import EmployeeInfoSlice from './slices/EmployeeInfoSlice'
import EmployeeManagerSlice from './slices/ManagerRelationSlice'


export const store = configureStore({
  reducer: {
    leaveRedcer: leaveManagemwntSlice,
    empInfoReducer : EmployeeInfoSlice,
    leaveDetails: ApplyLeaveDetailsSlice,
    managerlist : EmployeeManagerSlice
  },
})
