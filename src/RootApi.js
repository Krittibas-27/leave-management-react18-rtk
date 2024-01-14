/* eslint-disable prettier/prettier */
import axios from 'axios'
import { managementJsonApi } from './config/BaseUrl'


export const leaveBaseUrl = axios.create({
  baseURL: managementJsonApi
})


//Interceptor for API Authorization

leaveBaseUrl.interceptors.request.use((config)=>{
  const storeUserData = JSON.parse(localStorage.getItem("userData"))
  config.headers.Authorization=storeUserData ? `Bearer ${storeUserData.token}` : ""
  return config
})

export {leaveBaseUrl as default}
