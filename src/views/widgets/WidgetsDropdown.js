/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react'
import { CRow, CCol, CWidgetStatsA } from '@coreui/react'
import SpinnerComponent from '../../components/SpinnerComponent'
import { useDispatch, useSelector } from 'react-redux'
import { leaveChartAction } from 'src/reduxtoolkit/actions/EmployDetailsAction'

const WidgetsDropdown = () => {
  const dispatch = useDispatch()
  const { isLoading, leavechart } = useSelector((state) => state.empInfoReducer)

  useEffect(() => {
    dispatch(leaveChartAction())
  }, [])
    //console.log('leavechart', leavechart)
  return (
    <>
      {
        isLoading ? <SpinnerComponent/> :
        <CRow>
          <CCol sm={4} lg={4} className="mb-4">
            <CWidgetStatsA className="p-2" color="success" value={leavechart[0]?.casual_leave} title="Causal Leave" />
          </CCol>
          <CCol sm={4} lg={4} className="mb-4">
            <CWidgetStatsA className="p-2" color="info" value={leavechart[0]?.sick_leave} title="Sick Leave" />
          </CCol>
          <CCol sm={4} lg={4} className="mb-4">
            <CWidgetStatsA className="p-2" color="primary" value={leavechart[0]?.earn_leave} title="Earned Leave" />
          </CCol>
        </CRow>
      }
    </>
    
  )
}

export default WidgetsDropdown
