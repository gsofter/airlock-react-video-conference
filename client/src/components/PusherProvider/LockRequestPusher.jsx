import React, { useState } from 'react'
import Pusher from 'react-pusher'
import { useSelector, useDispatch } from 'react-redux'
import { setPinLock } from '../../redux/room/actions'
const LockRequestPusher = () => {
  const userData = useSelector((state) => state.user)
  const channel = `${userData.identity}-lock-request`
  const dispatch = useDispatch()
  const onLockRequest = (data) => {
    dispatch(setPinLock({ identity: data.name }))
  }
  return (
    <>
      <Pusher channel={channel} event="lock" onUpdate={onLockRequest} />
    </>
  )
}

export default LockRequestPusher
