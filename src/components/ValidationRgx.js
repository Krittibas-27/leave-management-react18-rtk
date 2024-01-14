/* eslint-disable prettier/prettier */
export const ValidationRgx = (value) => {
  const errMsg = {}
  const emailPattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
  if (!value.userName.trim()) {
    errMsg.userName = 'Username is Require'
  } else if (value.userName.length < 3) {
    errMsg.userName = 'Name must be 3 character'
  }
  if (!value.firstName.trim()) {
    errMsg.firstName = 'Firstname is Require'
  } else if (value.firstName.length < 3) {
    errMsg.firstName = 'Firstname must be 3 character'
  }
  if (!value.lastName.trim()) {
    errMsg.lastName = 'Lastname is Require'
  } else if (value.lastName.length < 3) {
    errMsg.lastName = 'Lastname must be 3 character'
  }
  if (!value.registerEmail.trim()) {
    errMsg.registerEmail = 'Email is Require'
  } else if (!emailPattern.test(value.registerEmail)) {
    errMsg.registerEmail = 'Email not correct'
  }
  if(value.password.length < 6){
    errMsg.password = 'Password must be 6 character'
  }else if(!passwordPattern.test(value.password)){
    errMsg.password = '(Ex-Aaaa@1) Password is Require'
  }
  if (value.password!==value.confirmPassword) {
    errMsg.confirmPassword = 'Password not match'
  }

  return errMsg
}
