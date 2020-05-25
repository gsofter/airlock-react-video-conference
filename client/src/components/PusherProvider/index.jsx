import React, { useState } from 'react'
import Pusher from 'react-pusher'
import UnlockRequestDialog from '../Dialogs/AlertDialog/UnlockRequestDialog'

const PusherProvider = () => {
  const [unlock, setUnlock] = useState(false)
  const onStreamUrlChange = (data) => {
    console.log(data)
  }

  const onLockRequest = (data) => {
    //console.log(data)
    //alert('asdf')
    setUnlock(true)
  }

  const onLockAccept = (data) => {
    // console.log('LockAccept')
    alert('LockAccepted')
  }
  const handleAgreeUnlockRequest = () => {
    console.log('handleAgreeUnlockRequest')
  }

  const handleDeclineUnlockRequest = () => {
    setUnlock(false)
    console.log('handleDeclineUnlockRequest')
  }

  return (
    <>
      <UnlockRequestDialog
        isOpen={unlock}
        sender="ASDF"
        handleAgree={handleAgreeUnlockRequest}
        handleDecline={handleDeclineUnlockRequest}
      />

      <Pusher
        channel="airlock-channel"
        event="stream-url-change"
        onUpdate={onStreamUrlChange}
      />

      <Pusher
        channel="airlock-channel"
        event="lock-request"
        onUpdate={onLockRequest}
      />

      <Pusher
        channel="airlock-channel"
        event="lock-accept"
        onUpdate={onLockAccept}
      />
    </>
  )
}

export default PusherProvider
