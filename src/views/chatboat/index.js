/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { CButton, CFormTextarea, CLink } from '@coreui/react'
import './chatboat.css'
import { BsChatDots } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";

const Chatboat = () => {
    const [chatText, setChatText] = useState("")
    const [chatboatShow, setChatboatShow] = useState(false)
    console.log(chatboatShow)
    return (
        <>
            <CButton className='chatbot-toggler' onClick={()=>setChatboatShow((prev) => !prev)}>
            {chatboatShow ? <IoClose className='chat_icon' /> : <BsChatDots className='chat_icon' /> }
            {/* <span><BsChatDots /></span>
                <span><IoClose /></span> */}
            </CButton>
            {
              chatboatShow ?  
              <div className="chatbot">
                <header className='items-center'>
                    <h2>Chatbot</h2>
                    <span className="close-btn"onClick={()=>setChatboatShow(false)}><IoClose /></span>
                </header>
                <ul className="chatbox">
                    <li className="chat incoming">
                        <span className="material-symbols-outlined">smart_toy</span>
                        <div className='date_sec'>
                            <div className='date_zone'>01/17/2024 7.33pm</div>
                            <p>Hi there 👋<br />How can I help you today?</p>
                        </div>
                        
                    </li>
                    <li className="chat outgoing">
                        <div  className='date_sec'>
                            <div className='date_zone alignRight'>01/17/2024 7.33pm</div>
                            <p>Hi there 👋<br />How can I help you today?</p>
                        </div>
                        {/* <p>hello allHow can I help you today?How can I help you today?</p> */}
                        <span className="material-symbols-outlined">smart_toy</span>
                    </li>
                </ul>
                <div className="chat-input">
                    <CFormTextarea className='textarea' rows={3} placeholder='Enter a message...' value={chatText} onChange={(e) => setChatText(e.target.value)} />
                    <CButton variant='none' disabled={chatText.length === 0 ? true : false}><IoIosSend /></CButton>
                </div>
            </div>
            : null
            }
            
        </>
    )
}

export default Chatboat