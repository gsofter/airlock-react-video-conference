import React, { useState } from 'react'
import Pusher from 'react-pusher'
import UnlockRequestDialog from '../Dialogs/AlertDialog/UnlockRequestDialog'
import usePrivateChannel from '../../hooks/usePrivateChannel/usePrivateChannel'
import PusherLockRequest from './PusherLockRequest'

const PusherProvider = () => {
  const privateChannel = usePrivateChannel()
  const onStreamUrlChange = (data) => {
    console.log(data)
  }

  const onLockAccept = (data) => {
    // console.log('LockAccept')
    alert('LockAccepted')
  }
  return (
    <>
      <Pusher
        channel="airlock-channel"
        event="stream-url-change"
        onUpdate={onStreamUrlChange}
      />

      <PusherLockRequest />
      <Pusher
        channel={privateChannel}
        event="lock-accept"
        onUpdate={onLockAccept}
      />
    </>
  )
}

export default PusherProvider
