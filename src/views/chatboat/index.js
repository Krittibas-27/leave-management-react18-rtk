/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { CButton, CFormTextarea } from '@coreui/react'
import './chatboat.css'
import { IoClose } from 'react-icons/io5'
import { IoIosSend } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import { GetChatComment } from 'src/reduxtoolkit/actions/ApplyLeaveDetailsAction'

// eslint-disable-next-line react/prop-types
const Chatboat = ({ setChatboatShow, chatRowdata }) => {
  const dispatch = useDispatch()
  const [chatText, setChatText] = useState('')
  const [commentText, setCommentText] = useState([])
  //const [chatboatShow, setChatboatShow] = useState(false)
  //console.log(chatboatShow)
  //const storaeData = JSON.parse(localStorage.getItem('userData'))

  useEffect(() => {
    dispatch(GetChatComment({ emId: chatRowdata })).then((res) => {
      if (res.type === 'employee/get-comment/fulfilled') {
        setCommentText(res.payload)
      }
    })
  }, [])
  console.log('commentText->', commentText)
  return (
    <>
      <div className="chatbot">
        <header className="items-center">
          <h2>Chatbot</h2>
          <span className="close-btn" onClick={() => setChatboatShow(false)}>
            <IoClose />
          </span>
        </header>
        <ul className="chatbox">
          <li className="chat incoming">
            <span className="material-symbols-outlined">smart_toy</span>
            <div className="date_sec">
              <div className="date_zone">01/17/2024 7.33pm</div>
              <p>
                Hi there 👋
                <br />
                How can I help you today?
              </p>
            </div>
          </li>
          <li className="chat outgoing">
            <div className="date_sec">
              <div className="date_zone alignRight">01/17/2024 7.33pm</div>
              <p>
                Hi there 👋
                <br />
                How can I help you today?
              </p>
            </div>
            <span className="material-symbols-outlined">smart_toy</span>
          </li>
        </ul>
        <div className="chat-input">
          <CFormTextarea
            className="textarea"
            rows={3}
            placeholder="Enter a message..."
            value={chatText}
            onChange={(e) => setChatText(e.target.value)}
          />
          <CButton variant="none" disabled={chatText.length === 0 ? true : false}>
            <IoIosSend />
          </CButton>
        </div>
      </div>
    </>
  )
}

export default Chatboat
