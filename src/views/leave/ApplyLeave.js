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
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import DatePicker from 'react-date-picker'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import {
  ApplyLeaveAction,
  ManagerRelationAction,
} from 'src/reduxtoolkit/actions/ManagerRelationAction'
import moment from 'moment'

const ApplyLeave = () => {
  const dispatch = useDispatch()
  const { managerList } = useSelector((state) => state.managerlist)
  //const { empInfo, isLoading } = useSelector((state) => state.empInfoReducer)

  const [startdate, setStartdate] = useState(new Date())
  const [endtdate, setEnddate] = useState(new Date())
  const [leaveMessage, setLeaveMessage] = useState('')
  const [error, setError] = useState('')
  const [pManager, setPManager] = useState()

  const submitData = () => {
    if (!startdate || !endtdate || !leaveMessage) {
      setError('Please fill all the field')
      toast.error('Please fill all the field', {
        position: toast.POSITION.TOP_RIGHT,
      })
    } else {
      const newLeaveData = {
        start_date: moment(startdate).format('YYYY-MM-DD'),
        end_date: moment(endtdate).format('YYYY-MM-DD'),
        superior_user_id: pManager,
        reason: leaveMessage,
      }
      setError('')
      //console.log('newLeaveData', newLeaveData)
      dispatch(ApplyLeaveAction({ applyLeaveData: newLeaveData }))
        .then((res) => {
          console.log(res)
          if (res.type === 'employee/apply-leave/fulfilled') {
            toast.success('Apply Leave Successfully', {
              position: toast.POSITION.TOP_RIGHT,
            })
            setError('')
          }
        })
        .catch((err) => console.log(err))
    }
  }
  useEffect(() => {
    dispatch(ManagerRelationAction())
  }, [])
  //console.log('startdate', startdate)
  return (
    <>
      <WidgetsDropdown />
      <CCard className="mb-4">
        <CCardHeader>Leave Application for Rahul Kumar</CCardHeader>
        <CCardBody>
          <CForm>
            <CRow>
              <CCol sm={4}>
                <CFormLabel>Start Date</CFormLabel>
                <DatePicker
                  onChange={(startD) => setStartdate(startD)}
                  value={startdate}
                  className="datepicker"
                  format="dd-MM-y"
                  minDate={new Date()}
                />
                <span className="text-danger">{error}</span>
              </CCol>
              <CCol sm={4}>
                <CFormLabel>End Date</CFormLabel>
                <DatePicker
                  onChange={(endD) => setEnddate(endD)}
                  value={endtdate}
                  className="datepicker"
                  format="dd-MM-y"
                  minDate={new Date()}
                />
                <span className="text-danger">{error}</span>
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
                <span className="text-danger">{error}</span>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="mb-3">
                <ReactQuill theme="snow" value={leaveMessage} onChange={setLeaveMessage} />
                <span className="text-danger">{error}</span>
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
