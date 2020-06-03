import React from 'react'
import Pusher from 'react-pusher'
import { useSelector, useDispatch } from 'react-redux'
import { setPinLock } from '../../redux/room/actions'
import { useSnackbar } from 'notistack'

const PusherLockAccept = () => {
  const userData = useSelector((state) => state.user)
  const channel = `${userData.identity}-lock-accept`
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const onLockAccept = (data) => {
    const sender = data.name
    dispatch(setPinLock({ identity: sender }))
    enqueueSnackbar(`${data.name} accepted your lock request`, {
      variant: 'success',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
    })
  }

  return (
    <Pusher channel={channel} event="lock-accept" onUpdate={onLockAccept} />
  )
}

export default PusherLockAccept
