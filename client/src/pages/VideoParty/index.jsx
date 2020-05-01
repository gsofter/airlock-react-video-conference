import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Video from 'twilio-video'
import Grid from '@material-ui/core/Grid'
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
} from '@material-ui/core'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

import Room from '../../components/Party/Room'
import LocalVideoPreview from '../../components/Party/LocalVideoPreview'
import useStyles from './styles'
import useRoomState from '../../hooks/useRoomState'
import MenuBar from '../../components/Party/MenuBar'
import useVideoPartyContext from '../../hooks/useVideoPartyContext'

const VideoParty = () => {
  let history = useHistory()
  const classes = useStyles()
  const dispatch = useDispatch()
  const roomData = useSelector((state) => state.room)
  const twilioData = useSelector((state) => state.twilio)
  const roomState = useRoomState()
  const { connect, localTracks } = useVideoPartyContext()
  const onClkLeft = () => {
    console.log('LEFT')
    history.push('/dashboard')
  }

  const onClkJoinToParty = (event) => {
    console.log('JOINTOPARTY')
    event.preventDefault()
    connect(twilioData.token)
  }
  return (
    <React.Fragment>
      <MenuBar roomTitle={roomData.name} onClkLeft={onClkLeft} />
      <main className={classes.mainWrapper}>
        <Container spacing={10}>
          {roomState === 'disconnected' ? (
            <div>
              <div>
                <Typography variant="h4"> Camera Preview </Typography>
                <LocalVideoPreview localTracks={localTracks} />
              </div>
              <Button
                variant="contained"
                color="success"
                onClick={onClkJoinToParty}
              >
                <ArrowForwardIcon />
                Join to Party
              </Button>
            </div>
          ) : (
            <Room />
          )}
        </Container>
      </main>
    </React.Fragment>
  )
}

export default VideoParty
