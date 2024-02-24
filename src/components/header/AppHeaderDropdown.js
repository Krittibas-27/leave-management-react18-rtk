/* eslint-disable prettier/prettier */
import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
  cilPowerStandby,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import Avatar from 'react-avatar'

import avatar8 from './../../assets/images/avatars/8.jpg'
const LogoutHandel=()=>{
  localStorage.removeItem('userData')
  localStorage.removeItem('emRole')
  window.location.reload()
}
const AppHeaderDropdown = () => {
  const storeData = JSON.parse(localStorage.getItem('userData'))
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        {/* <CAvatar src={avatar8} size="md" /> */}
        <Avatar
          size="40"
          round={true}
          color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])}
          name={storeData && storeData.user_display_name}
          textSizeRatio={2.5}
          className="ms-3"
        ></Avatar>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
        <CDropdownItem href="/user/profile">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem href="#" onClick={()=>LogoutHandel()}>
          <CIcon icon={cilPowerStandby} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
