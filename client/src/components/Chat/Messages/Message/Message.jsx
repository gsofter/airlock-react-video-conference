import React from 'react'

import './Message.css'

const Message = ({ message }) => {
  return (
    <div className="messageBoxOne">
      {message.sent ? (
        <p className="messageTextOne">{message.text}</p>
      ) : (
        <p className="messageTextTwo">{message.text}</p>
      )}
    </div>
  )
}

export default Message
