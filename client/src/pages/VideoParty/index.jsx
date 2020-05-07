import React from 'react'
import { useSelector } from 'react-redux'
import Room from '../../components/Party/Room'
import useStyles from './styles'
import useRoomState from '../../hooks/useRoomState'
import useVideoPartyContext from '../../hooks/useVideoPartyContext'
import Controls from '../../components/Party/Controls'

const VideoParty = () => {
  const classes = useStyles()
  // const roomData = useSelector((state) => state.room)
  const userData = useSelector((state) => state.user)
  const roomState = useRoomState()
  const { room, connect, localTracks } = useVideoPartyContext()

  return (
    <>
      <main className={classes.mainWrapper}>
        {roomState === 'connected' ? (
          <>
            <Room />

            <Controls />
          </>
        ) : null}
      </main>
    </>
  )
}

export default VideoParty
