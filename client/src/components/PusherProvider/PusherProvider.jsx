import React, { useState } from 'react'
import Pusher from 'react-pusher'
import MicPusher from './MicPusher'
import MessagePusher from './MessagePusher'
import UnLockRequestPusher from './UnLockRequestPusher'
import UnLockAcceptPusher from './UnLockAcceptPusher'
import LockRequestPusher from './LockRequestPusher'

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

      <UnLockRequestPusher />
      <UnLockAcceptPusher />
      <LockRequestPusher />
      <MicPusher />
      <MessagePusher />
    </>
  )
}

export default PusherProvider
