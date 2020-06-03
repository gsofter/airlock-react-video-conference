import React from 'react'
import Pusher from 'react-pusher'
import { useSelector, useDispatch } from 'react-redux'
import { addMessage } from '../../redux/room/actions'
const MessagePusher = () => {
  const userData = useSelector((state) => state.user)
  const channel = `${userData.identity}-message`
  const dispatch = useDispatch()

  const onMessage = (data) => {
    const opp = data.name
    const msg = data.message
    dispatch(addMessage({ identity: opp, message: msg, sent: false }))
  }
  return <Pusher channel={channel} event="message" onUpdate={onMessage} />
}

export default MessagePusher
