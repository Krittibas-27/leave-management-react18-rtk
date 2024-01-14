/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilX, cilCheckAlt } from '@coreui/icons'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { forgetPass } from 'src/reduxtoolkit/actions/LeaveMaganeAction'

const ForgetPassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading } = useSelector((state) => state.leaveRedcer)
  const [userLogin, setUserLogin] = useState({
    userName: '',
    userPass: '',
    repeatPass: '',
  })
  const [showPass, setShowPass] = useState(false)
  const clickHandler = () => {
    setShowPass((prev) => !prev)
  }
  const [confirmShowPass, setConfirmShowPass] = useState(false)
  const confirmHandler = () => {
    setConfirmShowPass((prev) => !prev)
  }
  const loginSubmit = (e) => {
    const newDate = {
      user_login: userLogin.userName,
      new_password: userLogin.userPass,
      confirm_password: userLogin.repeatPass,
    }
    dispatch(forgetPass({ forgetPassDataa: newDate })).then((res) => {
      if (res.payload.status === 0) {
        toast.warning(res.payload.message, {
          position: toast.POSITION.TOP_RIGHT,
        })
      }
      if (res.payload.status === 1) {
        toast.success(res.payload.message, {
          position: toast.POSITION.TOP_RIGHT,
        })
        navigate('/')
      }
    })
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <h2 className="text-center">Leave Management</h2>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Forget Password</h1>
                    <p className="text-medium-emphasis">Verify Account</p>
                    <CInputGroup className="mt-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username or Email"
                        value={userLogin.userName}
                        onChange={(e) => setUserLogin({ ...userLogin, userName: e.target.value })}
                      />
                    </CInputGroup>

                    <CInputGroup className="mt-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type={showPass ? 'text' : 'password'}
                        placeholder="Enter New Password"
                        value={userLogin.userPass}
                        onChange={(e) => setUserLogin({ ...userLogin, userPass: e.target.value })}
                      />
                      <CInputGroupText onClick={() => clickHandler()}>
                        {showPass ? <CIcon icon={cilCheckAlt} /> : <CIcon icon={cilX} />}
                      </CInputGroupText>
                    </CInputGroup>

                    <CInputGroup className="mt-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type={confirmShowPass ? 'text' : 'password'}
                        placeholder="Repeat Password"
                        value={userLogin.repeatPass}
                        onChange={(e) => setUserLogin({ ...userLogin, repeatPass: e.target.value })}
                      />
                      <CInputGroupText onClick={() => confirmHandler()}>
                        {confirmShowPass ? <CIcon icon={cilCheckAlt} /> : <CIcon icon={cilX} />}
                      </CInputGroupText>
                    </CInputGroup>

                    <CRow className="mt-4">
                      <CCol xs={4}>
                        <CButton
                          type="button"
                          color="primary"
                          className="px-4"
                          onClick={loginSubmit}
                        >
                          {isLoading ? 'Loading...' : 'Submit'}
                        </CButton>
                      </CCol>
                      <CCol xs={8} className="text-right d-flex align-items-center">
                        <span>Have an account</span>
                        <Link color="link" className="px-2" to="/login">
                          Login
                        </Link>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '34%' }}>
                <CCardBody className="text-center">
                  <h2>Sign up</h2>
                  <Link to="/register">
                    <CButton color="primary" className="mt-3" active tabIndex={-1}>
                      Register Now!
                    </CButton>
                  </Link>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default ForgetPassword
