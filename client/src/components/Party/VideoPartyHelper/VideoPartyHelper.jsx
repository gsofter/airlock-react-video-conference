import React from 'react'
import useConnect from '../../../hooks/useConnect/useConnect'
import useRoomState from '../../../hooks/useRoomState'
import VideoParty from '../../../pages/VideoParty'

const VideoPartyHelper = () => {
  useConnect()
  const roomState = useRoomState()
  return (
    <>{roomState === 'connected' ? <VideoParty /> : <div>connecting</div>}</>
  )
}

export default VideoPartyHelper
