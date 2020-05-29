import React from 'react'
import Pusher from 'react-pusher'
import { useSelector, useDispatch } from 'react-redux'
import { setPinLock } from '../../redux/room/actions'
import { setPinMic } from '../../redux/room/actions'
const MicPusher = () => {
  const userData = useSelector((state) => state.user)
  const channel = `${userData.identity}-mic`
  console.log(channel)
  const dispatch = useDispatch()

  const onMic = (data) => {
    console.log('MIC => ', data)
    if (data.message === 'on') {
      dispatch(setPinMic({ identity: data.name, isOn: true }))
    } else {
      dispatch(setPinMic({ identity: data.name, isOn: false }))
    }
  }
  return <Pusher channel={channel} event="mic-on" onUpdate={onMic} />
}

export default MicPusher
