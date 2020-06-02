import React from 'react'
import Pusher from 'react-pusher'
import { useSelector, useDispatch } from 'react-redux'
const MessagePusher = () => {
  const userData = useSelector((state) => state.user)
  const channel = `${userData.identity}-message`
  const dispatch = useDispatch()

  const onMessage = (data) => {
    alert(data)
  }
  return <Pusher channel={channel} event="message" onUpdate={onMessage} />
}

export default MessagePusher
