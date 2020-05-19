import React from 'react'
import ReactPlayer from 'react-player'
import { makeStyles } from '@material-ui/core'
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
  return (
    <div className={classes.streamWrrapper}>
      <ReactPlayer
        url="https://www.youtube.com/watch?v=wNpSKSXYgKY&t=3s"
        width="100%"
        height="100%"
        controls={false}
        config={{
          youtube: {
            playerVars: { showinfo: 1, modestbranding: 1 },
          },
        }}
        playing
      />
    </div>
  )
}

export default LiveStream
