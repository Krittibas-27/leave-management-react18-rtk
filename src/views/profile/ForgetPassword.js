/* eslint-disable prettier/prettier */
import { cilLockLocked} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CCard, CCardBody, CCardGroup, CCardHeader, CCol, CForm, CFormInput, CInputGroup, CInputGroupText, CRow } from '@coreui/react'
import React, { useState } from 'react'
import { FiEye, FiEyeOff } from "react-icons/fi";

const ForgetPassword = () => {
    const [showPass, setShowPass] = useState(false)
    const [showConfirmPass, setShowConfirmPass] = useState(false)
    const clickHandler = () => {
        setShowPass((prev) => !prev)
    }
    const clickRepeatHandler = () => {
        setShowConfirmPass((prev) => !prev)
    }
  return (
    <>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard>
              <CCardHeader>Forget Password</CCardHeader>
                <CCardBody>
                  <CForm>
                  <CInputGroup className="mt-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type={showPass ? 'text' : 'password'}
                        placeholder="New Password"
                      />
                      <CInputGroupText onClick={() => clickHandler()}>
                        {showPass ? <FiEye /> : <FiEyeOff />}
                      </CInputGroupText>
                    </CInputGroup>

                    <CInputGroup className="mt-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type={showConfirmPass ? 'text' : 'password'}
                        placeholder="Repeat New Password"
                      />
                      <CInputGroupText onClick={() => clickRepeatHandler()}>
                        {showConfirmPass ? <FiEye /> : <FiEyeOff />}
                      </CInputGroupText>
                    </CInputGroup>
                    <CRow className="mt-4">
                      <CCol>
                        <CButton
                          type="button"
                          color="primary"
                          className="px-4"
                        >
                          Submit
                        </CButton>
                      </CCol>
                      
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              
            </CCardGroup>
          </CCol>
        </CRow>
    </>
  )
}

export default ForgetPassword
