import React from 'react'
import { CRow, CCol, CWidgetStatsA } from '@coreui/react'

const WidgetsDropdown = () => {
  return (
    <CRow>
      <CCol sm={4} lg={4} className="mb-4">
        <CWidgetStatsA className="p-2" color="success" value={21} title="Causal Leave" />
      </CCol>
      <CCol sm={4} lg={4} className="mb-4">
        <CWidgetStatsA className="p-2" color="info" value={72} title="Sick Leave" />
      </CCol>
      <CCol sm={4} lg={4} className="mb-4">
        <CWidgetStatsA className="p-2" color="primary" value={65} title="Earned Leave" />
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
