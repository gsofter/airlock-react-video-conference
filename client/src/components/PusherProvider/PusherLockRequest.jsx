import React, { useState } from 'react'
import Pusher from 'react-pusher'
import UnlockRequestDialog from '../Dialogs/AlertDialog/UnlockRequestDialog'
import usePrivateChannel from '../../hooks/usePrivateChannel/usePrivateChannel'

const PusherLockRequest = () => {
  const [unlock, setUnlock] = useState(false)
  const privateChannel = usePrivateChannel()
  const [senderName, setSenderName] = useState('')
  const onLockRequest = (data) => {
    console.log(data.name)
    setSenderName(data.name)
    setUnlock(true)
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
        senderName={senderName}
        handleAgree={handleAgreeUnlockRequest}
        handleDecline={handleDeclineUnlockRequest}
      />

      <Pusher
        channel={privateChannel}
        event="lock-request"
        onUpdate={onLockRequest}
      />
    </>
  )
}

export default PusherLockRequest
