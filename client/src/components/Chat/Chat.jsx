import React from 'react'
import { makeStyles, TextField, Button } from '@material-ui/core'
import { PaperPlanIcon } from '../Icons/Icons'
import InfoBar from './InfoBar/InfoBar'
import { useState } from 'react'
import Input from './Input/Input'
import Messages from './Messages/Messages'
import './Chat.css'
import { useSelector } from 'react-redux'
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
  const classes = useStyles()
  const messages = ['hi, I am nikita', 'how are you doing?']
  const [message, setMessage] = useState('')
  const sendMessage = (e) => {
    e.preventDefault()
    // console.log()
  }

  return (
    <>
      {roomData.chatOpen ? (
        <div className={classes.chatContainer}>
          <InfoBar room="Andrew" />
          <Messages messages={messages} name={'1111'} />
          <Input
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
      ) : null}
    </>
  )
}

export default Chat
