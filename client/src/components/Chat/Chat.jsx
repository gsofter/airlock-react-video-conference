import React from 'react'
import { makeStyles } from '@material-ui/core'
import InfoBar from './InfoBar/InfoBar'
import { useState } from 'react'
import Input from './Input/Input'
import Messages from './Messages/Messages'
import './Chat.css'
import { useSelector, useDispatch } from 'react-redux'
import { sendMessage } from '../../redux/room/actions'

const useStyles = makeStyles((theme) => ({
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    background: '#ffffff',
    borderRadius: '8px',
    height: '100%',
    width: '100%',
  },
}))

const Chat = () => {
  const roomData = useSelector((state) => state.room)
  const meIdentity = useSelector((state) => state.user.identity)
  const classes = useStyles()
  const messages = roomData.pins.find((p) => p.identity === roomData.chatMember)
    .chats
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()
  const handleSendMessage = (e) => {
    console.log(e)
    e.preventDefault()
    dispatch(sendMessage({ identity: roomData.chatMember, message: message }))
    // console.log()
  }

  return (
    <>
      {roomData.chatOpen ? (
        <div className={classes.chatContainer}>
          <InfoBar room="Andrew" />
          <Messages messages={messages} name={roomData.chatMember} />
          <Input
            message={message}
            setMessage={setMessage}
            sendMessage={handleSendMessage}
          />
        </div>
      ) : null}
    </>
  )
}

export default Chat
