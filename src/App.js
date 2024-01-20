import React, { Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import ToastMessage from './components/ToastMessage'
import ForgetPassword from './views/pages/forgetpassword/ForgetPassword'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  const storageUserData = JSON.parse(localStorage.getItem('userData'))
  const [storage] = useState(storageUserData)
  // const PublicRoute = ({ children }) => {
  //   const storageUserData = JSON.parse(localStorage.getItem('userData'))
  //   return storageUserData === null ? (
  //     <>{children}</>
  //   ) : (
  //     <>
  //       <Navigate to="/" />
  //     </>
  //   )
  // }
  // const PrivateRoute = ({ children }) => {
  //   return storageUserData !== null ? (
  //     <>{children}</>
  //   ) : (
  //     <>
  //       <Navigate to="/login" />
  //     </>
  //   )
  // }
  //console.log('storage', storage)
  return (
    <>
      <ToastMessage />
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            {storage ? (
              <Route path="*" name="Home" element={<DefaultLayout />} />
            ) : (
              <>
                <Route exac path="/login" name="Login Page" element={<Login />} />
                <Route exact path="/register" name="Register Page" element={<Register />} />
                <Route
                  exact
                  path="/forgetpassword"
                  name="Forget Password Page"
                  element={<ForgetPassword />}
                />
                <Route exact path="/404" name="Page 404" element={<Page404 />} />
                <Route exact path="/500" name="Page 500" element={<Page500 />} />
                <Route path="*" name="Login Page" element={<Login />} />
              </>
            )}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
