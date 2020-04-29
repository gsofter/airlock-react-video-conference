import React, { useEffect, useState } from 'react'
import Video from 'twilio-video'
import { useSelector } from 'react-redux'
import VideoTrack from '../VideoTrack'
const LocalVideoPreview = () => {
  const twilioData = useSelector((state) => state.twilio)
  const roomData = useSelector((state) => state.room)
  const [track, setTrack] = useState(null)
  useEffect(() => {
    Video.createLocalVideoTrack({
      frameRate: 24,
      height: 720,
      width: 1280,
      name: 'camera',
    }).then((track) => {
      console.log('LocalVideoPreview', track)
      setTrack(track)
    })
  }, [])
  return (
    <div>
      <VideoTrack track={track} isLocal></VideoTrack>
    </div>
  )
}

export default LocalVideoPreview
