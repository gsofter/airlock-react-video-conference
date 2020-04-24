import React, { useState, useCallback } from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import useStyles from './style'
import { joinRoom } from '../../redux/room/actions'
import { useDispatch } from 'react-redux'

const JoinRoom = () => {
  const [roomName, setRoomName] = useState('')
  const classes = useStyles()
  const onChangeRoomName = useCallback((e) => setRoomName(e.target.value), [])
  const dispatch = useDispatch()
  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(joinRoom(roomName))
      .then((res) => {
        console.log('JOIN succes')
      })
      .catch((e) => {
        console.log('JOIN ROOM FAILED')
      })
  }

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h3">
          JOIN
        </Typography>
        <Typography variant="body2" gutterBottom>
          Have your friends already created a room ? Enter the name of the room
          to join it.
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="roomname"
            label="Enter room name"
            autoComplete=""
            value={roomName}
            onChange={onChangeRoomName}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            JOIN
          </Button>
        </form>
      </div>
    </Container>
  )
}

export default JoinRoom
