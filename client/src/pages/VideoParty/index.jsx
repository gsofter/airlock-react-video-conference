import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
} from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Video, { Room } from 'twilio-video'
import LocalVideoPreview from '../../components/Party/LocalVideoPreview'
import Participant from '../../components/Party/Participant'
import useStyles from './styles'
import useLocalTracks from '../../hooks/useLocalTracks'
import useRoom from '../../hooks/useRoom'
import useHandleRoomDisconnectionErrors from '../../hooks/useHandleRoomDisconnectionErrors'
import useHandleTrackPublicationFailed from '../../hooks/useHandleTrackPublicationFailed'
import useHandleOnDisconnect from '../../hooks/useHandleOnDisconnect'
import useRoomState from '../../hooks/useRoomState'

const connectionOptions = {
  bandwidthProfile: {
    video: {
      mode: 'collaboration',
      dominantSpeakerPriority: 'standard',
      renderDimensions: {
        high: { height: 1080, width: 1920 },
        standard: { height: 720, width: 1280 },
        low: { height: 90, width: 160 },
      },
    },
  },
  dominantSpeaker: true,
  maxAudioBitrate: 12000,
  networkQuality: { local: 1, remote: 1 },
  preferredVideoCodecs: [{ codec: 'VP8', simulcast: true }],
}

const VideoParty = () => {
  let history = useHistory()
  const classes = useStyles()
  const dispatch = useDispatch()
  const roomData = useSelector((state) => state.room)
  const twilioData = useSelector((state) => state.twilio)
  const [participants, setParticipants] = useState([])

  const { error, setError } = useState(null)
  const onTwilioErrorCallback = (error) => {
    console.log(`ERROR: ${error.message}`, error)
    // onError(error)
    setError(error)
  }

  const { localTracks, getLocalVideoTrack } = useLocalTracks()
  const { room, isConnecting, connect } = useRoom(
    localTracks,
    onTwilioErrorCallback,
    connectionOptions,
  )

  useHandleRoomDisconnectionErrors(room, onTwilioErrorCallback)
  useHandleTrackPublicationFailed(room, onTwilioErrorCallback)
  useHandleOnDisconnect(room, onTwilioErrorCallback)

  const roomState = useRoomState(room)
  // useEffect(() => {
  //   const participantConnected = (participant) => {
  //     console.log(`${participant.identity} connected`)
  //     setParticipants((prevParticipants) => [...prevParticipants, participant])
  //   }

  //   const participantDisconnected = (participant) => {
  //     setParticipants((prevParticipants) => {
  //       return prevParticipants.filter((p) => p.id !== participant.id)
  //     })
  //   }

  //   console.log(twilioData.token)
  //   Video.connect(twilioData.token, { name: roomData.name })
  //     .then((room) => {
  //       console.log('CONNECTION SUCCESS')
  //       console.log('ROOM => ', room)
  //       console.log(typeof room)
  //       setRoom(room)
  //       //room.on('participantConnected', participantConnected)
  //       //room.on('participantDisconnected', participantDisconnected)
  //       room.on('participantConnected', () => {
  //         console.log('Participant connected!')
  //       })
  //       // room.participants.forEach(participantConnected)
  //       return () => {
  //         setRoom((currentRoom) => {
  //           if (
  //             currentRoom &&
  //             currentRoom.localParticipant.state === 'connected'
  //           ) {
  //             currentRoom.localParticipant.tracks.forEach(function (
  //               trackPublication,
  //             ) {
  //               trackPublication.track.stop()
  //             })
  //             currentRoom.disconnect()
  //             return null
  //           } else {
  //             return currentRoom
  //           }
  //         })
  //       }
  //     })
  //     .catch((e) => {
  //       console.log(e)
  //     })
  // }, [])

  const onClkLeft = () => {
    console.log('LEFT')
    history.push('/dashboard')
  }

  return (
    <React.Fragment>
      <AppBar position="relative">
        <Toolbar>
          <Typography
            variant="h5"
            color="inherit"
            noWrap
            className={classes.title}
          >
            <img src="./assets/brand-logo.png" />
            {roomData.name}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            className={classes.exitButton}
            onClick={onClkLeft}
          >
            <ExitToAppIcon />
            LEFT
          </Button>
        </Toolbar>
      </AppBar>
      <main className={classes.mainWrapper}>
        <Container>
          {roomState === 'disconnected' ? (
            <LocalVideoPreview localTracks={localTracks} />
          ) : (
            <Room />
          )}
        </Container>
      </main>
    </React.Fragment>
  )
}

export default VideoParty
