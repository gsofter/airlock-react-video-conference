import React from 'react'
import VideoTrack from '../tracks/VideoTrack'
const LocalVideoPreview = ({ localTracks }) => {
  console.log(localTracks)
  const videoTrack = localTracks.find((track) => track.name === 'camera')
  return (
    <div>
      <VideoTrack track={videoTrack} isLocal></VideoTrack>
    </div>
  )
}

export default LocalVideoPreview
