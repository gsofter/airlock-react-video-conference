import React, { useState } from 'react'
import Pusher from 'react-pusher'
import MicPusher from './MicPusher'
import MessagePusher from './MessagePusher'
import UnLockRequestPusher from './UnLockRequestPusher'
import LockAcceptPusher from './UnLockAcceptPusher'
import UnLockAcceptPusher from './UnLockAcceptPusher'

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
      <LockAcceptPusher />
      <MicPusher />
      <MessagePusher />
    </>
  )
}

export default PusherProvider
