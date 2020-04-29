import React, { useCallback } from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import useStyles from './style'
import { joinRandomRoom } from '../../redux/room/actions'
import { useDispatch } from 'react-redux'
const RandomRoom = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const onJoinRandomRoom = useCallback(
    (e) => {
      e.preventDefault()
      dispatch(joinRandomRoom())
        .then(() => {
          console.log('JOIN RANDOM ROOM SUCCESS')
        })
        .catch((err) => {
          console.log(err.message)
          alert('Not available room!')
        })
    },
    [dispatch],
  )
  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Typography component="h1" variant="h3">
        RANDOM
      </Typography>
      <Typography variant="body2" gutterBottom>
        No friends to join ? No worries, just join a random room of unknown
        people.
      </Typography>
      <form className={classes.form} noValidate onSubmit={onJoinRandomRoom}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          ENTER
        </Button>
      </form>
    </Container>
  )
}

export default RandomRoom
