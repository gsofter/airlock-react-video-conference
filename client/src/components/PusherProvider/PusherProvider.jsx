import React, { useState } from 'react'
import Pusher from 'react-pusher'
import UnlockRequestDialog from '../Dialogs/AlertDialog/UnlockRequestDialog'
import usePrivateChannel from '../../hooks/usePrivateChannel/usePrivateChannel'
import PusherLockRequest from './PusherLockRequest'
import PusherLockAccept from './PusherLockAccept'

const PusherProvider = () => {
  const privateChannel = usePrivateChannel()
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
    </>
  )
}

export default PusherProvider
