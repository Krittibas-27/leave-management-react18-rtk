/* eslint-disable prettier/prettier */
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import ReactQuill from 'react-quill'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import {
  ApplyLeaveAction,
  ManagerRelationAction,
} from 'src/reduxtoolkit/actions/ManagerRelationAction'
import moment from 'moment'

import DatePicker from "react-datepicker";
import { FaRegCalendarAlt } from "react-icons/fa";
import { ApplyLeaveValidationReg } from './ApplyLeaveValidationReg'

const ApplyLeave = () => {
  const storaeData = JSON.parse(localStorage.getItem('userData'))
  const dispatch = useDispatch()
  const { managerList } = useSelector((state) => state.managerlist)
  
  const [startdate, setStartdate] = useState(new Date())
  const [endtdate, setEnddate] = useState(new Date())
  const [leaveMessage, setLeaveMessage] = useState('')
  const [pManager, setPManager] = useState('')
  const [errMsg, setErrMsg] = useState({})

  const isWeekday = (date) => {
    const day = date.getDay()
    return day !== 0 
  }
  const holiday = [
    { date: "2024-01-23", holidayName: "Netaji Birthday" },
    { date: "2024-01-26", holidayName: "Republic Day of India" },
    { date: "2024-02-14", holidayName: "Saraswati Puja" },
    { date: "2024-12-25", holidayName: "Christmas" },
  ]
  const submitData = () => {
    setErrMsg(ApplyLeaveValidationReg(startdate,endtdate,pManager,leaveMessage))
    if(Object.keys(ApplyLeaveValidationReg(startdate,endtdate,pManager,leaveMessage)).length === 0){
      const newLeaveData = {
        start_date: moment(startdate).format('YYYY-MM-DD'),
        end_date: moment(endtdate).format('YYYY-MM-DD'),
        superior_user_id: pManager,
        reason: leaveMessage,
      }
      console.log(newLeaveData)
      dispatch(ApplyLeaveAction({ applyLeaveData: newLeaveData }))
      .then((res) => {
        console.log(res)
        if (res.type === 'employee/apply-leave/fulfilled') {
          toast.success('Apply Leave Successfully', {
            position: toast.POSITION.TOP_RIGHT,
          })
          setLeaveMessage('')
          setPManager('')
        }
      }).catch((err)=>console.log(err))
    }
  }

  useEffect(() => {
    dispatch(ManagerRelationAction())
  }, [])

  //console.log('errMsg->', errMsg)
  return (
    <>
      
      <WidgetsDropdown />
      <CCard className="mb-4">
        <CCardHeader>Leave Application for {storaeData && storaeData.user_display_name}</CCardHeader>
        <CCardBody>
          <CForm>
            <CRow>
              <CCol sm={4}>
                <CFormLabel>Start Date</CFormLabel><br/>
                <DatePicker
                  className='form-control'
                  showIcon
                  toggleCalendarOnIconClick
                  icon={<FaRegCalendarAlt className='cal_icon' />}
                  isClearable
                  placeholderText="dd/mm/yyyy"
                  popperPlacement='top-end'
                  minDate={new Date()}
                  shouldCloseOnSelect={false}
                  dateFormat="yyyy/MM/dd"
                  filterDate={isWeekday}
                  holidays={holiday}
                  selected={startdate}
                  onChange={(date) => setStartdate(date)} 
                  >
                  <div style={{ color: "red",textAlign:"center" }}>Please check holiday before select</div>
                  </DatePicker>
                  {errMsg.startdate && <span className="text-danger">{errMsg.startdate}</span>}
              </CCol>
              <CCol sm={4}>
                <CFormLabel>End Date</CFormLabel><br/>
                <DatePicker
                  className='form-control'
                  showIcon
                  toggleCalendarOnIconClick
                  icon={<FaRegCalendarAlt className='cal_icon' />}
                  isClearable
                  placeholderText="dd/mm/yyyy"
                  popperPlacement='top-end'
                  minDate={new Date()}
                  shouldCloseOnSelect={false}
                  dateFormat="yyyy/MM/dd"
                  filterDate={isWeekday}
                  holidays={holiday}
                  selected={endtdate}
                  onChange={(date) => setEnddate(date)} 
                  >
                  <div style={{ color: "red",textAlign:"center" }}>Please check holiday before select</div>
                  </DatePicker>
                  {errMsg.endtdate && <span className="text-danger">{errMsg.endtdate}</span>}
              </CCol>
              <CCol sm={4} className="mb-3">
                <CFormLabel>Project Manager / Superior</CFormLabel>
                <CFormSelect
                  size="sm"
                  value={pManager}
                  onChange={(e) => setPManager(e.target.value)}
                >
                  <option value="">Select manager</option>
                  {managerList &&
                    managerList.map((list, i) => {
                      return (
                        <option key={i} value={list.id}>
                          {list.name}
                        </option>
                      )
                    })}
                </CFormSelect>
                {errMsg.pManager && <span className="text-danger">{errMsg.pManager}</span>}
              </CCol>
            </CRow>
            <CRow>
              <CCol className="mb-3">
                <ReactQuill theme="snow" value={leaveMessage} onChange={setLeaveMessage} />
                {errMsg.leaveMessage && <span className="text-danger">{errMsg.leaveMessage}</span>}
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="auto" className="mb-3">
                <CButton type="button" onClick={submitData}>
                  Submit
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>


    </>
  )
}

export default ApplyLeave
