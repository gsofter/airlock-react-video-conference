import React, { useState } from 'react'
import Pusher from 'react-pusher'
import UnlockRequestDialog from '../Dialogs/AlertDialog/UnlockRequestDialog'
import usePrivateChannel from '../../hooks/usePrivateChannel/usePrivateChannel'
import { useSelector } from 'react-redux'
import * as api from '../../lib/api'
const PusherLockRequest = () => {
  const [unlock, setUnlock] = useState(false)
  const privateChannel = usePrivateChannel()
  const [senderName, setSenderName] = useState('')
  const userData = useSelector((state) => state.user)
  const myIdentity = userData.identity
  const onLockRequest = (data) => {
    setSenderName(data.name)
    setUnlock(true)
  }

  const handleAgreeUnlockRequest = async () => {
    try {
      await api.lockAccept(myIdentity, senderName)
      setUnlock(false)
    } catch (e) {
      console.log(e)
    }
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
