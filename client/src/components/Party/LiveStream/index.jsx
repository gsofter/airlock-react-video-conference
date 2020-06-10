import React from 'react'
import ReactPlayer from 'react-player'
import { makeStyles } from '@material-ui/core'
import { useSelector } from 'react-redux'
const useStyles = makeStyles((theme) => ({
  streamWrrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100% - 70px)',
  },
}))

const LiveStream = () => {
  const classes = useStyles()
  const roomData = useSelector((state) => state.room)
  const url = roomData.stream.url

  const onError = () => {
    console.log('ERROR')
  }
  return (
    <div className={classes.streamWrrapper}>
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls={false}
        config={{
          youtube: {
            playerVars: { showinfo: 1, modestbranding: 1 },
          },
        }}
        onError={onError}
        playing
      />
    </div>
  )
}

export default LiveStream
