/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { cilChatBubble, cilLowVision } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
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
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { useDispatch } from 'react-redux'
import { ApplyLeaveDetailsAction } from 'src/reduxtoolkit/actions/ApplyLeaveDetailsAction'

const MyDetails = () => {
  const [query, setQuery] = useState('')

  const StatusCell = ({ rows }) => {
    return (
      <>
        {rows.status === '1' ? (
          <CButton size="sm" color="primary">
            Pending
          </CButton>
        ) : rows.status === '2' ? (
          <CButton size="sm" color="success">
            Approved
          </CButton>
        ) : rows.status === '3' ? (
          <CButton size="sm" color="info">
            Info
          </CButton>
        ) : rows.status === '4' ? (
          <CButton size="sm" color="dark">
            Cancelled
          </CButton>
        ) : rows.status === '5' ? (
          <CButton size="sm" color="warning">
            Warning
          </CButton>
        ) : (
          <CButton size="sm" color="danger">
            Rejected
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
            <CBadge color="success" shape="rounded-pill">
              <CIcon icon={cilLowVision} size="xl" />
            </CBadge>{' '}
            &nbsp;
            <CBadge color="danger" shape="rounded-pill" onClick={() => viewChatHandeler(row)}>
              <CIcon icon={cilChatBubble} size="xl" />
            </CBadge>
          </>
        )
      },
    },
    {
      name: 'Action',
      cell: (rows) => <CFormSwitch id="formSwitchCheckDefault" />,
    },
  ]

  const dispatch = useDispatch()
  const [allLeaveDetails, setAllLeaveDetails] = useState()
  const [filterData, setFilterData] = useState()
  const [viewModal, setViewModal] = useState(false)
  const [viewChat, setViewChat] = useState({})

  const leaveDetailsData = () => {
    dispatch(ApplyLeaveDetailsAction()).then((res) => {
      //console.log('details=>', res.payload)
      if(res.type === 'leave/employee-details/fulfilled'){
        setAllLeaveDetails(res.payload.data)
        setFilterData(res.payload.data)
      }
      
    })
  }
  const viewChatHandeler = (data) => {
    //console.log(data)
    setViewModal(true)
    setViewChat(data)
  }
  useEffect(() => {
    const result = allLeaveDetails?.filter((item) => {
      return (
        item.display_name.toLocaleLowerCase().match(query.toLocaleLowerCase()) ||
        item.department?.toLocaleLowerCase().match(query.toLocaleLowerCase())
      )
    })
    setFilterData(result)
    leaveDetailsData()
  }, [query])
console.log(viewChat)
  return (
    <>
      <DataTable
        columns={columns}
        data={filterData && filterData}
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
          <CModalTitle id="LiveDemoExampleLabel">{viewChat.display_name} chat details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol sm className="my-2">
              <CFormInput disabled value={viewChat.display_name} />
            </CCol>
            <CCol sm className="my-2">
              <CFormInput disabled value={viewChat.dept_name}/>
            </CCol>
            <CCol sm className="my-2">
              <CFormInput disabled value={viewChat.status}/>
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
              <CFormTextarea
                rows={2}
                disabled value={viewChat.reason}
              ></CFormTextarea>
            </CCol>
          </CRow>
        </CModalBody>
      </CModal>
    </>
  )
}

export default MyDetails
