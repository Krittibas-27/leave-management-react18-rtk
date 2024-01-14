import React, { useState } from 'react'
import { Link } from 'react-router-dom'
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
import { empLogin } from 'src/reduxtoolkit/actions/LeaveMaganeAction'

const Login = () => {
  const { isLoading } = useSelector((state) => state.leaveRedcer)
  const dispatch = useDispatch()
  const [userLogin, setUserLogin] = useState({
    userName: '',
    userPass: '',
  })
  const [errMsg, setErrMsg] = useState('')
  const [showPass, setShowPass] = useState(false)
  const clickHandler = () => {
    setShowPass((prev) => !prev)
  }

  const loginSubmit = (e) => {
    if (!userLogin.userName || !userLogin.userPass) {
      toast.error('Please fill all fields!', {
        position: toast.POSITION.TOP_RIGHT,
      })
      setErrMsg('Please fill all fields!')
    } else {
      const newDate = {
        username: userLogin.userName,
        password: userLogin.userPass,
      }
      dispatch(empLogin({ loginData: newDate })).then((res) => {
        console.log(res)
        if (res.type === 'employee/login/rejected') {
          console.log('rejected')
          toast.error('Employee dose not exits!', {
            position: toast.POSITION.TOP_RIGHT,
          })
        }
        if (res.type === 'employee/login/fulfilled') {
          console.log('fulfilled')
          toast.success('Employee login successful', {
            position: toast.POSITION.TOP_RIGHT,
          })
          const loginUserData = JSON.stringify(res.payload)
          localStorage.setItem('userData', loginUserData)
          window.location.reload()
        }
      })
      setErrMsg('')
      //console.log('newDate=>', newDate)
    }
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
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
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
                    {errMsg && <span className="text-danger">{errMsg}</span>}
                    <CInputGroup className="mt-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type={showPass ? 'text' : 'password'}
                        placeholder="Password"
                        value={userLogin.userPass}
                        onChange={(e) => setUserLogin({ ...userLogin, userPass: e.target.value })}
                      />
                      <CInputGroupText onClick={() => clickHandler()}>
                        {showPass ? <CIcon icon={cilCheckAlt} /> : <CIcon icon={cilX} />}
                      </CInputGroupText>
                    </CInputGroup>
                    {errMsg && <span className="text-danger">{errMsg}</span>}
                    <CRow className="mt-4">
                      <CCol xs={6}>
                        <CButton
                          type="button"
                          color="primary"
                          className="px-4"
                          onClick={loginSubmit}
                        >
                          {isLoading ? 'Loading...' : 'Login'}
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <Link color="link" className="px-0" to="/forgetpassword">
                          Forgot password?
                        </Link>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
