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
import Video from 'twilio-video'
import LocalVideoPreview from '../../components/Conference/LocalVideoPreview'
import Participant from '../../components/Conference/Participant'
import useStyles from './styles'
import useLocalTracks from '../../hooks/useLocalTracks'

const VideoConference = () => {
  let history = useHistory()
  const classes = useStyles()
  const dispatch = useDispatch()
  const twilioData = useSelector((state) => state.twilio)
  const roomData = useSelector((state) => state.room)
  const { localTracks, getLocalVideoTrack } = useLocalTracks()
  const [room, setRoom] = useState(null)
  const [participants, setParticipants] = useState([])

  const onErrorCallback = (error) => {
    console.log(`ERROR: ${error.message}`, error)
    onError(error)
  }

  useEffect(() => {
    const participantConnected = (participant) => {
      console.log(`${participant.identity} connected`)
      setParticipants((prevParticipants) => [...prevParticipants, participant])
    }

    const participantDisconnected = (participant) => {
      setParticipants((prevParticipants) => {
        return prevParticipants.filter((p) => p.id !== participant.id)
      })
    }

    console.log(twilioData.token)
    Video.connect(twilioData.token, { name: roomData.name })
      .then((room) => {
        console.log('CONNECTION SUCCESS')
        console.log('ROOM => ', room)
        console.log(typeof room)
        setRoom(room)
        //room.on('participantConnected', participantConnected)
        //room.on('participantDisconnected', participantDisconnected)
        room.on('participantConnected', () => {
          console.log('Participant connected!')
        })
        // room.participants.forEach(participantConnected)
        return () => {
          setRoom((currentRoom) => {
            if (
              currentRoom &&
              currentRoom.localParticipant.state === 'connected'
            ) {
              currentRoom.localParticipant.tracks.forEach(function (
                trackPublication,
              ) {
                trackPublication.track.stop()
              })
              currentRoom.disconnect()
              return null
            } else {
              return currentRoom
            }
          })
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

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
          <Grid container item xs direction="column">
            <Grid container item xs>
              <Grid item xs></Grid>
              <Grid item xs>
                <div> Second </div>
              </Grid>
            </Grid>
            <Grid container item xs>
              <Grid item xs>
                {room &&
                  room.participants.forEach((participant) => (
                    <div>
                      <Participant
                        key={participant.sid}
                        participant={participant}
                      />
                    </div>
                  ))}
              </Grid>
              <Grid item xs>
                <LocalVideoPreview localTracks={localTracks} />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  )
}

export default VideoConference
