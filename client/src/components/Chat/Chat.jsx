import React from 'react'
import { makeStyles, TextField, Button } from '@material-ui/core'
import { PaperPlanIcon } from '../Icons/Icons'
import InfoBar from './InfoBar/InfoBar'
import { useState } from 'react'
import Input from './Input/Input'
import Messages from './Messages/Messages'
import './Chat.css'
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
  chatHeader: {
    backgroundColor: 'grey',
    height: '50px',
  },
  chatFooter: {
    // marginBottom: '0px',
    // flexShrink: 1,
    // height: '50px',
    // display: 'flex',
  },
  messageList: {
    height: 'calc(100% - 100px)',
    // height: '100px',
  },
  chatFooter: {
    height: '100px',
    overflow: 'hidden',
    // padding: theme.spacing(2),
  },
  textField: {},
  sendButton: {
    // height: '100%',
  },
}))

const Chat = () => {
  const classes = useStyles()
  const messages = ['hi, I am nikita', 'how are you doing?']
  const [message, setMessage] = useState('')
  const sendMessage = (e) => {
    e.preventDefault()
    console.log(sendMessage)
  }
  return (
    // <div className="outerContainer">
    <div className={classes.chatContainer}>
      <InfoBar room="Andrew" />
      <Messages messages={messages} name={'1111'} />
      <Input
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>

    // </div>
  )
}

export default Chat
