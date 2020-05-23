import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import LocalVideoPreview from '../../components/Party/LocalVideoPreview'
import useStyles from './styles'
import useRoomState from '../../hooks/useRoomState'
import MenuBar from '../../components/Party/MenuBar'
import useVideoPartyContext from '../../hooks/useVideoPartyContext'
import Controls from '../../components/Party/Controls'

const PreviewPage = () => {
  let history = useHistory()
  const classes = useStyles()
  const userData = useSelector((state) => state.user)
  const roomState = useRoomState()
  const { room, connect, localTracks } = useVideoPartyContext()
  const onClkLeft = () => {
    console.log('LEFT')
    if (roomState === 'connected') room.disconnect()
    // history.push('/dashboard')
  }

  const onClkJoinToParty = (event) => {
    console.log('JOINTOPARTY')
    event.preventDefault()
    connect(userData.token).then(() => history.push('/party'))
  }
  return (
    <>
      <main className={classes.mainWrapper}>
        {roomState === 'disconnected' ? (
          <>
            <MenuBar onLeft={onClkLeft} onJoinToParty={onClkJoinToParty} />
            <LocalVideoPreview localTracks={localTracks} />
            <Controls />
          </>
        ) : //history.push('/party')
        null}
      </main>
    </>
  )
}

export default PreviewPage
