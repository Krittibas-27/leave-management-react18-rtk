import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CImage,
  CListGroup,
  CListGroupItem,
  CRow,
} from '@coreui/react'
import { CChartPie } from '@coreui/react-chartjs'

import { useDispatch, useSelector } from 'react-redux'
import {
  employeeInfoAction,
  leaveChartAction,
  profileImageAction,
} from 'src/reduxtoolkit/actions/EmployDetailsAction'
import Avatar from 'react-avatar'
import SpinnerComponent from 'src/components/SpinnerComponent'

const Dashboard = () => {
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

  //const [empInfo, setEmpInfo] = useState({})
  const [leaveChart, setLeaveChart] = useState([])
  const [profileImg, setProfileImg] = useState({})
  const dispatch = useDispatch()
  const { empInfo, isLoading } = useSelector((state) => state.empInfoReducer)

  const gerEmpDetails = () => {
    dispatch(employeeInfoAction())
    dispatch(leaveChartAction()).then((res) => {
      //console.log(res.payload)
      if (res.type === 'get-employee/chart/fulfilled') {
        setLeaveChart(res.payload)
      }
    })
    dispatch(profileImageAction()).then((res) => {
      ///console.log('res=>', res)
      if (res.type === 'get-employee/profileimage/fulfilled') {
        setProfileImg(res.payload.data)
      }
    })
  }
  const storaeData = JSON.parse(localStorage.getItem('userData'))
  useEffect(() => {
    gerEmpDetails()
  }, [])
  //console.log('leaveChart=>', leaveChart[0]?.casual_leave)
  return (
    <>
      <CRow>
        <CCol xs={6}>
          <CCard className="mb-4">
            <CCardHeader>Leave Count Chart</CCardHeader>
            <CCardBody>
              {isLoading ? (
                <SpinnerComponent />
              ) : (
                <CChartPie
                  data={{
                    labels: ['Casual Leaves', 'Earn Leaves', 'Sick Leaves'],
                    datasets: [
                      {
                        data: [
                          leaveChart[0]?.casual_leave,
                          leaveChart[0]?.earn_leave,
                          leaveChart[0]?.sick_leave,
                        ],
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                      },
                    ],
                  }}
                />
              )}
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={6}>
          <CCard>
            <CCardHeader className="text-center">User Details of Employee</CCardHeader>
            <CCardBody className="text-center">
              {profileImg.url ? (
                <CImage src={profileImg.url} tyle={{ width: '50px' }} />
              ) : (
                <Avatar
                  size="80"
                  round={true}
                  color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])}
                  name={storaeData && storaeData.user_display_name}
                  textSizeRatio={1}
                  className="ms-3"
                />
              )}
            </CCardBody>
            {isLoading ? (
              <SpinnerComponent />
            ) : (
              <CListGroup>
                <CListGroupItem>
                  <strong>
                    Name : {empInfo?.data?.first_name + ' ' + empInfo?.data?.last_name}
                  </strong>
                </CListGroupItem>
                {empInfo?.data?.designation && (
                  <CListGroupItem>Designation : {empInfo?.data?.designation}</CListGroupItem>
                )}
                {empInfo?.data?.department && (
                  <CListGroupItem>Department : {empInfo?.data?.department}</CListGroupItem>
                )}
                {empInfo?.data?.emargency_contact_number && (
                  <CListGroupItem>
                    Contact : {empInfo?.data?.emargency_contact_number}
                  </CListGroupItem>
                )}
                {empInfo?.data?.address && (
                  <CListGroupItem>Address : {empInfo?.data?.address}</CListGroupItem>
                )}
              </CListGroup>
            )}
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
