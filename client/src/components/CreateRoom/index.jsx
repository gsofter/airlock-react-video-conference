import React, { useState, useCallback } from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import MenuItem from '@material-ui/core/MenuItem'
import AlertDialog from '../Dialogs/AlertDialog'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './style'
import * as api from '../../lib/api'
import {
  createRoom,
  joinRoom,
  deleteRoomSuccess,
} from '../../redux/room/actions'

const CreateRoom = () => {
  const classes = useStyles()
  const [roomMode, setRoomMode] = useState('public')
  const [roomName, setRoomName] = useState('')
  const [dialogShow, setDialogShow] = useState(false)
  const [error, setError] = useState(false)
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.user)
  const onChangeRoomMode = useCallback((e) => {
    setRoomMode(e.target.value)
  }, [])

  const onChangeRoomName = useCallback((e) => {
    setError(false)
    setRoomName(e.target.value)
  }, [])

  const onCreateRoom = useCallback(
    async (e) => {
      e.preventDefault()
      dispatch(createRoom(roomName, roomMode))
        .then(() => {
          console.log('CREATING ROOM SUCCESS')
        })
        .catch((e) => {
          console.log(e.message)
          console.log('CREATING ROOM FAILED')
          setError(true)
        })
    },
    [dispatch, roomMode, roomName],
  )

  const onJoinMyRoom = (e) => {
    console.log('ONJOINMYROOM CALLED!')
    e.preventDefault()
    dispatch(joinRoom(userData.my_room_name))
      .then(() => {
        console.log('JOIN TO MY ROOM')
      })
      .catch((e) => {
        console.log(e.message)
      })
  }

  return !userData.my_room_name ? (
    <Container maxWidth="xs">
      <CssBaseline />
      <AlertDialog
        isOpen={dialogShow}
        title="Creating Room Failed"
        description="The room name which you input is not valid! Please try another name!"
        buttonText="OK"
        handleClose={() => setDialogShow(false)}
      />

      <Typography component="h1" variant="h3">
        CREATE
      </Typography>
      <Typography variant="body2" gutterBottom>
        Do you already have a team in mind ? Choose a name and decide to go
        public or private.
      </Typography>
      <form className={classes.form} onSubmit={onCreateRoom}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="passcode"
          label="Choose a name"
          value={roomName}
          onChange={onChangeRoomName}
          error={error}
          helperText={error ? 'Invalid Name' : ''}
        />

        <TextField
          select
          label=""
          variant="outlined"
          fullWidth
          value={roomMode}
          onChange={onChangeRoomMode}
        >
          <MenuItem key="public" value="public">
            Public
          </MenuItem>
          <MenuItem key="private" value="private">
            Private
          </MenuItem>
        </TextField>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          CREATE
        </Button>
      </form>
    </Container>
  ) : (
    <Container maxWidth="xs">
      <Typography component="h1" variant="h3">
        {userData.my_room_name}
      </Typography>
      <Typography variant="body2" gutterBottom>
        You have already created your room
      </Typography>
      <form className={classes.form} onSubmit={onJoinMyRoom}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Join My Room
        </Button>
      </form>
    </Container>
  )
}

export default CreateRoom
