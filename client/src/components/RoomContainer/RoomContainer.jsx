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

const connectionOptions = {
  bandwidthProfile: {
    video: {
      mode: 'collaboration',
      dominantSpeakerPriority: 'standard',
      renderDimensions: {
        high: { height: 1080, width: 1920 },
        standard: { height: 720, width: 1280 },
        low: { height: 90, width: 160 },
      },
    },
  },
  dominantSpeaker: true,
  maxAudioBitrate: 12000,
  networkQuality: { local: 1, remote: 1 },
  preferredVideoCodecs: [{ codec: 'VP8', simulcast: true }],
  tracks: [],
}

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

    Video.connect(token, connectionOptions).then((room) => {
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
