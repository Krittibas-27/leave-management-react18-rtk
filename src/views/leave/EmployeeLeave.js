/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import { cilChatBubble, cilLowVision } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { GoPencil } from "react-icons/go";
import {
  CBadge,
  CButton,
  CCol,
  CFormInput,
  CFormSwitch,
  CFormTextarea,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
  CTooltip,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux'
import SpinnerComponent from 'src/components/SpinnerComponent'
import { AppliedLeaveDetails, ApplyLeaveDetailsAction, GetChatComment, PostChatComment } from 'src/reduxtoolkit/actions/ApplyLeaveDetailsAction'
import { FiEye } from "react-icons/fi";
import { BsChatDots } from "react-icons/bs";
import ReactQuill from 'react-quill'
import Chatboat from '../chatboat'
import { IoClose } from 'react-icons/io5'
import { IoIosSend } from 'react-icons/io'
import moment from 'moment'

const EmployeeLeave = () => {
  const [query, setQuery] = useState('')
  const [chatboatShow, setChatboatShow] = useState(false)
  const [chatText, setChatText] = useState('')
  const [chatRowdata, setChatRowdata] = useState([])

  const StatusCell = ({ rows }) => {
    return (
      <>
        {rows.status === '0' ? (
          <CButton size="sm" color="primary" className='w-100'>
            Pending
          </CButton>
        ) : rows.status === '1' ? (
          <CButton size="sm" color="success" className='w-100'>
            Approved
          </CButton>
        ) : rows.status === '2' ? (
          <CButton size="sm" color="danger" className='w-100'>
            Rejected
          </CButton>
        ) : rows.status === '3' ? (
          <CButton size="sm" color="secondary" className='w-100'>
            On hold
          </CButton>
        ) : rows.status === '4' ? (
          <CButton size="sm" color="info" className='w-100'>
            Modified
          </CButton>
        ) : (
          <CButton size="sm" color="dark" className='w-100'>
            Cancelled
          </CButton>
        )}
      </>
    )
  }

  const columns = [
    {
      name: 'Sl. No.',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'Project Manager',
      selector: (row) => row.display_name,
    },
    {
      name: 'Department',
      selector: (row) => row.dept_name,
    },
    {
      name: 'Start Date',
      selector: (row) => row.start_date,
    },
    {
      name: 'End Date',
      selector: (row) => row.end_date,
    },
    {
      name: 'Status',
      cell: (rows) => <StatusCell rows={rows} />,
    },
    {
      name: 'View/Chat',
      selector: (row) => row.year,
      cell: (row) => {
        //console.log("row", row)
        return (
          <>
            <CTooltip content="Employee leave application details" placement="top">
              <CBadge color="success" shape="rounded-pill" className='leavewView'  onClick={() => leaveViewHandeler(row)}>
                <FiEye  size="22px" />
              </CBadge>
            </CTooltip>
            &nbsp;
            <CTooltip content="Employee leave edit" placement="top">
              <CBadge color="primary" shape="rounded-pill"  className='leavewView' onClick={()=>chatboatHandeler(row)}>
                <GoPencil size="22px" />
              </CBadge>
            </CTooltip>
            &nbsp;
            <CTooltip content="Employee & Manager chat details" placement="top">
              <CBadge color="danger" shape="rounded-pill"  className='leavewView' onClick={()=>chatboatHandeler(row)}>
                <BsChatDots size="22px" />
              </CBadge>
            </CTooltip>
          </>
        )
      },
    },
    {
      name: 'Action',
      cell: (rows) => {
        return (
            <>
            <CFormSwitch id="formSwitchCheckDefault" />&nbsp;
            <CFormSwitch id="formSwitchCheckDefault" />
            </>
        )
      },
    },
    
  ]
 
  const dispatch = useDispatch()
  const { isLoading } = useSelector((state) => state.leaveDetails)
  const [allLeaveDetails, setAllLeaveDetails] = useState()
  const [filterData, setFilterData] = useState()
  const [viewModal, setViewModal] = useState(false)
  const [viewChat, setViewChat] = useState({})
  const [roeId, setRowId] = useState(null)
  const modules = {
    "toolbar": false
  };
  
  const appliedLeaveDetails = () => {
    dispatch(AppliedLeaveDetails()).then((res) => {
      if (res.type === 'applied-leave/details/fulfilled') {
        console.log(res.payload)
        setAllLeaveDetails(res.payload)
        setFilterData(res.payload)
      }
    })
  }
  const leaveViewHandeler = (data) => {
    setViewModal(true)
    setViewChat(data)
  }
  const statusToName=(emStatus)=>{
    //console.log('emStatus', emStatus)
    if(emStatus === "0"){
      return "Pending"
    }else if(emStatus === "1"){
      return "Approved"
    }else if(emStatus === "2"){
      return "Rejected"
    }else if(emStatus === "3"){
      return "On Hold"
    }else if(emStatus === "4"){
      return "Modified"
    }else {
      return "Cancelled"
    }
  }

  const chatboatHandeler=(rowData)=>{
    setChatRowdata([])
    setChatboatShow(true)
    setRowId(rowData.id)
    dispatch(GetChatComment({ emId: rowData.id })).then((res) => {
      if (res.type === 'employee/get-comment/fulfilled') {
        setChatRowdata(res.payload)
      }
    }).catch((err)=>console.log(err))
  }

  const submitComment=()=>{
    const newdata = {
      comment : chatText
    }
    dispatch(PostChatComment({pId: roeId, pData: newdata}))
    setChatText('')
  }
  
  useEffect(() => {
    appliedLeaveDetails()
  }, [])

  useEffect(() => {
    const result = allLeaveDetails?.filter((item) => {
      return (
        item?.display_name?.toLocaleLowerCase().match(query.toLocaleLowerCase()) ||
        item?.dept_name?.toLocaleLowerCase().match(query.toLocaleLowerCase()) 
      )
    })
    setFilterData(result)
  }, [query])
  //console.log('chatRowdata=>', chatRowdata)
  return (
    <>
    
      
      <DataTable
        title="Employee Leave Request List"
        fixedHeader
        columns={columns}
        data={filterData && filterData}
        progressPending={isLoading}
        progressComponent={<SpinnerComponent/>}
        pagination
        responsive
        subHeader
        subHeaderComponent={
          <>
            <CFormInput
              type="text"
              placeholder="Search"
              className="w-25"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            &nbsp;
            <CButton size="sm" color="primary" onClick={() => setQuery('')}>
              Reset
            </CButton>
          </>
        }
        subHeaderAlign="center"
      />

      <CModal
        visible={viewModal}
        onClose={() => setViewModal(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader onClose={() => setViewModal(false)}>
          <CModalTitle id="LiveDemoExampleLabel">View Leave details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <h6>[P.M. - {viewChat.display_name}]</h6>
          <CRow>
            <CCol sm className="my-2">
              <CFormInput disabled value={viewChat.display_name} />
            </CCol>
            <CCol sm className="my-2">
              <CFormInput disabled value={viewChat.dept_name} />
            </CCol>
            <CCol sm className="my-2">
              <CFormInput disabled value={statusToName(viewChat.status)} />
            </CCol>
          </CRow>
          <CRow>
            <CCol sm className="my-2">
              <CFormInput disabled value={viewChat.start_date} />
            </CCol>
            <CCol sm className="my-2">
              <CFormInput disabled value={viewChat.end_date} />
            </CCol>
          </CRow>
          <CRow>
            <CCol sm className="my-2">
              <ReactQuill modules={modules} value={viewChat.reason} readOnly="true"  />
            </CCol>
          </CRow>
        </CModalBody>
      </CModal>

        {
          chatboatShow ? 
          <div className="chatbot">
        <header className="items-center">
          <h2>Chatbot</h2>
          <span className="close-btn" onClick={() => setChatboatShow(false)}>
            <IoClose />
          </span>
        </header>
        <ul className="chatbox">
          {
            isLoading ? <SpinnerComponent /> :
             chatRowdata && chatRowdata.map((data, i)=>{
              return (
                <>
                {
                  data.role === "employee" ?
                  <li key={i} className="chat incoming">
                    <span className="material-symbols-outlined">{data.display_name}</span>
                    <div className="date_sec">
                      <div className="date_zone">{moment(data.date).format('DD-MM-YYYY, h:mm:ss a')}</div>
                      <p>{data.chat}</p>
                    </div>
                  </li> 
                  :
                  <li key={i} className="chat outgoing">
                  <div className="date_sec">
                    <div className="date_zone alignRight">{moment(data.date).format('DD-MM-YYYY, h:mm:ss a')}</div>
                    <p>{data.chat}</p>
                  </div>
                  <span className="material-symbols-outlined">{data.display_name}</span>
                </li>
                }
                </>
              )
             })
          }
        </ul>
        <div className="chat-input">
          <CFormTextarea
            className="textarea"
            rows={3}
            placeholder="Enter a message..."
            value={chatText}
            onChange={(e) => setChatText(e.target.value)}
          />
          <CButton variant="none" disabled={chatText.length === 0 ? true : false} onClick={()=>submitComment()}>
            <IoIosSend />
          </CButton>
        </div>
          </div>
          : null
        }
      
      {/* {
      chatboatShow ? <Chatboat setChatboatShow={setChatboatShow}  chatRowdata={chatRowdata} /> : null
    } */}
    </>
  )
}

export default EmployeeLeave