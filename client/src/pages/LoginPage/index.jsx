import React, { useState, useCallback } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { useDispatch } from 'react-redux'
import AlertDialog from '../../components/Dialogs/AlertDialog'
import * as userActions from '../../redux/user/actions'
import useStyles from './styles'

const LoginPage = () => {
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
        <img
          src="/assets/Logo-thug.png"
          alt="logo"
          className={classes.logoImg}
        />
        <Typography component="h1" variant="h4" className={classes.formTitle}>
          Access the party
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="passcode"
            label="Enter your unique code"
            value={passcode}
            onChange={onChangePasscode}
            error={error}
            helperText={error && 'Invalid access code'}
          />

          <Button
            type="submit"
            fullWidth
            margin="normal"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Access
          </Button>
          <Typography component="p" variant="p">
            If you don't have an access code? <a href="#">Buy a ticket </a>
          </Typography>
        </form>
      </div>
    </Container>
  )
}

export default LoginPage
