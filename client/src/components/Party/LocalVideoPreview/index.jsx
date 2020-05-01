import React from 'react'
import VideoTrack from '../tracks/VideoTrack'
import { Typography } from '@material-ui/core'
const LocalVideoPreview = ({ localTracks }) => {
  console.log(localTracks)
  const videoTrack = localTracks.find((track) => track.name === 'camera')
  return (
    <div>
      {/* <Typography variant="h3">LocalCameraPreview</Typography> */}
      <VideoTrack track={videoTrack} isLocal></VideoTrack>
    </div>
  )
}

export default LocalVideoPreview
