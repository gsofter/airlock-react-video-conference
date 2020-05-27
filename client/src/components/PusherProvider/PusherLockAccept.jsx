import React from 'react'
import Pusher from 'react-pusher'
import { useSelector, useDispatch } from 'react-redux'
import { setPinLock } from '../../redux/room/actions'
const PusherLockAccept = () => {
  const userData = useSelector((state) => state.user)
  const channel = `${userData.identity}-lock-accept`
  const dispatch = useDispatch()
  const onLockAccept = (data) => {
    const sender = data.name
    dispatch(setPinLock({ identity: sender }))
  }

  return (
    <Pusher channel={channel} event="lock-accept" onUpdate={onLockAccept} />
  )
}

export default PusherLockAccept
