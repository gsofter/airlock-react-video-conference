import React, { useState, useCallback } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AlertDialog from '../../components/Dialogs/AlertDialog'
import * as userActions from '../../redux/user/actions'
import * as roomActions from '../../redux/room/actions'
import useStyles from './styles'

const LoginPage = () => {
  const location = useLocation()
  const { from } = location.state || { from: { pathname: '/' } }
  const classes = useStyles()
  const [passcode, setPasscode] = useState('')
  const dispatch = useDispatch()
  const [dialogShow, setDialogShow] = useState(false)
  const [error, setError] = useState(false)
  const onChangePasscode = useCallback((e) => {
    setError(false)
    setPasscode(e.target.value)
  }, [])

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault()
      dispatch(userActions.loginRequest(passcode))
        .then(() => {
          dispatch(userActions.checkAuth())
        })
        .catch((error) => {
          setError(true)
        })
    },
    [dispatch, passcode],
  )

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <AlertDialog
        isOpen={dialogShow}
        title="Access Failed"
        description="Passcode doesn't exit!"
        buttonText="OK"
        handleClose={() => setDialogShow(false)}
      />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="passcode"
            label="passcode"
            value={passcode}
            onChange={onChangePasscode}
            error={error}
            helperText={error && 'Invalid access code'}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Access
          </Button>
        </form>
      </div>
    </Container>
  )
}

export default LoginPage
