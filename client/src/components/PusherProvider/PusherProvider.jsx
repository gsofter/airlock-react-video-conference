import React, { useState } from 'react'
import Pusher from 'react-pusher'
import PusherUnLockRequest from './PusherUnLockRequest'
import PusherLockAccept from './PusherLockAccept'
import MicPusher from './MicPusher'
import MessagePusher from './MessagePusher'

const PusherProvider = () => {
  const onStreamUrlChange = (data) => {
    console.log(data)
  }

  return (
    <>
      <Pusher
        channel="airlock-channel"
        event="stream-url-change"
        onUpdate={onStreamUrlChange}
      />

      <PusherUnLockRequest />
      <PusherLockAccept />
      <MicPusher />
      <MessagePusher />
    </>
  )
}

export default PusherProvider
