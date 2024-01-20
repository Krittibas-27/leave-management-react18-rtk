/* eslint-disable prettier/prettier */
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardText,
  CCardTitle,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CImage,
  CLink,
  CRow,
} from '@coreui/react'
import { cilCloudDownload } from '@coreui/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  employeeInfoAction,
  profileImageAction,
} from 'src/reduxtoolkit/actions/EmployDetailsAction'
import Avatar from 'react-avatar'
import SpinnerComponent from 'src/components/SpinnerComponent'
import CIcon from '@coreui/icons-react'
import DatePicker from "react-datepicker";
import { FaRegCalendarAlt } from 'react-icons/fa'
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Link } from 'react-router-dom'

const ViewProfile = () => {
  const animatedComponents = makeAnimated();
  const { isLoading, empInfo, profilePicture } = useSelector((state) => state.empInfoReducer)
  //useSelector(state => console.log(state))
  const dispatch = useDispatch()
  const storaeData = JSON.parse(localStorage.getItem('userData'))
  const skillOptions = [
    {
      value: "angular",
      label: "Angular",
    },
    {
      value: "node",
      label: "Node",
    },
    {
      value: "react",
      label: "React",
    },
    {
      value: "vue",
      label: "Vue",
    },
  ];

  const [dob, setDob] = useState()
  useEffect(() => {
    dispatch(employeeInfoAction())
    dispatch(profileImageAction())
  }, [])

  return (
    <>
      <CRow>
        <CCol lg={8}>
          <CCard>
            <CCardHeader className="justify-content-between d-flex"><div>User Profile</div> <CButton color='danger' size='sm'><CIcon icon={cilCloudDownload} size="sm" /> Download Profile</CButton></CCardHeader>
            <CCardBody>
              <CForm>
                <CRow>
                  <CCol sm={6} className='my-2'>
                    <CFormInput type="text" label="FIrst Name" placeholder="Rahul" />
                  </CCol>
                  <CCol sm={6}  className='my-2'>
                    <CFormInput type="text" label="Last Name" placeholder="Kumar" />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm={6} className='my-2'>
                    <CFormInput type="text" label="Department" placeholder="Font end" />
                  </CCol>
                  <CCol sm={6}  className='my-2'>
                    <CFormInput type="text" label="Employee ID" placeholder="Employee Id" />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm={6} className='my-2'>
                    <CFormInput type="text" label="Email Address" placeholder="rahul@gmail.com" />
                  </CCol>
                  <CCol sm={6}  className='my-2'>
                    <CFormInput type="text" label="Personal Email Address" placeholder="rahul@gmail.com" />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm={4} className='my-2'>
                    <CFormLabel>Date of Birth</CFormLabel><br/>
                    <DatePicker
                      className='form-control'
                      showIcon
                      icon={<FaRegCalendarAlt className='cal_icon' />}
                      isClearable
                      placeholderText="dd/mm/yyyy"
                      popperPlacement='top-end'
                      minDate={new Date()}
                      dateFormat="yyyy/MM/dd"
                      selected={dob}
                      onChange={(date) => setDob(date)} 
                      />
                  </CCol>
                  <CCol sm={4}  className='my-2'>
                  <CFormLabel>Date of Joining</CFormLabel><br/>
                    <DatePicker
                      className='form-control'
                      showIcon
                      icon={<FaRegCalendarAlt className='cal_icon' />}
                      isClearable
                      placeholderText="dd/mm/yyyy"
                      popperPlacement='top-end'
                      minDate={new Date()}
                      dateFormat="yyyy/MM/dd"
                      selected={dob}
                      onChange={(date) => setDob(date)} 
                      disabled
                      />
                  </CCol>
                  <CCol sm={4}  className='my-2'>
                    <CFormInput type="text" label="Blood Group" placeholder="0-" />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm={6} className='my-2'>
                    <CFormInput type="text" label="UAN No." placeholder="454878921456321" />
                  </CCol>
                  <CCol sm={6}  className='my-2'>
                    <CFormInput type="text" label="Salary Bank No." placeholder="Salary Bank No." />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm={6} className='my-2'>
                    <CFormInput type="text" label="Experience" placeholder="3 years" />
                  </CCol>
                  <CCol sm={6}  className='my-2'>
                    <CFormInput type="text" label="Address" placeholder="Kolkata" />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm={6} className='my-2'>
                    <CFormInput type="text" label="Emergency COntact No" placeholder="45879652" />
                  </CCol>
                  <CCol sm={6}  className='my-2'>
                    <CFormLabel>Resume (CV)</CFormLabel><br/>
                    <CFormInput type="file"  placeholder="upload resume" />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm={12} className='my-2'>
                  <CFormLabel>Resume (CV)</CFormLabel><br/>
                    <Select
                      isMulti
                      options={skillOptions}
                      components={animatedComponents}
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm={6} className='my-2'>
                    <CButton type='button' color='primary'>Submit</CButton>
                  </CCol>
                  <CCol sm={6}  className='my-2 text-right'>
                    <Link color="link" to="/user/forget-password">Forget Password</Link>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol lg={4}>
          <CCard>
            <CCardBody className="text-center">
              {profilePicture?.data?.url ? (
                <CImage src={profilePicture?.data?.url} tyle={{ width: '50px' }} />
              ) : (
                <Avatar
                  size="80"
                  round={true}
                  color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])}
                  name={storaeData && storaeData?.user_display_name}
                  textSizeRatio={1}
                  className="ms-3"
                />
              )}
              {isLoading ? (
                <SpinnerComponent />
              ) : (
                <>
                  <CCardTitle className="mt-3">{`${empInfo?.data?.first_name} ${empInfo?.data?.last_name}`}</CCardTitle>
                  <CCardText>{empInfo?.data?.designation}</CCardText>
                  <CCardText>{empInfo?.data?.department}</CCardText>
                  <CFormInput type="file" placeholder="upload" />
                </>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default ViewProfile
