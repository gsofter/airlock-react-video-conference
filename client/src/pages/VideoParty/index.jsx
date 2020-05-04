import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Room from '../../components/Party/Room'
import LocalVideoPreview from '../../components/Party/LocalVideoPreview'
import useStyles from './styles'
import useRoomState from '../../hooks/useRoomState'
import MenuBar from '../../components/Party/MenuBar'
import useVideoPartyContext from '../../hooks/useVideoPartyContext'
import Controls from '../../components/Party/Controls'

const VideoParty = () => {
  let history = useHistory()
  const classes = useStyles()
  const roomData = useSelector((state) => state.room)
  const twilioData = useSelector((state) => state.twilio)
  const roomState = useRoomState()
  const { room, connect, localTracks } = useVideoPartyContext()
  const onClkLeft = () => {
    console.log('LEFT')
    if (roomState === 'connected') room.disconnect()
    history.push('/dashboard')
  }

  const onClkJoinToParty = (event) => {
    console.log('JOINTOPARTY')
    event.preventDefault()
    connect(twilioData.token)
  }
  return (
    <>
      <MenuBar
        roomTitle={roomData.name}
        onLeft={onClkLeft}
        onJoinToParty={onClkJoinToParty}
      />
      <main className={classes.mainWrapper}>
        {roomState === 'disconnected' ? (
          <>
            <LocalVideoPreview localTracks={localTracks} />
          </>
        ) : (
          <Room />
        )}
        <Controls />
      </main>
    </>
  )
}

export default VideoParty
