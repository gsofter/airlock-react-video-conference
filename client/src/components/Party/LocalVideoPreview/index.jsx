import React from 'react'
import VideoTrack from '../tracks/VideoTrack'
import { Typography, Container } from '@material-ui/core'
import Controls from '../Controls'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  localPreview: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  previewWrapper: {
    border: '1px solid green',
    marginTop: theme.spacing(5),
    width: '640px',
    height: '480px',
  },
}))

const LocalPreviewWrapper = ({ children }) => {
  const classes = useStyles()
  return <div className={classes.previewWrapper}>{children}</div>
}
const LocalVideoPreview = ({ localTracks }) => {
  const classes = useStyles()
  console.log(localTracks)
  const videoTrack = localTracks.find((track) => track.name === 'camera')
  return (
    <Container spacing={10} className={classes.localPreview}>
      <LocalPreviewWrapper>
        <VideoTrack track={videoTrack} isLocal></VideoTrack>
      </LocalPreviewWrapper>
    </Container>
  )
}

export default LocalVideoPreview
