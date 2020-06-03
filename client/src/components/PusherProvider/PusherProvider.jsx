import React, { useState } from 'react'
import Pusher from 'react-pusher'
import PusherLockRequest from './PusherLockRequest'
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

      <PusherLockRequest />
      <PusherLockAccept />
      <MicPusher />
      <MessagePusher />
    </>
  )
}

export default PusherProvider
