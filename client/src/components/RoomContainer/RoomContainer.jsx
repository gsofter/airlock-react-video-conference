import React, { useState, useEffect } from 'react'
import Video from 'twilio-video'
import useUserData from '../../hooks/useUserData/useUserData'
import {
  setTwilioRoom,
  participantJoined,
  participantExit,
} from '../../redux/room/actions'
import { useDispatch, useSelector } from 'react-redux'
import VideoParty from '../../pages/VideoParty/VideoParty'
const RoomContainer = () => {
  const userData = useUserData()
  const token = userData.token
  const dispatch = useDispatch()
  useEffect(() => {
    const participantConnected = (participant) => {
      console.log(participant.identity, '=> connected')
      dispatch(participantJoined(participant))
    }

    const participantDisconnected = (participant) => {
      console.log(participant.identity, '=> disconnected')
      dispatch(participantExit(participant))
    }

    Video.connect(token).then((room) => {
      console.log('CONNECTED', room)
      dispatch(setTwilioRoom(room))
      room.on('participantConnected', participantConnected)
      room.on('participantDisconnected', participantDisconnected)
      room.participants.forEach(participantConnected)
    })

    return () => {
      dispatch(setTwilioRoom(null))
    }
  }, [])

  const room = useSelector((state) => state.room.room)
  return (
    <div className="room">
      {room !== null && room.state === 'connected' ? (
        <VideoParty />
      ) : (
        <div> Connecting, Please wait for a while ...</div>
      )}
    </div>
  )
}

export default RoomContainer
