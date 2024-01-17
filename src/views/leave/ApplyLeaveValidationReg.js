/* eslint-disable prettier/prettier */
export const ApplyLeaveValidationReg = (startdate,endtdate,pManager,leaveMessage) => {
  const error = {}
  if (!startdate) {
    error.startdate = "Start-date is require"
  }
  if (!endtdate) {
    error.endtdate = "End-date is require"
  }
  if (!pManager) {
    error.pManager = "Manager / Supirior select is require"
  }
  if (!leaveMessage) {
    error.leaveMessage = "Message is require"
  }
  return error
}
