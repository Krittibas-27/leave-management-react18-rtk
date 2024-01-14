import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
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
import { Link, useNavigate } from 'react-router-dom'
import { ValidationRgx } from 'src/components/ValidationRgx'
import { useDispatch, useSelector } from 'react-redux'
import { rigisterManagement } from 'src/reduxtoolkit/actions/LeaveMaganeAction'
import { toast } from 'react-toastify'

const Register = () => {
  const { isLoading } = useSelector((state) => state.leaveRedcer)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [userResigter, setUserResigter] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    registerEmail: '',
    password: '',
    confirmPassword: '',
  })
  const [errMsg, setErrMsg] = useState({})
  const [showPass, setShowPass] = useState(false)
  const clickHandler = () => {
    setShowPass((prev) => !prev)
  }
  const [confirmShowPass, setConfirmShowPass] = useState(false)
  const confirmHandler = () => {
    setConfirmShowPass((prev) => !prev)
  }
  const handelSubmit = (e) => {
    e.preventDefault()
    setErrMsg(ValidationRgx(userResigter))
    if (Object.keys(ValidationRgx(userResigter)).length === 0) {
      const newData = {
        username: userResigter.userName,
        first_name: userResigter.firstName,
        last_name: userResigter.lastName,
        email: userResigter.registerEmail,
        password: userResigter.password,
      }
      //console.log('newData=>', newData)
      dispatch(rigisterManagement({ regisData: newData })).then((res) => {
        // console.log(res.payload.status)
        if (res.payload.status === 0) {
          toast.warning(res.payload.message, {
            position: toast.POSITION.TOP_RIGHT,
          })
        }
        if (res.payload.status === 1) {
          toast.success(res.payload.message, {
            position: toast.POSITION.TOP_RIGHT,
          })
          navigate('/login')
        }
      })
    }
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <h2 className="text-center">Leave Management</h2>
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handelSubmit}>
                  <h4>Register</h4>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mt-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Enter Username"
                      value={userResigter.userName}
                      onChange={(e) =>
                        setUserResigter({ ...userResigter, userName: e.target.value })
                      }
                    />
                  </CInputGroup>
                  {errMsg.userName && <span className="text-danger">{errMsg.userName}</span>}
                  <CRow className="justify-content-center">
                    <CCol md={6}>
                      <CInputGroup className="mt-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Firstname"
                          value={userResigter.firstName}
                          onChange={(e) =>
                            setUserResigter({ ...userResigter, firstName: e.target.value })
                          }
                        />
                      </CInputGroup>
                      {errMsg.firstName && <span className="text-danger">{errMsg.firstName}</span>}
                    </CCol>
                    <CCol md={6}>
                      <CInputGroup className="mt-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Lastname"
                          value={userResigter.lastName}
                          onChange={(e) =>
                            setUserResigter({ ...userResigter, lastName: e.target.value })
                          }
                        />
                      </CInputGroup>
                      {errMsg.lastName && <span className="text-danger">{errMsg.lastName}</span>}
                    </CCol>
                  </CRow>
                  <CInputGroup className="mt-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      value={userResigter.registerEmail}
                      onChange={(e) =>
                        setUserResigter({ ...userResigter, registerEmail: e.target.value })
                      }
                    />
                  </CInputGroup>
                  {errMsg.registerEmail && (
                    <span className="text-danger">{errMsg.registerEmail}</span>
                  )}
                  <CInputGroup className="mt-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type={showPass ? 'text' : 'password'}
                      placeholder="Password"
                      value={userResigter.password}
                      onChange={(e) =>
                        setUserResigter({ ...userResigter, password: e.target.value })
                      }
                    />
                    <CInputGroupText onClick={() => clickHandler()}>
                      {showPass ? <CIcon icon={cilCheckAlt} /> : <CIcon icon={cilX} />}
                    </CInputGroupText>
                  </CInputGroup>
                  {errMsg.password && <span className="text-danger">{errMsg.password}</span>}
                  <CInputGroup className="mt-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type={confirmShowPass ? 'text' : 'password'}
                      placeholder="Confirm password"
                      value={userResigter.confirmPassword}
                      onChange={(e) =>
                        setUserResigter({ ...userResigter, confirmPassword: e.target.value })
                      }
                    />
                    <CInputGroupText onClick={() => confirmHandler()}>
                      {confirmShowPass ? <CIcon icon={cilCheckAlt} /> : <CIcon icon={cilX} />}
                    </CInputGroupText>
                  </CInputGroup>
                  {errMsg.confirmPassword && (
                    <span className="text-danger">{errMsg.confirmPassword}</span>
                  )}
                  <div className="d-grid mt-3">
                    <CRow className="justify-content-center">
                      <CCol xs={6}>
                        <CButton type="submit" color="success">
                          {isLoading ? 'Loading...' : 'Create Account'}
                        </CButton>
                      </CCol>
                      <CCol xs={6}>
                        <p style={{ margin: '0px' }}>Already have an Account</p>
                        <Link to="/login">Sign in</Link>
                      </CCol>
                    </CRow>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
