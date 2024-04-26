import React from 'react'
import { useNavigate } from 'react-router-dom';

const ChatWindow = () => {
    const navigate = useNavigate()
  return (
    <div className='flex flex-col items-center justify-center gap-5'>
        ChatWindow
        <button onClick={() => {localStorage.clear(); navigate("/login")}}>Logout</button>
    </div>
  )
}

export default ChatWindow