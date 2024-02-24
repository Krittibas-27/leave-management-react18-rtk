/* eslint-disable prettier/prettier */
import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilPuzzle, cilSpeedometer } from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Leave',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: (() => {
      const userRoleData = JSON.parse(localStorage.getItem('emRole'))
      if (userRoleData.user_role === 'project_manager') {
        return [
          {
            component: CNavItem,
            name: 'Employee Leave',
            to: '/leave-application/employee-leave',
          },
        ]
      } else if (userRoleData.user_role === 'employee') {
        return [
          {
            component: CNavItem,
            name: 'Apply Leave',
            to: '/leave-application/apply',
          },
          {
            component: CNavItem,
            name: 'My Details',
            to: '/leave-application/details',
          },
        ]
      } else {
        return []
      }
    })(),
  },
]

export default _nav
